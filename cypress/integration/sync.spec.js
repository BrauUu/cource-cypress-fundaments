/// <reference types="cypress"/>

describe('Lidando com Timeouts', () => {
    beforeEach(() => {
  
      cy.visit('https://www.wcaquino.me/cypress/componentes.html')
  
    })
  
    it('Deve aguardar elemento estar disponível', () => {

        cy.get('#novoCampo')
            .should('not.exist')

        cy.get('#buttonDelay')
            .click()

        cy.get('#novoCampo')
            .should('exist')
            .type('Hi mom!')

    })
})