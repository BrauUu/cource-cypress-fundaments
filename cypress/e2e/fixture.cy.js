/// <reference types= "cypress" />

describe('Trabalhando com fixtures', () => {

    it('Buscar os dados de um arquivo', () => {

        cy.visit('https://www.wcaquino.me/cypress/componentes.html')

        cy.fixture('user.json').then(user => {
            cy.get('#formNome')
                .type(user.name)

            cy.get('[data-cy="dataSobrenome"]')
                .type(user.surname)

            cy.get(`[name=formSexo][value=${user.sex}]`)
                .click()

            cy.get(`[name=formComidaFavorita][value=${(user.favoriteFood).toLowerCase()}]`)
                .click()

            cy.get('[data-test="dataEscolaridade"]').select((user.schooling).toLowerCase())

            cy.get('[data-testid="dataEsportes"]').select((user.favoriteSport).toLowerCase())

            cy.get('#formCadastrar').click()

        })
        
        cy.get('#resultado').should('contain', 'Cadastrado')       

    })
})