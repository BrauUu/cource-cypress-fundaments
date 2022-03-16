/// <reference types="cypress"/>

describe('Passos Básicos', () => {
  it('Visitando uma página', () => {

    cy.visit('https://www.wcaquino.me/cypress/componentes.html')

    cy.title().should('eq', 'Campo de Treinamento')

    let titleVal

    cy.title().then(title => {
      console.log(title)
      cy.get('#formNome')
        .type(title)

      titleVal = title;
    })

    cy.get("#formSobrenome").then(selector => {
      cy.get(selector).type(titleVal)
    })


  })
  it('Clicando sobre botão e buscando seu valor', () => {

    cy.visit('https://www.wcaquino.me/cypress/componentes.html')

    cy.get('#buttonSimple')
      .click()
      .should('have.value', 'Obrigado!')

  })
})