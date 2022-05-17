describe('anonymous calculator', () => {
    it('can make calculation', () => {
        cy.visit('http://localhost:8080')
            .get('._2S_Gj6clvtEi-dZqCLelKb > :nth-child(3)') // get 1
            .click()
            .get('._1yUJ9HTWYf2v-MMhAEVCAn > :nth-child(4)') // get +
            .click()
            .get('._2S_Gj6clvtEi-dZqCLelKb > :nth-child(5)') // get 3
            .click()
            .get('._1yUJ9HTWYf2v-MMhAEVCAn > :nth-child(5)') // get =
            .click()
            .get('.mNQM6vIr72uG0YPP56ow5')// get display
            .should('have.text', '4');
    })
})