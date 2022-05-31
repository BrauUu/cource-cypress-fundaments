Cypress.Commands.add('login', (credential = './login.json') => {

    cy.fixture(credential).then(login => {
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

Cypress.Commands.add('resetData', () => {

    cy.get('[data-test="menu-settings"]')
        .click()

    cy.contains('Resetar')
        .click()

    cy.get('.toast')
        .should('contain', 'Dados resetados com sucesso!')

})