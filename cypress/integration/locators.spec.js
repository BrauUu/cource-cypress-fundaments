/// <reference types="cypress" />

describe('Lidando com Seletores', () => {
    beforeEach(() => {

        cy.visit('https://www.wcaquino.me/cypress/componentes.html')

    })

    it("Diversos tipos de seletore", () => {
        
        cy.get(':nth-child(2) > :nth-child(1) > :nth-child(3) > input')

        cy.get('#tabelaUsuarios tr:contains(\'Doutorado\'):eq(0) td:eq(6) > input')

    })
})