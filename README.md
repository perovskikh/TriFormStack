# TriFormStack

Комплексное решение для бизнеса, включающее:
- 🌐 **Веб-сайт** (каталог продукции/визитка)
- 📱 **Мобильное приложение** (React Native)
- 🤖 **Telegram-бот** (прием заказов и консультации)

## 🏗️ Архитектура

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │  Mobile App     │    │  Telegram Bot   │
│   (Next.js)     │    │ (React Native)  │    │   (aiogram)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   FastAPI       │
                    │   Backend       │
                    └─────────────────┘
                                 │
                    ┌─────────────────┐
                    │  PostgreSQL     │
                    │   Database      │
                    └─────────────────┘
```

## 🚀 Технологический стек

### Backend
- **FastAPI** - современный, быстрый веб-фреймворк
- **PostgreSQL** - надежная реляционная база данных
- **SQLAlchemy** - ORM для работы с БД
- **Redis** - кэширование и очереди
- **JWT** - аутентификация

### Frontend (Веб-сайт)
- **Next.js** - React фреймворк с SSR/SSG
- **Tailwind CSS** - utility-first CSS фреймворк
- **TypeScript** - типизированный JavaScript

### Mobile App
- **React Native** - кроссплатформенная разработка
- **Expo** - инструменты для React Native

### Telegram Bot
- **aiogram** - асинхронная библиотека для Telegram Bot API
- **FSM** - машина состояний для диалогов

## 🛠️ Установка и запуск

### Быстрый старт с Docker
```bash
# Клонируйте репозиторий
git clone <repository-url>
cd triformstack

# Собрать и запустить все сервисы (с очисткой кэша для фронтенда)
docker compose down && docker compose build --no-cache frontend && docker compose up

# Или просто запустить сервисы (если уже собраны)
docker compose up -d
```

> Примечание:
> - Первая команда полностью пересобирает фронтенд с очисткой кэша
> - Вторая команда просто запускает уже собранные сервисы
> - Используйте `docker compose` (без дефиса) для современных версий Docker

### Ручная установка

#### Backend
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Отредактируйте .env файл
uvicorn main:app --reload
```

#### Frontend
1. Установка зависимостей (создает package-lock.json):
```bash
cd frontend && npm install && cd ..
```
2. Запуск dev-сервера:
```bash
cd frontend && npm run dev
```

> Примечание: package-lock.json нужен для:
> - Контроля версий зависимостей
> - Быстрой установки одинаковых версий в CI/CD и Docker
> - Избежания проблем с несовместимостью версий

> **Важно про package-lock.json**:
> - Этот файл автоматически генерируется при первом запуске `npm install`
> - Он фиксирует точные версии зависимостей для воспроизводимости сборок
> - В Docker-сборке используется `npm install --package-lock` для его создания
> - Для разработки просто запустите `npm install` в папке frontend один раз

#### Telegram Bot
```bash
cd bot
pip install -r requirements.txt
# Добавьте TELEGRAM_BOT_TOKEN в .env
python main.py
```

## 📋 Основные функции

### Веб-сайт
- ✅ Каталог продукции с фото и описанием
- ✅ Калькулятор стоимости (цена за м²)
- ✅ Форма заказа и обратной связи
- ✅ Адаптивный дизайн
- ✅ SEO-оптимизация

### Мобильное приложение
- ✅ Каталог товаров
- ✅ Избранное
- ✅ Push-уведомления
- ✅ Офлайн-режим
- ✅ Интеграция с камерой

### Telegram-бот
- ✅ Просмотр каталога
- ✅ Оформление заказов
- ✅ Консультации
- ✅ Уведомления о статусе заказа
- ✅ Интеграция с CRM

## 🔧 API Endpoints

### Продукты
- `GET /api/products` - список всех продуктов
- `GET /api/products/{id}` - конкретный продукт
- `POST /api/products` - создание продукта (админ)

### Заказы
- `POST /api/orders` - создание заказа
- `GET /api/orders` - список заказов (админ)

### Аутентификация
- `POST /api/auth/login` - вход
- `POST /api/auth/register` - регистрация

## 🌐 Деплой

### Production
- **Backend**: Heroku, DigitalOcean, AWS
- **Frontend**: Vercel, Netlify
- **Database**: PostgreSQL (Heroku Postgres, AWS RDS)
- **Mobile**: App Store, Google Play

### Мониторинг
- Логирование через Python logging
- Метрики через Prometheus
- Уведомления в Telegram

## 📱 Мобильное приложение

Для разработки мобильного приложения:

```bash
# Установите Expo CLI
npm install -g @expo/cli

# Создайте проект
cd mobile
expo init TriFormStackApp
cd TriFormStackApp

# Запустите разработку
expo start
```

## 🤖 Настройка Telegram-бота

1. Создайте бота через @BotFather
2. Получите токен
3. Добавьте токен в `.env` файл
4. Запустите бота: `python bot/main.py`

## 📊 База данных

### Основные таблицы:
- `users` - пользователи системы
- `products` - каталог продукции
- `orders` - заказы клиентов
- `telegram_users` - пользователи Telegram-бота

## 🔐 Безопасность

- JWT токены для аутентификации
- Хеширование паролей (bcrypt)
- CORS настройки
- Rate limiting
- Валидация данных через Pydantic

## 📈 Масштабирование

- Горизонтальное масштабирование FastAPI
- Кэширование через Redis
- CDN для статических файлов
- Очереди для фоновых задач

## 🤝 Вклад в проект

1. Fork репозитория
2. Создайте feature branch
3. Внесите изменения
4. Создайте Pull Request

## 📄 Лицензия

MIT License
