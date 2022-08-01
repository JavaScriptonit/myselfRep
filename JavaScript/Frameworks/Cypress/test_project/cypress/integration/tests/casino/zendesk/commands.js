// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
// import {selectors} from '../../src/fixtures/selectors';

// eslint-disable-next-line @typescript-eslint/no-namespace
// declare namespace Cypress {
//     interface Chainable {
//         getLocalStorage(key: string): void;
//         setLocalStorage(key: string, value: string): void;
//         authenticateUrl(url: string): void;
//         getIframe(iframe: string): void;
//         // zendeskCheck(url: string): void;
//     }
// }
//
// Cypress.Commands.add('getLocalStorage', (key) => {
//     cy.window().then((window) => window.localStorage.getItem(key));
// });
//
// Cypress.Commands.add('setLocalStorage', (key, value) => {
//     cy.window().then((window) => {
//         window.localStorage.setItem(key, value);
//     });
// });
//
// Cypress.Commands.add('authenticateUrl', (url: string) => {
//     cy.visit(url, {
//         auth: {
//             username: 'joinbet',
//             password: 'DBcFiTTmb5',
//         },
//     });
// });
//
// // For handling iFrames
// Cypress.Commands.add('getIframe', (iframe) => {
//     return cy.get(iframe)
//         .its('0.contentDocument.body')
//         .should('be.visible')
//         .then(cy.wrap);
// })

// Cypress.Commands.add('zendeskCheck', () => {
//   cy.get(selectors.zendesk.zendeskButton).should('be.visible'); // дождаться пока появится кнопка "Zendesk"
//     cy.get(selectors.zendesk.zendeskButton).click();
//     cy.getIframe(selectors.zendesk.iFrameZendesk)
//       .find(selectors.zendesk.closeButton)
//       .click();
//     cy.get(selectors.zendesk.closeButton).should(($lis) => {
//       expect($lis).to.have.length(0) // проверить что модальное окно закрылось
//     })
// });
