/// <reference types="cypress"/>

describe('Lidando com Timeouts', () => {
    beforeEach(() => {
  
      cy.visit('https://www.wcaquino.me/cypress/componentes.html')
  
    })
  
    it('Deve aguardar o elemento estar disponível', () => {

        cy.get('#novoCampo')
            .should('not.exist')

        cy.get('#buttonDelay')
            .click()

        cy.get('#novoCampo')
            .should('exist')
            .type('Hi mom!')

    })


    it('Ocorrendo retrys', () => {

        cy.get('#buttonDelay')
            .click()

        cy.get('#novoCampo')
            .should('not.exist')
            .should('exist')
    })

    it.only('Utilizando cy.find()', () => {

        cy.get('#buttonList')
            .click()

        cy.get('#lista > li')
            .find('span')
            .should('contain', 'Item 1')

        cy.get('#lista > li > span')
            .should('contain', 'Item 2')
    })
})