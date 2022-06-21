const baseUrl = "https://barrigarest.wcaquino.me"

Cypress.Commands.add('createBill', (billName, token) => {

    cy.request({
        method: 'POST',
        url: `${baseUrl}/contas`,
        headers: {
            "Authorization": `JWT ${token}`
        },
        body: {
            "nome": billName
        }
    })

})