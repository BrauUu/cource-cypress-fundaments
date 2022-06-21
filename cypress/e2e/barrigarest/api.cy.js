/// <reference types="cypress" />
const dayjs = require('dayjs')

const baseUrl = "https://barrigarest.wcaquino.me"
let token

describe('Casos de testes via API', () => {

    before('Efetuando autenticação', () => {

        cy.request('POST', `${baseUrl}/signin`,
            {
                "email": "brayan@teste.com",
                "senha": "brayan@teste",
                "redirecionar": false
            }
        ).then(response => {
            expect(response.status).eq(200)

            token = response.body.token
        })
    })

    it('Inserindo uma conta', () => {

        cy.request({
            method: 'POST',
            url: `${baseUrl}/contas`,
            headers: {
                "Authorization": `JWT ${token}`
            },
            body: {
                "nome": "Conta via API"
            }
        }).its('status')
            .should('be.eq', 201)

    })

    it('Alterando uma conta', () => {

        cy.createBill("Conta para ser alterada", token)
            .then(response => {

                expect(response.status).eq(201)

                cy.request({
                    method: 'PUT',
                    url: `${baseUrl}/contas/${response.body.id}`,
                    headers: {
                        "Authorization": `JWT ${token}`
                    },
                    body: {
                        "nome": "Conta alterada"
                    }
                }).its('status')
                    .should('be.eq', 200)

            })
    })

    it('Inserindo uma conta com nome repetido', () => {

        cy.request({
            method: 'POST',
            url: `${baseUrl}/contas`,
            headers: {
                "Authorization": `JWT ${token}`
            },
            body: {
                "nome": "Conta mesmo nome"
            },
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).eq(400)
            expect(response.body.error).contains('Já existe uma conta com esse nome!')
        })
    })

    it('Inserindo movimentação', () => {

        cy.createBill("Conta para ser alterada", token)
            .then(response => {

                expect(response.status).eq(201)

                cy.request({
                    method: 'POST',
                    url: `${baseUrl}/transacoes`,
                    headers: {
                        "Authorization": `JWT ${token}`
                    },
                    body: {
                        conta_id: response.body.id,
                        data_pagamento: dayjs(new Date).add(1, 'day').format('DD/MM/YYYY'),
                        data_transacao: dayjs(new Date).format('DD/MM/YYYY'),
                        descricao: "Movimento via API",
                        envolvido: "Algum interessado",
                        status: true,
                        tipo: "REC",
                        valor: "200",
                    }
                }).its('status')
                    .should('be.eq', 201)
            })
    })

    after('Limpeza de dados', () => {

        cy.request({
            method: 'GET',
            url: `${baseUrl}/reset`,
            headers: {
                "Authorization": `JWT ${token}`
            }
        }).its('status')
            .should('be.eq', 200)

    })

})