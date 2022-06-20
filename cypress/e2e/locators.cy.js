/// <reference types="cypress" />

describe('Lidando com Seletores', () => {
    beforeEach(() => {

        cy.visit('https://www.wcaquino.me/cypress/componentes.html')

    })

    it("Diversos tipos de seletores", () => {
        
        cy.get(':nth-child(2) > :nth-child(1) > :nth-child(3) > input')

        //Buscando a partir do :contains do pai

        cy.get('#tabelaUsuarios tr:contains(\'Doutorado\'):eq(0) td:eq(6) > input')

        //Buscando a partir do irmão

        cy.get('#tabelaUsuarios td:contains(\'Doutorado\'):eq(0) ~ td:eq(3) > input')

    })

    it("Usando XPath", () => {

        cy.xpath('//input[contains(@onclick, "Francisco")]').click()

        cy.xpath('(//table[@id="tabelaUsuarios"]//td[contains(., "Doutorado")])[2]/..//input[@type="checkbox"]').click()

        cy.xpath('//td[contains(., "Usuario A")]/following-sibling::td[contains(., "Mestrado")]/..//input[@type="text"]')
            .type("Encontrado via XPath!")
    })
})