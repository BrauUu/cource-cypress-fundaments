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

    const date = new Date('2022-05-16T17:00:00')

    context('Manipulando horário da máquina', () => {

        it('Utilizando cy.clock() sem parâmetros', () => {
            
            cy.clock()
    
            cy.get('#buttonNow').click()
    
            cy.get('#resultado > span').should('contain', '31/12/1969')

        })

        it('Utilizando uma data como parãmetro para o cy.clock()', () => {

            cy.clock(date.getTime())
    
            cy.get('#buttonNow').click()
    
            cy.get('#resultado > span').should('contain', '16/05/2022')

        })

        it('Uilizando cy.tick', () => {

            cy.clock()

            cy.tick(1000)

            cy.get('#buttonTimePassed')
                .click()

            cy.get('#resultado > span')
                .invoke('text')
                .should('eq', '1000')
                

        })
    })
    

})