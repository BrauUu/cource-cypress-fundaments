/// <reference types="cypress"/>

describe('Trabalhando com Alerta', () => {
    beforeEach(() => {
  
      cy.visit('https://www.wcaquino.me/cypress/componentes.html')
  
    })

    it('Trabalhando com alert()', () => {

        cy.get('#alert')
            .click()

        cy.on("window:alert", msg => {
            expect(msg).to.be.equal("Alert Simples")
        })

    })

    it.only('Trabalhando com alert() com mock', () => {

        const stub = cy.stub().as("alert")

        cy.on("window:alert", stub)

        cy.get('#alert').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith("Alert Simples")
        })

    })

})