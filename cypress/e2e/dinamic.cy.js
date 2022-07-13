/// <reference types="cypress" />

const meals = [
    "Carne",
    "Frango",
    "Pizza",
    "Vegetariano"
]

describe('Testes dinâmicos', () => {
    beforeEach(() => {

        cy.visit('https://www.wcaquino.me/cypress/componentes.html')

    })

    meals.forEach(meal => {
        
        it(`Cadastro com ${meal}`, () => {
    
            cy.get('#formNome')
                .type('Nome')
    
            cy.get('[data-cy="dataSobrenome"]')
                .type('Sobrenome')
    
            cy.get(`[name=formSexo][value=M]`)
                .click()
    
            cy.xpath(`//label[contains(., '${meal}')]/preceding-sibling::input`)
                .click()
    
            cy.get('[data-test="dataEscolaridade"]').select('Doutorado')
    
            cy.get('[data-testid="dataEsportes"]').select('Corrida')
    
            cy.get('#formCadastrar').click()

            cy.get('#resultado').should('contain', 'Cadastrado')
    
        })
    })

    it(`Cadastro selecionando todas opções de comida (Each)`, () => {
    
        cy.get('#formNome')
            .type('Nome')

        cy.get('[data-cy="dataSobrenome"]')
            .type('Sobrenome')

        cy.get(`[name=formSexo][value=M]`)
            .click()

        cy.get(`[name="formComidaFavorita"]`).each(option => {
            cy.wrap(option)
                .click()
        })

        cy.get('[data-test="dataEscolaridade"]').select('Doutorado')

        cy.get('[data-testid="dataEsportes"]').select('Corrida')

        cy.clickAlert('#formCadastrar', 'Tem certeza que voce eh vegetariano?')

    })
})