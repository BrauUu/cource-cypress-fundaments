/// <reference types="cypress" /> - Ajuda o VSCode a Entender que o arquivo utilizará snippets do cypress

it('Teste Desagrupado', () => {

}) 

describe.only('Agrupador de Teste', () => {
  it('Teste Agrupado', () => {

  })

  it.skip('Teste Ignorado', () => {

  })
})