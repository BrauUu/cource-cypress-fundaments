/// <reference types="cypress" />

const baseUrl = "https://barrigareact.wcaquino.me/"

const bill = "Conta Exemplo"
const billToChange = "Conta para alterar"
const changedBill = "Conta Alterada"
const repeatedBill = "Conta mesmo nome"
const transaction = "Movimento exemplo"
const transactionValue = 500
const billToTransaction = "Conta com movimentacao"
const balance = "2.686,00"
const transactionToExclude = "Movimentacao para exclusao"

describe('Casos de testes funcionais em barrigareact', () => {

    beforeEach('Logando', () => {

        cy.visit(baseUrl)

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
                .type(bill)

            cy.get('button[alt=Salvar]')
                .click()

            cy.get('.toast')
                .should('contain', 'Conta inserida com sucesso!')

            cy.get('table > tbody')
                .should('contain', bill)

        })

        it('Alterando de conta', () => {

            cy.xpath(`//table//td[contains(.,"${billToChange}")]/..//i[@class="far fa-edit"]`)
                .click()

            cy.get('[data-test=nome]')
                .clear()
                .type(changedBill)

            cy.get('button[alt=Salvar]')
                .click()

            cy.get('.toast')
                .should('contain', 'Conta atualizada com sucesso!')

            cy.get('table > tbody')
                .should('contain', changedBill)

        })

        it("Inserção de conta repetida", () => {

            cy.get('[data-test=nome]')
                .type(repeatedBill)

            cy.get('button[alt=Salvar]')
                .click()

            cy.get('.toast')
                .should('contain', 'Erro: Error: Request failed with status code 400')

            cy.get('table > tbody')
                .should('contain', repeatedBill)

        })

    })

    context('Outros testes', () => {

        it('Insersão de movimento', () => {

            cy.get('[data-test=menu-movimentacao')
                .click()

            cy.get('[data-test=descricao]')
                .type(transaction)

            cy.get('[data-test=valor]')
                .type(transactionValue)

            cy.get('[data-test=envolvido]')
                .type('Interessado de exemplo')

            cy.get('[data-test=conta]')
                .select(billToTransaction)

            cy.get('[data-test="status"]')
                .click()

            cy.contains('Salvar')
                .click()

            cy.get('.toast')
                .should('contain', 'Movimentação inserida com sucesso!')

            cy.get('[data-test=mov-row]')
                .should('contain', transaction)

        })

        it('Verificando o saldo total', () => {

            cy.xpath(`//tr[contains(., "Total")]//td[2]`)
                .should('contain', balance)

        })

        it('Remoção de movimento', () => {

            cy.get('[data-test="menu-extrato"]')
                .click()

            cy.xpath(`//li[contains(., "${transactionToExclude}")]//i[@class="far fa-trash-alt"]`)
                .click()

            cy.get('.toast')
                .should('contain', 'Movimentação removida com sucesso!')

        })
    })

    after('Resetando a aplicação', () => {

        cy.resetData()

    })
})