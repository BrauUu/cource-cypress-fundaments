/// <reference types="cypress"/>

describe('Trabalhando com Iframe', () => {
    beforeEach(() => {
  
    })

    it("Escrevendo em um iframe", () => {

        cy.visit('https://www.wcaquino.me/cypress/componentes.html')

        cy.get('#frame1').then(iframe => {
            let body = iframe.contents().find('body')
            cy.wrap(body)
                .find('#tfield')
                .type('Teste em iframe')
                .should('have.value', 'Teste em iframe')
        })

    })
})