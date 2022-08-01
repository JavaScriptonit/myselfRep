## Intercept Syntax
* [Stubbing a response with Cypress](https://docs.cypress.io/api/commands/intercept#Stubbing-a-response)

### Intercept Examples:
1. **With a string:**
   1. cy.intercept('/update', 'success')
2. **With a fixture:**
   1. cy.intercept('/users.json', { fixture: 'users.json' })
3. **With a StaticResponse object:**
   1. A StaticResponse object represents a response:
      1. const staticResponse = {    }
      2. cy.intercept('/projects', staticResponse)
   2. Stub a response with a JSON body:
      1. cy.intercept('/projects', {
         body: [{ projectId: '1' }, { projectId: '2' }],
         })
   3. Stub headers, status code, and body all at once:
      1. cy.intercept('/not-found', {
         statusCode: 404,
         body: '404 Not Found!',
         headers: {
         'x-not-found': 'true',
         },
         })
   4. Stub response with a fixture that is read as a Buffer:
      1. cy.intercept('/not-found', {
         fixture: 'media/gif.mp4,null',
         })
4. **Using the routeHandler function:**
   1. The routeHandler takes the incoming HTTP request (IncomingHTTPRequest) as the first argument:
      1. cy.intercept('/users*', (req) => {    })
   2. Asserting on a request:
      1. cy.intercept('POST', '/organization', (req) => {
         expect(req.body).to.include('Acme Company')
         })
   3. Modifying an outgoing request:
      1. cy.intercept('POST', '/login', (req) => {
         req.body = 'username=janelane&password=secret123'
         })
         cy.intercept('POST', '/login', (req) => {
         req.alias = 'login'
         })
   4. Adding a header to an outgoing request:
      1. cy.intercept('/req-headers', (req) => {
         req.headers['x-custom-headers'] = 'added by cy.intercept'
         })
   5. Waiting on the intercept:
      1. cy.intercept('/req-headers', (req) => {
         req.headers['x-custom-headers'] = 'added by cy.intercept'
         }).as('headers')
         cy.wait('@headers')
         .its('request.headers')
         .should('have.property', 'x-custom-headers', 'added by cy.intercept')
   6. Add, modify or delete a header to all outgoing requests:
      1. beforeEach(() => {
         cy.intercept(
         { url: 'http://localhost:3001/**', middleware: true },
         // Delete 'if-none-match' header from all outgoing requests
         (req) => delete req.headers['if-none-match']
         )
         })
   7. Dynamically stubbing a response:
      1. cy.intercept('/billing', (req) => {
         req.reply()
         req.reply({ plan: 'starter' })
         req.continue((res) => {
         })
         })
   8. Returning a Promise:
      1. cy.intercept('POST', '/login', (req) => {
         return getLoginCredentials().then((credentials) => {
         req.headers['authorization'] = credentials
         })
         })
   9. Passing a request to the next request handler:
      1. cy.intercept('http://api.company.com/', { middleware: true }, (req) => {
         req.headers['authorization'] = `token ${token}`
         })
         cy.intercept('POST', 'http://api.company.com/widgets', (req) => {
         expect(req.body).to.include('analytics')
         })
5. **Intercepting a response:**
   1. cy.intercept('/integrations', (req) => {
      req.continue((res) => {
      })
      })
   2. Asserting on a response:
      1. cy.intercept('/projects/2', (req) => {
         req.continue((res) => {
         expect(res.body).to.include('My Project')
         })
         })
   3. Returning a Promise:
      1. cy.intercept('/users', (req) => {
         req.continue((res) => {
         // the response will not be sent to the browser until
         // 'waitForSomething()' resolves
         return waitForSomething()
         })
         })
   4. Throttle or delay response all incoming responses:
      You can throttle or delay all incoming responses using a beforeEach() in the supportFile.
      1. // Throttle API responses to simulate real-world conditions
         beforeEach(() => {
         cy.intercept(
         {
         url: 'http://localhost:3001/**',
         middleware: true,
         },
         (req) => {
         req.on('response', (res) => {
         // Throttle the response to 1 Mbps to simulate a
         // mobile 3G connection
         res.setThrottle(1000)
         })
         }
         )
         })
6. **Request/Response Modification with routeHandler:**
   1. Specify routeHandler as the last argument to modify the outgoing request:
      1. cy.intercept('/api', (req) => {
         // do something with the intercepted request
         })
   2. Asserting on a request:
      1. // match requests to create a user
         cy.intercept('POST', '/users', (req) => {
         // make an assertion on the payload contents
         expect(req.body).to.include('Peter Pan')
         })
   3. Controlling the outgoing request:
      1. // modify the request body before it's sent to its destination
         cy.intercept('POST', '/users', (req) => {
         req.body = {
         name: 'Peter Pan',
         }
         })
         // add a header to an outgoing request
         cy.intercept('POST', '/users', (req) => {
         req.headers['x-custom-header'] = 'added by cy.intercept'
         })
         // modify an existing header
         cy.intercept('POST', '/users', (req) => {
         req.headers['authorization'] = 'Basic YWxhZGRpbjpvcGVuc2VzYW1l'
         })
   4. Verifying the request modification:
      1. cy.intercept('POST', '/users', (req) => {
         req.headers['x-custom-header'] = 'added by cy.intercept'
         }).as('createUser')
         cy.get('button.save').click()
         // you can see the headers in the console output by selecting
         // this line in the command log:
         cy.wait('@createUser')
         // ...or make an assertion:
         .its('request.headers')
         .should('have.property', 'x-custom-header', 'added by cy.intercept')
   5. Controlling the response:
      1. // stub out the response without interacting with a real back-end
         cy.intercept('POST', '/users', (req) => {
         req.reply({
         headers: {
         Set-Cookie: 'newUserName=Peter Pan;'
         },
         statusCode: 201,
         body: {
         name: 'Peter Pan'
         },
         delay: 10, // milliseconds
         throttleKbps: 1000, // to simulate a 3G connection
         forceNetworkError: false // default
         })
         })
         // stub out a response body using a fixture
         cy.intercept('GET', '/users', (req) => {
         req.reply({
         statusCode: 200, // default
         fixture: 'users.json'
         })
         })

The intercepted request passed to the route handler (hereafter referred to as req, though you can use any name) contains methods to dynamically control the response to a request:\
req.reply() - stub out a response requiring no dependency on a real back-end\
req.continue() - modify or make assertions on the real response\
req.destroy() - destroy the request and respond with a network error\
req.redirect() - respond to the request with a redirect to a specified location\
req.on() - modify the response by attaching to events\
Stubbing out a response (req.reply()):

req.reply() takes a StaticResponse object as the first argument:
