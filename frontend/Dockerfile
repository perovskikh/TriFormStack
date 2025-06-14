# Этап сборки
FROM node:18-alpine AS builder

WORKDIR /app

# Копируем зависимости
COPY package*.json ./
COPY .npmrc ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Этап продакшн
FROM node:18-alpine

WORKDIR /app

# Копируем только необходимое
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Порт и команда запуска
EXPOSE 3000
CMD ["npm", "start"]
