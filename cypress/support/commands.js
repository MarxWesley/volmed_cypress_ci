// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email, password) => {
  cy.session([email, password], () => {

    cy.visit('/login');

    cy.intercept('POST', '**/auth/login').as('loginClinica');

    cy.get('[data-test="inputLoginEmail"]').type(email);
    cy.get('[data-test="inputLoginSenha"]').type(password, { log: false });

    cy.contains('Entrar').click();

    cy.wait('@loginClinica')
      .its('response.statusCode')
      .should('eq', 404);

    cy.location('pathname').should('eq', '/dashboard');
  });
});

Cypress.Commands.add('loginApi', (email, password) => {
    cy.request({
        method: 'POST',
        url: Cypress.env('baseUrl'),
        body: {
            email: email,
            senha: password
        }
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.auth).to.be.true;
        expect(response.body.rota).to.eq('/clinica');
        expect(response.body).to.have.property('token');
        cy.wrap(response.body.token).as('token');
    });
});   