## Frontend mocks for backend integration
* [Passcode: hTB&O%J9](https://us06web.zoom.us/rec/play/-2ve94FmMvjc5rlfBL9ZwaPFhgtu5UCQBGia95TyFKOkYV0WvHxYbtkK34auUOGLi2-D0s2TLa7qpjWE.y1xB4AdTDWHV17d2?startTime=1659531778000&_x_zm_rtaid=n5whe_dQSd6OF6BOJjmt6g.1659532649887.1c4a3f05f91dc0a4d1bfa245dc28ce77&_x_zm_rhtaid=294)


### Intercept Examples:
1. cy.intercept() - нельзя хэндлить серверные запросы
2. **клиент-сервер**, **сервер-сервер** === различные виды коммуникаций
   1. когда делаем запрос из браузера - взаимодействуем по принципу клиент-сервер
   2. браузер(клиент) шлёт запросы на сервер. Хэндлится cy.intercept()
   3. фронт-энд состоит из двух частей:
      1. клиентская часть (выполняется в браузерском Runtime)
      2. серверная часть (написана на Node.js - серверный язык, базируется на JS + С++)
         1. Node. js — это приложение C++, которое получает на входе код JavaScript и выполняет его.
         2. Node. js выступает в роли сервера когда генерирует контент html страницы
         3. Cypress не хэндлит серверную часть
3. Для моков серверной части потребуется пакет **msw**:
   1. Mock Service Worker === позволяет на сетевом уровне перехватывать запросы
   2. msw состоит из сервера и хэндлеров (по-умолчанию)
      1. **setupServer(...handlers)** стартует msw сервер, который перехватывает запросы
   3. Создать plugin в cypress.config.ts
      1. Cypress позволяет гибко общаться со своим backend при помощи setupNodeEvents()
         1. Вся Node. js построена на initEvents() - на системе завязанной на ивенты. Общаются с помощью Event канала
         2. Старт базового сервера Next. const app = next({ dev: true })
         3. Использование http сервиса. Пакет: const http = require( 'http' );
         4. Навесить next handler: const handlerNextRequests = app.getRequestHandler();
      2. Для общения с бэкендом Cypress используется event 'task':
         1. server.close() - потушить сервер (если он включен)
         2. Пробросить обработчики массивом
         3. server.listen() - поднимаем сервер msw заново