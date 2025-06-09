import asyncio
import logging
from aiogram import Bot, Dispatcher, types
from aiogram.filters import CommandStart, Command
from aiogram.types import Message, InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from aiogram.fsm.storage.memory import MemoryStorage
import httpx
import os
from dotenv import load_dotenv

load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)

# Bot token
BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
API_BASE_URL = os.getenv("API_BASE_URL", "http://localhost:8000")

# Initialize bot and dispatcher
bot = Bot(token=BOT_TOKEN)
storage = MemoryStorage()
dp = Dispatcher(storage=storage)

# States for order form
class OrderForm(StatesGroup):
    waiting_for_name = State()
    waiting_for_phone = State()
    waiting_for_email = State()
    waiting_for_message = State()

@dp.message(CommandStart())
async def cmd_start(message: Message):
    keyboard = InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="🏠 Каталог продукции", callback_data="catalog")],
        [InlineKeyboardButton(text="📞 Связаться с нами", callback_data="contact")],
        [InlineKeyboardButton(text="ℹ️ О компании", callback_data="about")]
    ])
    
    await message.answer(
        "🏗️ Добро пожаловать в TriFormStack!\n\n"
        "Мы предлагаем качественные строительные материалы.\n"
        "Выберите интересующий вас раздел:",
        reply_markup=keyboard
    )

@dp.callback_query(lambda c: c.data == "catalog")
async def show_catalog(callback_query: types.CallbackQuery):
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(f"{API_BASE_URL}/api/products")
            products = response.json()
            
            if not products:
                await callback_query.message.edit_text("Каталог пока пуст.")
                return
            
            text = "🏠 **Каталог продукции:**\n\n"
            keyboard_buttons = []
            
            for product in products[:10]:  # Показываем первые 10 товаров
                text += f"**{product['name']}**\n"
                text += f"💰 {product['price_per_sqm']} руб/м²\n"
                text += f"{product['description'][:100]}...\n\n"
                
                keyboard_buttons.append([
                    InlineKeyboardButton(
                        text=f"🛒 {product['name']}", 
                        callback_data=f"product_{product['id']}"
                    )
                ])
            
            keyboard_buttons.append([
                InlineKeyboardButton(text="🔙 Назад", callback_data="back_to_menu")
            ])
            
            keyboard = InlineKeyboardMarkup(inline_keyboard=keyboard_buttons)
            await callback_query.message.edit_text(text, reply_markup=keyboard, parse_mode="Markdown")
            
        except Exception as e:
            await callback_query.message.edit_text("Ошибка загрузки каталога. Попробуйте позже.")

@dp.callback_query(lambda c: c.data.startswith("product_"))
async def show_product(callback_query: types.CallbackQuery):
    product_id = callback_query.data.split("_")[1]
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(f"{API_BASE_URL}/api/products/{product_id}")
            product = response.json()
            
            text = f"🏠 **{product['name']}**\n\n"
            text += f"📝 {product['description']}\n\n"
            text += f"💰 **Цена:** {product['price_per_sqm']} руб/м²\n"
            text += f"📂 **Категория:** {product['category']}\n"
            
            if product.get('specifications'):
                text += f"🔧 **Характеристики:** {product['specifications']}\n"
            
            keyboard = InlineKeyboardMarkup(inline_keyboard=[
                [InlineKeyboardButton(text="🛒 Заказать", callback_data=f"order_{product_id}")],
                [InlineKeyboardButton(text="🔙 К каталогу", callback_data="catalog")]
            ])
            
            if product.get('image_url'):
                await callback_query.message.delete()
                await bot.send_photo(
                    callback_query.from_user.id,
                    photo=product['image_url'],
                    caption=text,
                    reply_markup=keyboard,
                    parse_mode="Markdown"
                )
            else:
                await callback_query.message.edit_text(text, reply_markup=keyboard, parse_mode="Markdown")
                
        except Exception as e:
            await callback_query.message.edit_text("Ошибка загрузки товара. Попробуйте позже.")

@dp.callback_query(lambda c: c.data.startswith("order_"))
async def start_order(callback_query: types.CallbackQuery, state: FSMContext):
    product_id = callback_query.data.split("_")[1]
    await state.update_data(product_id=product_id)
    
    await callback_query.message.edit_text(
        "📝 Для оформления заказа, пожалуйста, укажите ваше имя:"
    )
    await state.set_state(OrderForm.waiting_for_name)

@dp.message(OrderForm.waiting_for_name)
async def process_name(message: Message, state: FSMContext):
    await state.update_data(name=message.text)
    await message.answer("📞 Теперь укажите ваш номер телефона:")
    await state.set_state(OrderForm.waiting_for_phone)

@dp.message(OrderForm.waiting_for_phone)
async def process_phone(message: Message, state: FSMContext):
    await state.update_data(phone=message.text)
    await message.answer("📧 Укажите ваш email:")
    await state.set_state(OrderForm.waiting_for_email)

@dp.message(OrderForm.waiting_for_email)
async def process_email(message: Message, state: FSMContext):
    await state.update_data(email=message.text)
    await message.answer("💬 Добавьте комментарий к заказу (или отправьте 'пропустить'):")
    await state.set_state(OrderForm.waiting_for_message)

@dp.message(OrderForm.waiting_for_message)
async def process_message(message: Message, state: FSMContext):
    data = await state.get_data()
    
    order_data = {
        "customer_name": data['name'],
        "customer_phone": data['phone'],
        "customer_email": data['email'],
        "product_id": int(data['product_id']),
        "quantity_sqm": 1.0,  # По умолчанию 1 м²
        "message": message.text if message.text.lower() != 'пропустить' else "",
        "source": "telegram"
    }
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(f"{API_BASE_URL}/api/orders", json=order_data)
            if response.status_code == 200:
                await message.answer(
                    "✅ Заказ успешно оформлен!\n\n"
                    "Наш менеджер свяжется с вами в ближайшее время.\n"
                    "Спасибо за обращение! 🙏"
                )
            else:
                await message.answer("❌ Ошибка при оформлении заказа. Попробуйте позже.")
        except Exception as e:
            await message.answer("❌ Ошибка при оформлении заказа. Попробуйте позже.")
    
    await state.clear()

@dp.callback_query(lambda c: c.data == "contact")
async def show_contact(callback_query: types.CallbackQuery):
    text = "📞 **Контактная информация:**\n\n"
    text += "🏢 TriFormStack\n"
    text += "📱 Телефон: +7 (XXX) XXX-XX-XX\n"
    text += "📧 Email: info@triformstack.com\n"
    text += "🌐 Сайт: www.triformstack.com\n"
    text += "📍 Адрес: г. Москва, ул. Примерная, д. 1\n\n"
    text += "⏰ Режим работы: Пн-Пт 9:00-18:00"
    
    keyboard = InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="🔙 Назад", callback_data="back_to_menu")]
    ])
    
    await callback_query.message.edit_text(text, reply_markup=keyboard, parse_mode="Markdown")

@dp.callback_query(lambda c: c.data == "back_to_menu")
async def back_to_menu(callback_query: types.CallbackQuery):
    await cmd_start(callback_query.message)

async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())