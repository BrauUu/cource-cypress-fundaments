/// <reference types="cypress"/>

describe('Trabalhando com elementos', () => {
  beforeEach(() => {

    cy.visit('https://www.wcaquino.me/cypress/componentes.html')

  })

  it('Trabalhando com textos', () => {
    //Muito abrangente - Péssimo
    cy.get('body').should('contain', 'Cuidado onde clica, muitas armadilhas...')

    //Menos abrangente - Péssimo/Ruim
    cy.get('span').should('contain', 'Cuidado onde clica, muitas armadilhas...')

    //Pode ser específico ou não - Ruim
    //Para melhorar deveria ser usado 'id', o metódo cy.contains ou de preferência propriedade específicas invés de classes
    //ex: cy.get('[data-cy=submit]').click()
    cy.get('.facilAchar').should('contain', 'Cuidado onde clica, muitas armadilhas...')

    //Avalia a propriedade 'text' do elemento selecionado, semelhante a igualdade estrita
    cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')

  })

  it('Trabalhando com links', () => {

    cy.contains('Voltar').click()

    cy.get('#resultado').should('have.text', 'Voltou!')

  })

  it.only('Trabalhando com campos de texto', () => {

    cy.get('#formNome')
      .type('Nome')
      .should('have.value', 'Nome')

    cy.get('[data-cy=dataSobrenome]')
      .type('Sobrenome')
      .should('have.value', 'Sobrenome')

    cy.get("#elementosForm\\:sugestoes")
      .type('Caixa de texto grande')
      .should('have.value', 'Caixa de texto grande')


  })
})