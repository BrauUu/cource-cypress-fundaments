/// <reference types="cypress"/>

describe('Passos Básicos', () => {
  it('Visitando uma página', () => {
    cy.visit('https://www.wcaquino.me/cypress/componentes.html')

    cy.title().should('eq', 'Campo de Treinamento')

  })
  it('Clicando sobre botão e buscando seu valor', () => {

    cy.visit('https://www.wcaquino.me/cypress/componentes.html')

    cy.get('#buttonSimple')
      .click()
      .should('have.value', 'Obrigado!')

  })
})