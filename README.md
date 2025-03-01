# Flappy Bird

## Описание проекта

Учебный проект по курсу повышения квалификации от Яндекс.Практикум «Мидл фронтенд-разработчик».
В рамках проекта входит командная разработка веб-версии игры Flappy Bird с классической механикой, где игрок управляет птицей, избегая столкновений с препятствиями.
Проект также включает реализацию форума, авторизации и регистрации пользователей.

[Cсылка на видео](https://disk.yandex.ru/i/a0tLd-38KlgZ-g) с демонстрацией работоспособности и функциональности приложения.

***

## Содержание

-   [Ключевые технологии](#ключевые-технологии)
-   [Макет в Figma](#макет-в-figma)
-   [Деплой](#деплой)
-   [Скрипты](#скрипты)
-   [Установка](#установка)

***

## Ключевые технологии

### frontend:
-   **Vite** — инструмент сборки.
-   **TypeScript** — язык программирования.
-   **Sass** — препроцессор CSS.
-   **React** — библиотека для создания пользовательского интерфейса.
-   **Redux Toolkit** — стейт менеджер.
-   **React Router** — библиотека для маршрутизации.
-   **MUI (Material-UI)** — библиотека готовых компонентов.
-   **Axios** — библиотека для работы с HTTP-запросами.
-   **Eslint** — инструмент статического анализа кода.
-   **WebSocket** — протокол связи.
-   **husky** — настройка pre commit.
-   **jest** — фреймворк для тестирования.

### backend: 

(_Не заполнено_)

***

## Макет в Figma

(_Не заполнено_)

***

## Деплой

(_Не заполнено_)

***

## Скрипты

В проекте доступны следующие команды:

- **yarn bootstrap** — установка всех зависимостей и подготовка проекта, включая настройку Lerna.
- **yarn build** — сборка всех пакетов с использованием Lerna.
- **yarn dev:client** — запуск клиентской части проекта в режиме разработки через Lerna.
- **yarn dev:server** — запуск серверной части проекта в режиме разработки через Lerna.
- **yarn dev** — запуск клиентской и серверной части в режиме разработки через Lerna.
- **yarn test** — запуск тестов через Lerna.
- **yarn lint** — запуск линтинга для проверки кода на соответствие стандартам.
- **yarn format** — форматирование кода с использованием Prettier.
- **yarn preview** — запуск предварительного просмотра собранного проекта.
- **yarn prepare** — подготовка Husky для настройки git-хуков.

***

## Установка

1. Клонируйте репозиторий.
2. Перейдите в папку с проектом
3. Переключиться на ветку dev
4. Выполните команды:

   ```bash
   yarn bootstrap
   ```

   ```bash
   yarn dev:client
   ```

## Запуск проекта в докере
   1. Добавить .env файл в корень проекта и создать переменные 

> ## .env файл для запуска прокдакшена
> 
> ### Собственный сервер
> 
> SERVER_PORT - Порт на котором будет стартовать сервер
> OWNER_SERVER_POINT - Пусть по которому клиенские сервер перенаправить запрос на сервер например "/owner-server"
> OWNER_SERVER_PROXY_HOST - хост на котором будет работать сервер, указывать вместе с портом
> ### База данных
> 
> POSTGRES_USER=postgres
> POSTGRES_PASSWORD=postgres
> POSTGRES_DB - название для базы
> POSTGRES_PORT=5432
> POSTGRES_HOST=postgres - оставить эту переменную. 
> 
> ### Реакт
> VITE_CLIENT_PORT - порт на котором будет работать реакт
> VITE_SSR_PORT - порт SSR сервера
> VITE_SSR_HOST - хост на котором будет работать SSR сервер, указывать вместе с портом
> 
> ### Яндекс сервера
> YA_API_POINT="/api/v2"
> YA_PROXY_HOST="https://ya-praktikum.tech"
> 
 2. Запустить команду ``docker compose build``
 3. Запустить команду ``docker compose up postgres``. Зайти в базу данных и создать базу данных с названием который указан в .env
 4. Запустить команду ``docker compose up``
 5. Окрыть браузер на localhost:VITE_CLIENT_PORT - который указал в .env файле


## Запуск Dev режима с Postgres
1. Обновить зависимости
2. Из корня проекта запустить команду docker compose up postgres
3. После того как контейнер запуститься, зайти в базу данных(можно скачать приложение для БД. PgAdmin, Valentine, или воспользоваться втроенным в IDE). Cоздать базу данных с названием "developer_game" 
4. После этого запустить проект командой yarn dev из корня проект.

