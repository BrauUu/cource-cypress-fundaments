/// <reference types="cypress" />

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

        cy.request({
            method: 'POST',
            url: `${baseUrl}/contas`,
            headers: {
                "Authorization": `JWT ${token}`
            },
            body: {
                "nome": "Conta para ser alterada"
            }
        }).then(response => {

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

    it.only('Inserindo uma conta com nome repetido', () => {

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