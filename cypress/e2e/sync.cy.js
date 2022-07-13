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

    it('Utilizando cy.find()', () => {

        cy.get('#buttonList')
            .click()

        cy.get('#lista > li')
            .find('span')
            .should('contain', 'Item 1')

        cy.get('#lista > li > span')
            .should('contain', 'Item 2')
    })

    it("Utilizando Timeout e Wait", () => {

        cy.get('#buttonDelay')
            .click()

        // cy.get('#novoCampo', {timeout: 1000})
        //     .should('exist')

        cy.get('#buttonListDOM')
            .click()

        //cy.wait(5000)

        cy.get('#lista > li > span', { timeout: 7000 })
            .should('contain', 'Item 2')

        cy.reload()

        cy.get('#buttonListDOM')
            .click()

        cy.get('#lista > li > span')
            .should('have.length', 1)

        cy.get('#lista > li > span')
            .should('have.length', 2)
    })

    it("Should x Then", () => {

        cy.get('#buttonListDOM')
            .click()

        cy.get('#lista > li > span').should(el => {
            console.log(el)
            expect(el).to.have.length(1)
        })

        cy.get('#lista > li > span').then(el => {
            console.log(el)
            expect(el).to.have.length(1)
        })

        cy.reload()

        cy.get('#buttonListDOM').then(el => {
            expect(el).to.have.length(1)
        }).and('have.id', 'buttonListDOM')

        cy.reload()

        cy.get('#buttonListDOM').should(el => {
            expect(el).to.have.length(1)
        }).and('have.id', 'buttonListDOM')
    })
})