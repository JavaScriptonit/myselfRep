Тех собес с ГКУ Инфогород - https://hh.ru/vacancy/66920620?hhtmFrom=employer_vacancies

#Подготовить ответы на вопросы:
##1) для чего используется протокол **SSH**? (англ. Secure Shell — «безопасная оболочка»)
   1) сетевой протокол прикладного уровня, позволяющий производить удалённое управление операционной системой и туннелирование TCP-соединений (например, для передачи файлов)
   2) протокол, использующий клиент-серверную модель для аутентификации удаленных систем и обеспечения шифрования данных, обмен которыми происходит в рамках удаленного доступа.

1. Пользователь генерирует пару ключей\
   **Публичный** (id_rsa.pub) - Этот ключ записывается на сервера или отдаётся во вне, что-бы по нему авторизовывать пользователя.\
   **Приватный** (id_rsa) - Не покидает машины, на которой он был сгенерирован. Используется для подписи данных и авторизации на внешнем сервере. (Приватный ключ защищается паролем, поэтому, будучи сворованным, не дает злоумышленнику воспользоваться им)
2. Пользователь даёт владельцу машины публичный ключ (id_rsa.pub)
3. Владелец машины записывает этот ключ в authorized_keys
4. Теперь авторизация по ключу конкретным пользователем на конкретной машине возможна.
5. Желательно отключать авторизацию по паролю на сервере. Для этого в файле sshd_config внести опцию PasswordAuthentification no

##2) как и где хранить зашифрованные или закрытые данные? (вне репозитория)
   1) как их использовать в тестах?
      1) $ node -p "crypto.randomBytes(16).toString('hex')" - get a random password using Node from the terminal
         d01ce7056fb2eab425161dcfa5bdb502
      2) [Keep passwords secret in E2E tests](https://glebbahmutov.com/blog/keep-passwords-secret-in-e2e-tests/)

1. Pass password as an environment variable - const password = Cypress.env('password')
2. Use an environment variable - $ **CYPRESS_password=secret** npx cypress open|run
3. $ CYPRESS_password=secret npx cypress open|run
4. add file ~/.as-a/.as-a.ini, add one more INI section and will place the secret password variable there.
5. as-a kps npx cypress open - When running Cypress from terminal
6. On Continuous Integration server, just set a secure environment variable **CYPRESS_password** to value **secret**
   1. add assertion expect(username, 'username was set').to.be.a('string').and.not.be.empty
   2. add cy.get('[name=password]').type(password, {log: false})
   3. add own error by using should(callback) assertion - throw new Error('Different value of typed password')
7. **Continuous integration** (To run Cypress test on CI, for example - CircleCI):
   1. We can set the required environment variable on CircleCI, in CircleCI security contexts
   2. allow explicitly listing the context that a job expects in the circle.yml file
   3. create a new security context keep-password-secret and will add the variable password there
   4. Change the cypress/run job by requiring the new context we have created
   
##3) тестирование api - как тестировать без моков? 
   1) какие компоненты используются?
   2) пример тестирования по api с проверкой ответа без подстановки данных/без изменения (без моков и стабов)

1. cy.request('/api/boards') - отправить простой запрос с помощью метода GET
2. cy.request('DELETE', '/api/boards/9873789121') - первый аргумент будет считаться методом, а второй будет URL-ом.
3. Команда .request() может принимать максимум 3 аргумента. Третий будет телом запроса.
   1. cy.request('POST', '/api/boards', {\
      name: 'space travel plan'\
      })
4. 



