/// <reference types="cypress" />

const billName = "Conta Exemplo"
const changedBillName = "Conta Alterada"
const transactionName = "Movimento exemplo"
const transactionValue = 500

describe('Casos de testes funcionais em barrigareact', () => {

    beforeEach('Logando', () => {

        cy.visit('/')

        cy.login('./login.json')

    })

    context('Trabalhando com Contas', () => {

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

            cy.xpath(`//table//td[contains(.,"${billName}")]/..//i[@class="far fa-edit"]`)
                .click()

            cy.get('[data-test=nome]')
                .clear()
                .type(changedBillName)

            cy.get('button[alt=Salvar]')
                .click()

            cy.get('.toast')
                .should('contain', 'Conta atualizada com sucesso!')

            cy.get('table > tbody')
                .should('contain', changedBillName)

        })

        it("Inserção de conta repetida", () => {

            cy.get('[data-test=nome]')
                .type(changedBillName)

            cy.get('button[alt=Salvar]')
                .click()

            cy.get('.toast')
                .should('contain', 'Erro: Error: Request failed with status code 400')

            cy.get('table > tbody')
                .should('contain', changedBillName)

        })

    })

    context('Outros testes', () => {

        it('Insersão de movimento', () => {

            cy.get('[data-test=menu-movimentacao')
                .click()

            cy.get('[data-test=descricao]')
                .type(transactionName)

            cy.get('[data-test=valor]')
                .type(transactionValue)

            cy.get('[data-test=envolvido]')
                .type('Interessado de exemplo')

            cy.get('[data-test=conta]')
                .select(changedBillName)

            cy.get('[data-test="status"]')
                .click()

            cy.contains('Salvar')
                .click()

            cy.get('.toast')
                .should('contain', 'Movimentação inserida com sucesso!')

            cy.get('[data-test=mov-row]')
                .should('contain', transactionName)

        })

        it('Verificando o saldo', () => {

            cy.xpath(`//tr[contains(., "${changedBillName}")]//td[2]`)
                .should('contain', transactionValue)

        })

        it('Remoção de movimento', () => {

            cy.get('[data-test="menu-extrato"]')
                .click()

            cy.xpath(`//li[contains(., "${transactionName}")]//i[@class="far fa-trash-alt"]`)
                .click()

            cy.get('.toast')
                .should('contain', 'Movimentação removida com sucesso!')

        })
    })

    after('Resetando a aplicação', () => {

        cy.resetData()

    })
})