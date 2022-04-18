/// <reference types="cypress"/>

describe('Trabalhando com Alerta e outros eventos do Window', () => {
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

    it('Trabalhando com alert() com mock', () => {

        const stub = cy.stub().as("alert")

        cy.on("window:alert", stub)

        cy.get('#alert').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith("Alert Simples")
        })

    })

    it('Trabalhando com confirm()', () => {

        cy.on("window:confirm", msg => {
            expect(msg).to.be.equal("Confirm Simples")
        })

        cy.on("window:alert", msg => {
            expect(msg).to.be.equal("Confirmado")
        })

        cy.get('#confirm').click()

    })

    it('Cancelando um confirm()', () => {

        cy.on("window:confirm", msg => {
            expect(msg).to.be.equal("Confirm Simples")
            return false;
        })

        cy.on("window:alert", msg => {
            expect(msg).to.be.equal("Negado")
        })

        cy.get('#confirm').click()

    })

    it.only('Trabalhando com prompt()', () => {

        let value = 23

        cy.window().then( win => {
            cy.stub(win, 'prompt').returns(value)
        })
        cy.on("window:confirm", msg => {
            expect(msg).to.be.equal(`Era ${value}?`)
        })

        cy.on("window:alert", msg => {
            expect(msg).to.be.equal(`:D`)
        })

        cy.get('#prompt').click()

    })

    it('Desafio do cadastro', () => {

        cy.once("window:alert", msg => {
            expect(msg).to.be.equal(`Nome eh obrigatorio`)
        })

        cy.get('#formCadastrar')
            .click()

        cy.get('#formNome').then(selector => {

            cy.once("window:alert", msg => {
                expect(msg).to.be.equal(`Sobrenome eh obrigatorio`)
            })

            cy.wrap(selector)
                .clear()
                .type('Brayan')

            cy.get('#formCadastrar')
                .click()

        })

        cy.get('[data-cy="dataSobrenome"]').then(selector => {

            cy.once("window:alert", msg => {
                expect(msg).to.be.equal(`Sexo eh obrigatorio`)
            })

            cy.wrap(selector)
                .clear()
                .type('Frank')

            cy.get('#formCadastrar')
                .click()

        })

        cy.get('[value="M"]').then(selector => {

            cy.once("window:alert", msg => {
                expect(msg).to.be.equal(`Sexo eh obrigatorio`)
            })

            cy.wrap(selector)
                .check()

            cy.get('#formCadastrar')
                .click()

        })
        
        cy.get('#resultado')
            .should('contain', 'Cadastrado')
            .and('contain', 'Brayan')
            .and('contain', 'Frank')
            .and('contain', 'Masculino')

    })
})