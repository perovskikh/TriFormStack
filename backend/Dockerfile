FROM python:3.11-slim as builder

WORKDIR /app

# Установка зависимостей
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# Финальный образ
FROM python:3.11-slim

WORKDIR /app

# Копируем зависимости из builder
COPY --from=builder /root/.local /root/.local
COPY --from=builder /app/requirements.txt .

# Копируем код приложения
COPY . .

# Убедимся, что скрипты в PATH
ENV PATH=/root/.local/bin:$PATH

# Порт и команда запуска
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
