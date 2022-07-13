/// <reference types="cypress"/>

describe("", () => {
    beforeEach(() => {

        cy.visit('https://www.wcaquino.me/cypress/componentes.html')

    })

    context("Utilizando cy.wrap", () => {

        it("Exemplo com cy.wrap 01", () => {

            const person = {
                name: "Brayan",
                age: 20,
                sex: "M"
            }

            expect(person).to.have.property("name")

            cy.wrap(person)
                .should('have.property', 'name')

        })

        it("Exemplo com cy.wrap 02", () => {

            cy.get("#formNome").then(el => {

                cy.wrap(el)
                    .type("Digitando via then(promisse)")

            })
        })
    })

    context("Utilizando its", () => {

        it("Exemplo com its", () => {

            const person = {
                name: "Amanda",
                age: 19,
                sex: "F"
            }
    
            cy.wrap(person)
                .its("name")
                .should('eq', 'Amanda')

            person.address = { 
                street: "Rua Brasil",
                num: "366"
            }

            cy.wrap(person)
                .its("address")
                .should('have.property', "street", "Rua Brasil")

            cy.wrap(person)
                .its("address")
                .its("street")
                .should('eq', "Rua Brasil")

            cy.title()
                .its("length")
                .should("be.equal", 20)

        })

    })

    context("Utilizando invoke", () => {

        it("Exemplo com invoke", () => {


            const getValue = () => 1;

            const sum = (a, b) => a+b;


            const obj = {
                setValue: () => 1,
                name: "obj"
            }

            cy.wrap({fn: getValue})
                .invoke("fn")
                .should('eq', 1)

            cy.wrap({sum: sum})
                .invoke("sum", 1, 2)
                .should('eq', 3)

            cy.wrap(obj)
                .invoke("setValue")
                .should('eq', 1)

            cy.get("#formNome").invoke('val', "Inserção via JQuery")
            cy.window().invoke('alert', "Alert invocado via cy.invoke")
            
        })

    })

})