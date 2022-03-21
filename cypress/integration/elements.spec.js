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

  it('Trabalhando com campos de texto', () => {

    cy.get('#formNome')
      .type('Nome')
      .should('have.value', 'Nome')

    cy.get('[data-cy=dataSobrenome]')
      .type('Sobrenome')
      .should('have.value', 'Sobrenome')

    cy.get("#elementosForm\\:sugestoes")
      .type('Caixa de texto grande')
      .should('have.value', 'Caixa de texto grande')

    cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
      .type('Campo em tabela')
      .should('have.value', 'Campo em tabela')

    cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
      .clear()
      .type('Campo em tabelaa{backspace}', {delay: 100})
  })
  it('Trabalhando com Radio buttons', () => {
    
    cy.get('#formSexoFem')
      .click()
      .should('be.checked')
    
    cy.get('#formSexoMasc')
      .should('not.be.checked')

    cy.get('#formSexoMasc')
      .click()
      .should('be.checked')
    
    cy.get('#formSexoFem')
      .should('not.be.checked')

    cy.get('[name="formSexo"]')
      .should('have.length', 2)

  })

  it('Trabalhando com Checkbox', () => {

    cy.get('[name="formComidaFavorita"]')
      .click({multiple: true})
      .should('be.checked')
  })

  it('Trabalhando com Combo', () => {

    cy.get('[data-test="dataEscolaridade"]')
      .select('2o grau completo')
      .should('have.value', '2graucomp')

      cy.get('[data-test="dataEscolaridade"] option')
        .should('have.length', 8)
      
      cy.get('[data-test="dataEscolaridade"] option').then(options => {
        const values = []
        options.each(function() {
          values.push(this.innerHTML)
        })
        expect(values).to.include.members(["Mestrado"])
      })

  })

  it.only('Trabalhando com Combo Multiplo', () => {

    cy.get('[data-testid="dataEsportes"')
      .select(['futebol', 'Corrida', 'natacao'])

      cy.get('[data-testid="dataEsportes"').then(combo => {
       cy.wrap(combo.val()).should('deep.equal', [ "natacao", "futebol", "Corrida" ])
      })

  })
})