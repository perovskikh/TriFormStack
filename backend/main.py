from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
import os
from dotenv import load_dotenv

from database import SessionLocal, engine, Base
from models import Product, Order, User
from schemas import ProductCreate, ProductResponse, OrderCreate, OrderResponse
from auth import get_current_user

load_dotenv()

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="TriFormStack API",
    description="Unified API for Website, Mobile App, and Telegram Bot",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # В продакшене указать конкретные домены
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files for media
os.makedirs("static/images", exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
async def root():
    return {"message": "TriFormStack API is running!", "status": "healthy"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "TriFormStack API"}

# Products endpoints
@app.get("/api/products", response_model=list[ProductResponse])
async def get_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    products = db.query(Product).offset(skip).limit(limit).all()
    return products

@app.get("/api/products/{product_id}", response_model=ProductResponse)
async def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@app.post("/api/products", response_model=ProductResponse)
async def create_product(
    product: ProductCreate, 
    db: Session = Depends(get_db)
    # current_user: User = Depends(get_current_user)  # Временно отключено для тестирования
):
    db_product = Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

# Orders endpoints
@app.post("/api/orders", response_model=OrderResponse)
async def create_order(order: OrderCreate, db: Session = Depends(get_db)):
    # Получаем продукт для расчета цены
    product = db.query(Product).filter(Product.id == order.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Рассчитываем общую стоимость
    total_price = product.price_per_sqm * order.quantity_sqm
    
    db_order = Order(
        **order.dict(),
        total_price=total_price
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

@app.get("/api/orders", response_model=list[OrderResponse])
async def get_orders(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db)
    # current_user: User = Depends(get_current_user)  # Временно отключено для тестирования
):
    orders = db.query(Order).offset(skip).limit(limit).all()
    return orders

# Добавим тестовые данные при запуске
@app.on_event("startup")
async def startup_event():
    db = SessionLocal()
    try:
        # Проверяем, есть ли уже продукты
        existing_products = db.query(Product).first()
        if not existing_products:
            # Добавляем тестовые продукты
            test_products = [
                Product(
                    name="Профнастил С8",
                    description="Универсальный профнастил для кровли и стен. Высокое качество, долговечность.",
                    price_per_sqm=450.0,
                    category="Кровельные материалы",
                    image_url="https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg",
                    specifications="Толщина: 0.5мм, Покрытие: полиэстер"
                ),
                Product(
                    name="Металлочерепица Монтеррей",
                    description="Классическая металлочерепица с полимерным покрытием. Идеальна для частных домов.",
                    price_per_sqm=520.0,
                    category="Кровельные материалы", 
                    image_url="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
                    specifications="Толщина: 0.5мм, Профиль: Монтеррей"
                ),
                Product(
                    name="Сайдинг виниловый",
                    description="Качественный виниловый сайдинг для отделки фасадов. Устойчив к погодным условиям.",
                    price_per_sqm=380.0,
                    category="Фасадные материалы",
                    image_url="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
                    specifications="Материал: ПВХ, Длина панели: 3.66м"
                )
            ]
            
            for product in test_products:
                db.add(product)
            
            db.commit()
            print("✅ Тестовые продукты добавлены в базу данных")
    except Exception as e:
        print(f"❌ Ошибка при добавлении тестовых данных: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)