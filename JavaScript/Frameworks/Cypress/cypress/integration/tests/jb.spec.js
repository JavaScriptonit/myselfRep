describe('My first tests', () => {
    beforeEach(() => {
        cy.authenticateUrl('/', 'joinbet', 'DBcFiTTmb5')
    })

    const selectors = {
        line: 'a[target="_self"][href="/sportsbook/home"] span',
        live: 'a[target="_self"][href="/sportsbook/live"] span',
        lives: 'a[target="_self"][href="/sportsbook/esports"] span'
    }

    const footerTextData = [
        'Линия',
        'Лайв',
        'Киб ерспорт'
    ]

    it('First test', () => {
        cy.contains('Вход').click()
        // cy.pause()
    })

    it('Second test', () => {
        cy.contains('Лайв-казино').click()
        cy.url().should('include', 'https://qa.prod.joinbet.com/casino/live')
    })

    it('Third test', () => {
        const arrSelectors = Object.values(selectors)
        arrSelectors.map((sel, i) => {
            cy.get(sel).should('have.text', footerTextData[i])
        })
    })

    it('Fourth test', () => {
        cy.get('[data-testid="signInBtn"]').should('have.text', 'Вход');
        // cy.get('.my-slow-selector', { timeout: 1000 }); ручной тайм-аут
    })
})