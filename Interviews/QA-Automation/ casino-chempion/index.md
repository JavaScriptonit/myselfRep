##ДЗ для casino-chempion.co:

1. **процессы, которые нужно и возможно с технической стороны автоматизировать:**
Проверки выполняются на веб/мобайл и планшетной версиях сайта, на разных разрешениях экранов и разных браузерах:
- регистрация по телефону / почте
- авторизация по телефону / почте
- восстановление пароля по телефону / почте
- работоспособность тех. поддержки
- локализацию сайта (текст на всех языках)
- отображение/обновление последних выигрышей
- загрузку картинок и отображение всех карточек игр во всех категориях
- переход во все категории и проверка карточек игр
- отображение всех провайдеров и переход на страницы провайдеров, отображение игр
- поиск и переходы в разделы навигационного меню
- загрузка баннеров и переходы по кнопкам
- текст, ховеры, стили, шрифты, отступы, цвета, пиксели и прочие CSS свойства для проверки дизайна элементов сайта
- проверка API запросов (статусы, ответы, безопасность)
- проверка ссылок, переходы по прямым ссылкам
- загрузка iFrame
- функционал избранного (авторизованный/неавторизованный пользователь)
- бонусы, турниры (сроки, переходы, отображение)

2. **процессы, которые не могут и не должны быть автоматизированы:**
В 1ую очередь следует автоматизировать тесты, которые будут себя окупать (освободить ресурс ручного тестирования, например, регресс, который проводится каждый релиз). Далее следует расширить покрытие для большего кол-ва устройств (разрешений), языков, браузеров, проверок, которые не успевают тестировать вручную, но которые помогут избежать ошибок в prod окружении.
- избегать покрытия автотестами фичей, которые будут изменены в ближайшем будущем
- избегать покрытия автотестами фичей, которые не протестированы вручную (новая функциональность), так как это замедлит написание авто-тестов из-за заведения, ретеста дефектов
- игры внутри iFrame (за работу игр отвечают провайдеры, мы можем проверить загрузку iFrame и соответствие предоставленной игры)
- длинные UI e2e тесты, которые зависят от внешних интеграций (тесты, в которых участвует вёрстка сайтов партнёров. Тесты будут часто падать и требовать постоянного рефакторинга селекторов, логики)
- тест-кейсы, в которых нужно проверить ВАЛИДНЫЙ смс-код, отправленный на телефон. Можно автоматизировать через внешние сервисы для аренды номера телефона, но тест-кейсы будут очень долгие и дорогие в разработке.

3. чек-лист:
**проверки новых провайдеров/проверки новых игр:**
- проверка всех картинок игр на страницах
- переходы на страницы игр (прямой переход + при клике  на карточку/кнопки Демо/Играть)
- загрузка игр в iFrame (новые + старые)
- проверка всех картинок провайдеров
- переходы на страницы провайдеров (прямой переход + при клике  на иконку/кнопку)
- переходы за авторизованного пользователя/неавторизованного на страницы старой/новой игры
- проверка появления модалки пополнения с 0 балансом


Авто-тесты решил написать на фреймворке - Puppeteer,
он менее современный чем Cypress и не обладает такой широтой покрытия и чистотой кода, но Cypress из-за того что это не тестовый стенд и сайт блокируется даже при использовании VPN.
Puppeteer справился с этой задачей.
При выборе фреймворка для автоматизации всего проекта я остановил бы свой выбор на Cypress, но для этого понадобится больше времени для настройка фреймворка и меньше времени в будущем для написания авто-тестов.

