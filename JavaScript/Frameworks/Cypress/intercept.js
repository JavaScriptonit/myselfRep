// https://docs.cypress.io/api/commands/intercept#Request-Response-Modification-with-routeHandler - Controlling the response
// https://docs.cypress.io/guides/guides/network-requests#What-you-ll-learn - Stubbing / Routing Network Requests
// https://stackoverflow.com/questions/66765452/intercept-the-same-api-call-multiple-times-in-cypress - Intercept the same API call multiple times in Cypress
// https://stackoverflow.com/questions/69449067/how-to-intercept-multiple-xhr-requests-with-the-same-endpoint-using-cypress - How to intercept multiple XHR requests with the same endpoint using cypress
// https://stackoverflow.com/questions/63483075/cypress-mock-api-response-for-different-status - Cypress MOCK api response for different status

beforeEach(() => {
    Cypress.config('defaultCommandTimeout', 10); // low timeout makes the gets depend on the waits for success
    // cy.authenticateUrl('/casino/lobby');
    // cy.intercept('GET', 'https://joinbethelp.zendesk.com/*', {statusCode: 200}).as('call1');
    cy.intercept('GET', 'https://joinbethelp.zendesk.com/embeddable/config', {statusCode: 200}).as('call1');
    // cy.intercept('GET', 'https://joinbethelp.zendesk.com/embeddable/config', {statusCode: 200}).as('call1');
    // cy.intercept('GET', 'https://joinbethelp.zendesk.com/embeddable_blip?type=pageView*', {statusCode: 200}).as('call2');
    cy.visit('https://qa.prod.joinbet.com/casino/lobby', {
        // onBeforeLoad: (win) => {
        //   win.fetch = null
        // },
        auth: {
            username: 'joinbet',
            password: 'DBcFiTTmb5'
        }
    });
    cy.wait('@call1');
    // cy.wait('@call2');
    // .should('have.property', 'response.statusCode', 200);
});