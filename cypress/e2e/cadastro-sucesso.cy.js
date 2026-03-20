import  RegisterPage from '../support/pages/RegisterPage';

const registerPage = RegisterPage();

describe('Página de Cadastro - Sucesso', () => {
    beforeEach(() => {
        cy.visit('/');
    })

    context("Verifica redirecionamento de página", () => {
        it('Clica no link "Cadastre-se" e redireciona para a página de cadastro', () => {
        cy.contains('Cadastre-se').click();
        cy.url().should('include', '/cadastro');
        cy.location('pathname').should('eq', '/cadastro');
        })
    })

    context("Primeira parte seção de cadastro", () => {
        it('Digita dados da clinica e exibe área de dados para inserção de dados técnicos', () => {
            cy.contains('Cadastre-se').click();
            cy.get(registerPage.inputNome).type('Clinica do Dr Doom');
            cy.get(registerPage.inputCNPJ).type('12345678000199');
            cy.get(registerPage.inputEmail).type('clinica@drdoom.com');
            cy.get(registerPage.inputSenha).type('senha123');
            cy.get(registerPage.inputSenhaVerificada).type('senha123');
            cy.get('.sc-bcXHqe').click();
            cy.contains('h2', 'Agora, os dados técnicos:').should('be.visible');
            cy.get('.sc-laZRCg').should('exist').should('be.visible');
        })
    })

    context("Segunda parte seção de cadastro", () => {
        it('Cadastra una clinica', () => {
            cy.contains('Cadastre-se').click();
            cy.get(registerPage.inputNome).type('Clinica do Dr Doom');
            cy.get(registerPage.inputCNPJ).type('12345678000199');
            cy.get(registerPage.inputEmail).type('clinica@drdoom.com');
            cy.get(registerPage.inputSenha).type('senha123');
            cy.get(registerPage.inputSenhaVerificada).type('senha123');

            cy.get('.sc-bcXHqe').click();

            cy.get(registerPage.inputTelefone).type('11987654321');
            cy.get(registerPage.inputCEP).type('12345678');
            cy.get(registerPage.inputRua).type('Rua do Dr Doom');
            cy.get(registerPage.inputNumero).type('123');
            cy.get(registerPage.inputComplemento).type('Sala 456');
            cy.get(registerPage.inputEstado).type('SP');

            cy.contains('Cadastrar').click();
            cy.location('pathname').should('eq', '/login'); 
        })
    })

})