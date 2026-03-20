// const { faker } = require("@faker-js/faker");
import CompanyDataFaker from "../e2e/utils/GlobalDataFaker";   
import RegisterPage from "../support/pages/RegisterPage"; 
describe("Página cadastro - Sem Sucesso", () => {

    const company = CompanyDataFaker();
    const registerPage = RegisterPage();

    beforeEach(() => {
        cy.visit('/cadastro');
    })

    context("Validações faltando campos obrigatórios - primeira etapa do formulário", () => {
        it("Tenta cadastrar com email inválido", () => { 
            cy.get(registerPage.inputNome).type(company.companyNameFaker);
            cy.get(registerPage.inputCNPJ).type(company.cnpjFaker);
            cy.get(registerPage.inputEmail).type('emailinvalido');
            cy.get(registerPage.inputSenha).type(company.senhaFaker);
            cy.get(registerPage.inputSenhaVerificada).type(company.senhaFaker);
            cy.contains('Avançar').click();
            cy.contains('h2', 'Agora, os dados técnicos:').should('not.exist');
        })

        it("Tenta cadastrar uma clínica sem preencher os campos obrigatórios", () => {
            cy.contains('Avançar').click();
            cy.contains('h2', 'Agora, os dados técnicos:').should('not.exist');
        })

        it("Tenta cadastrar sem nome", () => {
            cy.get(registerPage.inputCNPJ).type(company.cnpjFaker);
            cy.get(registerPage.inputEmail).type(company.emailFaker);
            cy.get(registerPage.inputSenha).type(company.senhaFaker, { log: false });
            cy.get(registerPage.inputSenhaVerificada).type(company.senhaFaker, { log: false });
            cy.contains('Avançar').click();
            cy.contains('h2', 'Agora, os dados técnicos:').should('not.exist');
        })

        it("Tenta cadastrar sem CNPJ", () => {
            cy.get(registerPage.inputNome).type(company.companyNameFaker);
            cy.get(registerPage.inputEmail).type(company.emailFaker);
            cy.get(registerPage.inputSenha).type(company.senhaFaker, { log: false });
            cy.get(registerPage.inputSenhaVerificada).type(company.senhaFaker, { log: false });
            cy.contains('Avançar').click();
            cy.contains('h2', 'Agora, os dados técnicos:').should('not.exist');
        })

        it("Tenta cadastrar sem email", () => {
            cy.get(registerPage.inputNome).type(company.companyNameFaker);
            cy.get(registerPage.inputCNPJ).type(company.cnpjFaker);
            cy.get(registerPage.inputSenha).type(company.senhaFaker, { log: false });
            cy.get(registerPage.inputSenhaVerificada).type(company.senhaFaker, { log: false });
            cy.contains('Avançar').click();
            cy.contains('h2', 'Agora, os dados técnicos:').should('not.exist');
        })

        it("Tenta cadastrar sem senha", () => {
            cy.get(registerPage.inputNome).type(company.companyNameFaker);
            cy.get(registerPage.inputCNPJ).type(company.cnpjFaker);
            cy.get(registerPage.inputEmail).type(company.emailFaker);
            cy.get(registerPage.inputSenhaVerificada).type(company.senhaFaker, { log: false });
            cy.contains('Avançar').click();
            cy.contains('h2', 'Agora, os dados técnicos:').should('not.exist');
        })
    })

    context("Validações de senha - primeira etapa do formulário", () => {
         it("Tenta cadastrar com senha com menos de 6 caracteres", () => {
            cy.get(registerPage.inputNome).type(company.companyNameFaker);
            cy.get(registerPage.inputCNPJ).type(company.cnpjFaker);
            cy.get(registerPage.inputEmail).type(company.emailFaker);
            cy.get(registerPage.inputSenha).type('1', { log: false });
            cy.get(registerPage.inputSenhaVerificada).type('1', { log: false });
            cy.contains('Avançar').click();
            cy.contains('h2', 'Agora, os dados técnicos:').should('not.exist');
        })

        it("Tenta cadastrar com senhas que não coincidem", () => {
            cy.get(registerPage.inputNome).type(company.companyNameFaker);
            cy.get(registerPage.inputCNPJ).type(company.cnpjFaker);
            cy.get(registerPage.inputEmail).type(company.emailFaker);
            cy.get(registerPage.inputSenha).type(company.senhaFaker, { log: false });
            cy.get(registerPage.inputSenhaVerificada).type('senha456');
            cy.contains('Avançar').click();
            cy.contains('h2', 'Agora, os dados técnicos:').should('not.exist');
        })
    }) 

    context("Validações faltando campos obrigatórios - segunda etapa do formulário", () => {
        beforeEach(() => {
            cy.get(registerPage.inputNome).type(company.companyNameFaker);
            cy.get(registerPage.inputCNPJ).type(company.cnpjFaker);
            cy.get(registerPage.inputEmail).type(company.emailFaker);
            cy.get(registerPage.inputSenha).type(company.senhaFaker, { log: false });
            cy.get(registerPage.inputSenhaVerificada).type(company.senhaFaker, { log: false });
            cy.contains('Avançar').click();
            cy.contains('h2', 'Agora, os dados técnicos:').should('be.visible');
        })

        it("Tenta cadastrar sem preencher os campos obrigatórios", () => {
            cy.contains('Cadastrar').click();
            cy.location('pathname').should('eq', '/cadastro'); 
        })

        it("Tenta cadastrar sem telefone", () => {
            cy.get(registerPage.inputCEP).type(company.cepFaker);
            cy.get(registerPage.inputRua).type(company.ruaFaker);
            cy.get(registerPage.inputNumero).type(company.numeroFaker);
            cy.get(registerPage.inputComplemento).type(company.complementoFaker);
            cy.get(registerPage.inputEstado).type(company.estadoFaker);
            cy.contains('Cadastrar').click();
            cy.location('pathname').should('eq', '/cadastro'); 
        })

        it("Tenta cadastrar sem CEP", () => {
            cy.get(registerPage.inputTelefone).type(company.telefoneFaker);
            cy.get(registerPage.inputRua).type(company.ruaFaker);
            cy.get(registerPage.inputNumero).type(company.numeroFaker);
            cy.get(registerPage.inputComplemento).type(company.complementoFaker);
            cy.get(registerPage.inputEstado).type(company.estadoFaker);
            cy.contains('Cadastrar').click();
            cy.location('pathname').should('eq', '/cadastro'); 
        })

        it("Tenta cadastrar sem rua", () => {
            cy.get(registerPage.inputTelefone).type(company.telefoneFaker);
            cy.get(registerPage.inputCEP).type(company.cepFaker);
            cy.get(registerPage.inputNumero).type(company.numeroFaker);
            cy.get(registerPage.inputComplemento).type(company.complementoFaker);
            cy.get(registerPage.inputEstado).type(company.estadoFaker);
            cy.contains('Cadastrar').click();
            cy.location('pathname').should('eq', '/cadastro'); 
        })

        it("Tenta cadastrar sem número", () => {
            cy.get(registerPage.inputTelefone).type(company.telefoneFaker);
            cy.get(registerPage.inputCEP).type(company.cepFaker);
            cy.get(registerPage.inputRua).type(company.ruaFaker);
            cy.get(registerPage.inputComplemento).type(company.complementoFaker);
            cy.get(registerPage.inputEstado).type(company.estadoFaker);
            cy.contains('Cadastrar').click();
            cy.location('pathname').should('eq', '/cadastro'); 
        })

        it("Tenta cadastrar sem estado", () => {
            cy.get(registerPage.inputTelefone).type(company.telefoneFaker);
            cy.get(registerPage.inputCEP).type(company.cepFaker);
            cy.get(registerPage.inputRua).type(company.ruaFaker);
            cy.get(registerPage.inputNumero).type(company.numeroFaker);
            cy.get(registerPage.inputComplemento).type(company.complementoFaker);
            cy.contains('Cadastrar').click();
            cy.location('pathname').should('eq', '/cadastro'); 
        }) 
    })
})