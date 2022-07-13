const backEndBaseUrl = "https://barrigarest.wcaquino.me"

Cypress.Commands.add('interceptLogin', (user, token) => {

    cy.fixture('./mocks/login.json').then(login => {
        cy.intercept({
            method: 'POST',
            url: `${backEndBaseUrl}/signin`
        }, {
            body: {
                id: 1,
                nome: user || login.username,
                token: token || login.token
            }
        })
    })
})

Cypress.Commands.add('interceptBalance', () => {

    cy.fixture('./mocks/balance.json').then(balance => {
        cy.intercept({
            method: 'GET',
            url: `${backEndBaseUrl}/saldo`
        }, {
            body: balance.body
        })
    })
})

Cypress.Commands.add('interceptBills', () => {

    cy.fixture('./mocks/bills.json').then(bills => {
        cy.intercept({
            method: 'GET',
            url: `${backEndBaseUrl}/contas`
        }, {
            body: bills.body
        })
    })
})