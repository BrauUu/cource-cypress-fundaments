// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

require('cypress-xpath')

// Import commands.js using ES2015 syntax:
import './commands'
import './barrigareact/functionalCommands'
import './barrigarest/apiCommands'

//Foi invertido a prioridade dos seletores 'data-testid' e 'data-test'

Cypress.SelectorPlayground.defaults({
  selectorPriority: [
    'data-cy',
    'data-testid',
    'data-test',
    'id',
    'class',
    'tag',
    'attributes',
    'nth-child'
  ],
})

// Alternatively you can use CommonJS syntax:
// require('./commands')
