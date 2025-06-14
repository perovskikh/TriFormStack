# Этап сборки
FROM node:18-alpine AS builder

WORKDIR /app

# Сначала копируем package.json
COPY package.json ./

# Устанавливаем зависимости
RUN npm install

# Затем копируем package-lock.json (если существует)
COPY package-lock.json ./

# Устанавливаем зависимости с очисткой кэша
RUN npm ci --silent && npm cache clean --force

# Копируем остальные файлы
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

# Уменьшаем размер образа
RUN rm -rf /app/node_modules/.cache

# Порт и команда запуска
EXPOSE 3000
CMD ["npm", "start"]
