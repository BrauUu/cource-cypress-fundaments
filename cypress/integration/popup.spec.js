/// <reference types="cypress"/>

describe('Trabalhando com Popups', () => {

    context("Interagindo com um popup", () => {

        it("Invocando um popup", () => {

            cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    
            cy.window().then(win => {
                cy.stub(win, 'open').as('popup')
            })
    
            cy.get('#buttonPopUp')
                .click()
    
            cy.get('@popup')
                .should('be.called')
    
        })
    
        it("Testando um popup internamente", () => {
    
            cy.visit('https://www.wcaquino.me/cypress/frame.html')
    
            cy.on('window:alert', msg => {
                expect(msg).to.be.equal(`Click OK!`)
            })
    
            cy.get('#otherButton')
                .click()
    
        })

    })

    context("Testando um popup via link", () => {

        beforeEach(() => {

            cy.visit('https://www.wcaquino.me/cypress/componentes.html')

        })

        it('Verificando a url de um popup', () => {

            cy.contains('Popup2')
                .should('have.prop', 'href')
                .and('eq', 'https://www.wcaquino.me/cypress/frame.html')

        })

        it('Acessando o popup dinamicamente', () => {

            cy.contains('Popup2').then(popup => {
                cy.visit(popup.prop('href'))

                cy.get('#tfield')
                    .type('Foi possível acessar')
            })

        })
        it('Forçando o link a abrir na página atual', () => {

            cy.contains('Popup2')
                .invoke('removeAttr', 'target')
                .click()

            cy.get('#tfield')
                .type('Foi possível acessar')

        })

    })
})