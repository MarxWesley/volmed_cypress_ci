import LoginPage from "../support/pages/LoginPage";

const loginPage = LoginPage();

describe("Página de login" , () => {

    beforeEach(() => {
        cy.visit('/login');
    })

    context("Validações de campos obrigatórios", () => {
        it("Tenta logar sem preencher os campos obrigatórios", () => {
            cy.contains('Entrar').click();
            cy.url().should('include', '/login');
            cy.location('pathname').should('eq', '/login');
        })

        it("Tenta logar apenas com o email preenchido", () => {
            cy.get(loginPage.inputLoginEmail).type('user@example.com');
            cy.contains('Entrar').click();
            cy.url().should('include', '/login');
            cy.location('pathname').should('eq', '/login');
        })

        it("Tenta logar apenas com a senha preenchida", () => {
            cy.get(loginPage.inputLoginSenha).type('password123');
            cy.contains('Entrar').click();
            cy.url().should('include', '/login');
            cy.location('pathname').should('eq', '/login');
        })
    })

    context("Validações de login", () => {
        it("Tenta logar com credenciais senha inválida", () => {
            cy.get(loginPage.inputLoginEmail).type(Cypress.env('email'));
            cy.get(loginPage.inputLoginSenha).type('wrongpassword', {log: false});
            cy.get(loginPage.botaoEntrar).click();

            cy.intercept('POST', '**/auth/login').as('loginRequest');
            cy.wait('@loginRequest').its('response.statusCode').should('eq', 401);

            cy.url().should('include', '/login');
        })
        
        it("Tenta logar com credenciais email inválido", () => {
            cy.get(loginPage.inputLoginEmail).type('emailInvalido.com');
            cy.get(loginPage.inputLoginSenha).type('password123', {log: false});
            cy.get(loginPage.botaoEntrar).click();

            cy.url().should('include', '/login');
            cy.contains('h2', 'Faça login em sua conta').should('be.visible');
        })
        

    })


    context("Validações de login com sucesso", () => {
        it("Tenta logar com credenciais válidas", () => {
            cy.get(loginPage.inputLoginEmail).type(Cypress.env('email'));
            cy.get(loginPage.inputLoginSenha).type(Cypress.env('password'), {log: false});
            cy.get(loginPage.botaoEntrar).click();

            cy.intercept('POST', '**/auth/login').as('loginRequest');
            cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);

            cy.get('h2').contains('Área Administrativa').should('be.visible');
            cy.get('a').contains('Sair').should('be.visible');
            cy.url().should('include', '/dashboard');
        })

        it("Deslogar usuário logado", () => {
            cy.get(loginPage.inputLoginEmail).type(Cypress.env('email'));
            cy.get(loginPage.inputLoginSenha).type(Cypress.env('password'), {log: false});
            cy.get(loginPage.botaoEntrar).click();

            cy.intercept('POST', '**/auth/login').as('loginRequest');
            cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);

            cy.intercept('GET', '**/consulta').as('consultaRequest');
            cy.wait('@consultaRequest').its('response.statusCode').should('eq', 200);

            cy.intercept('GET', '**/especialista').as('especialistaRequest');
            cy.wait('@especialistaRequest').its('response.statusCode').should('eq', 200);

            cy.get('a').contains('Sair').should('be.visible').click();
            cy.url().should('include', '/');
            cy.location('pathname').should('eq', '/');
        })
    })
})