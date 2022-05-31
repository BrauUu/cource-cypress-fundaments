/// <reference types="cypress" />

describe('Casos de testes funcionais em barrigareact', () => {

    beforeEach('Logando', () => {

        cy.visit('/')

        cy.fixture('./login.json').then(login => {
            cy.get('[data-test=email]')
                .type(login.email)

            cy.get('[data-test=passwd]')
                .type(login.pass, { log: false })

            cy.contains("Entrar")
                .click()

        })

        cy.get('.toast')
            .should('contain', 'Bem vindo, ')

        cy.url()
            .should('be.eq', 'https://barrigareact.wcaquino.me/')

    })

    context('Trabalhando com Contas', () => {

        let billName = "Conta Exemplo"

        beforeEach('Acessando tela de contas', () => {

            cy.get('[data-test=menu-settings]')
                .click()

            cy.contains('Contas')
                .click()

            cy.url()
                .should('be.contain', '/contas')

        })

        it('Inserção de conta', () => {

            cy.get('[data-test=nome]')
                .type(billName)

            cy.get('button[alt=Salvar]')
                .click()

            cy.get('.toast')
                .should('contain', 'Conta inserida com sucesso!')

            cy.get('table > tbody')
                .should('contain', billName)

        })

        it('Alterando de conta', () => {

            const newBillName = "Conta Alterada"

            cy.xpath(`//table//td[contains(.,"${billName}")]/..//i[@class="far fa-edit"]`)
                .click()

            cy.get('[data-test=nome]')
                .clear()
                .type(newBillName)

            cy.get('button[alt=Salvar]')
                .click()

            cy.get('.toast')
                .should('contain', 'Conta atualizada com sucesso!')

            cy.get('table > tbody')
                .should('contain', newBillName)

        })

    })

    after('Resetando a aplicação', () => {

        cy.get('[data-test=menu-settings]')
            .click()

        cy.contains('Resetar')
            .click()

        cy.get('.toast')
            .should('contain', 'Dados resetados com sucesso!')


    })

})