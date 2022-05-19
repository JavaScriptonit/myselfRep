import {selectors} from '../../../fixtures/selectors';

describe('Поддержка "Zendesk"', () => {

    beforeEach(() => {
        cy.authenticateUrl('/casino/lobby');
    })

    it('[Главная страница] Проверить открытие / закрытие Zendesk', () => {
        // cy.wait(2000)
        // cy.zendeskCheck('');
        cy.get(selectors.zendesk.zendeskButton).should('be.visible'); // дождаться пока появится кнопка "Zendesk"
        cy.get(selectors.zendesk.zendeskButton).click();
        cy.getIframe(selectors.zendesk.iFrameZendesk)
            .find(selectors.zendesk.closeButton)
            .click();
        cy.get(selectors.zendesk.closeButton).should(($sel) => {
            expect($sel).to.have.length(0) // проверить что модальное окно закрылось
        })
    })
})
