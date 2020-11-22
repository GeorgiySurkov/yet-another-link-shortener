# yet-another-link-shortener

Конкурсное отборочное задание на Уральскую Проектную Смену 2021 в Сириусе, Backend 1

## Запуск

### 1 Способ - Docker

1. `git clone https://github.com/GeorgiySurkov/yet-another-link-shortener.git && cd yet-another-link-shortener`
2. Создать `.env` файл
    ```
    MONGO_USERNAME=url_shortener
    MONGO_PASSWORD=url_shortener123
    MONGO_DB=url_shortener
    ```
3. `docker-compose up -d --build`

### 2 Способ - Ручная установка

1. `git clone https://github.com/GeorgiySurkov/yet-another-link-shortener.git && cd yet-another-link-shortener`
2. Создать `.env` файл, нужные переменные окружения указаны в `example.env`.
3. `yarn install`
4. `yarn run start`
