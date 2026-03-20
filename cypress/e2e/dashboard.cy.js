import DashboardPage from "../support/pages/Dashboard";
import DoctorDataFaker from "./utils/DoctorDataFaker";

const dashBoardPage = DashboardPage();
const doctor = DoctorDataFaker();

describe('Usuário logado - Dashboard', () => {
    beforeEach(() => {
        cy.visit('/login');
        cy.login("clinica@drdoom.com", "senha123"); 
    })

    context("Valida redirecionamento na página de dashboard", () => {

        it("Verifica página de redirecionamento no login com sucesso", () => {
            cy.visit('/dashboard');
            cy.url().should('include', '/dashboard');
            cy.url().should('eq', 'http://localhost:3000/dashboard');
        })

        it("Com usuário logado, valida formulário de cadastro de especialista", () => {
            cy.visit('/dashboard');
            cy.url().should('include', '/dashboard');
            cy.contains("Cadastrar especialista").should('be.visible').click();
        })
    })

    context("Valida modal de cadastro de especialista", () =>{

        beforeEach(() => {
            cy.visit('/dashboard');
            cy.contains('Cadastrar especialista').should('be.visible').click();
        })

        it('Verifica se o checkbox "Atende por plano?" está desmarcado', () => {
            cy.get(dashBoardPage.checkBox).should('have.attr', 'aria-label', 'Atende por plano?').and('not.be.checked');
        })

        it('Seleciona o botão checkbox para visualizar os planos de saúde', () => {
            cy.get(dashBoardPage.checkBox).check();
            cy.get('form').find('input[type="checkbox"]').should('be.checked').and('not.be.disabled')
            cy.get('[type="checkbox"]').check(['Sulamerica', 'Unimed', 'Bradesco'])
        })
    })

    context("Modal de cadastro de especialista", () => {

        beforeEach(() => {
            cy.visit('/dashboard');
            cy.contains('Cadastrar especialista').should('be.visible').click();
        })

        it('Cadastra especialista que atende por plano e validar se todas checkbox estão visíveis', () => {
            cy.get(dashBoardPage.inputEspecialistaNome).type(doctor.nome);
            cy.get(dashBoardPage.inputEspecialistaEmail).type(doctor.email);
            cy.get(dashBoardPage.inputEspecialistaSenha).type(doctor.senha, { log: false });
            cy.get(dashBoardPage.inputEspecialistaSenhaVerificada).type(doctor.senha, { log: false });
            cy.get(dashBoardPage.inputEspecialistaEspecialidade).type(doctor.especialidade);
            cy.get(dashBoardPage.inputEspecialistaCRM).type(doctor.CRM);  
            cy.get(dashBoardPage.inputEspecialistaTelefone).type(doctor.telefone);  
            cy.get(dashBoardPage.insiraImagemEspecialista).type('https://s2.glbimg.com/Y3X4qWUVv35RgqHOvGqZ67BtBwg=/600x0/filters:quality(70)/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2022/B/r/RUAqubR0eByCv3ttFVOw/2017-06-12-kratos.jpg');
            cy.get(dashBoardPage.inputEspecialistaCEP).type(doctor.cep);
            cy.get(dashBoardPage.inputEspecialistaRua).type(doctor.rua);
            cy.get(dashBoardPage.inputEspecialistaNumero).type(doctor.numero);
            cy.get(dashBoardPage.inputEspecialistaComplemento).type(doctor.complemento);
            cy.get(dashBoardPage.inputEspecialistaEstado).type(doctor.estado);

            cy.get(dashBoardPage.checkBox).check();
            cy.get(dashBoardPage.checkBox).last().scrollIntoView({easing: 'linear'});

            cy.get(".MuiFormGroup-root").each(($checkbox) => {
                cy.wrap($checkbox).should('be.visible');
            })
        })

        it('Cadastrar especialista sem nome - não permite', () => {
            cy.get(dashBoardPage.inputEspecialistaEmail).type(doctor.email);
            cy.get(dashBoardPage.inputEspecialistaSenha).type(doctor.senha, { log: false });
            cy.get(dashBoardPage.inputEspecialistaSenhaVerificada).type(doctor.senha, { log: false });
            cy.get(dashBoardPage.inputEspecialistaEspecialidade).type(doctor.especialidade);
            cy.get(dashBoardPage.inputEspecialistaCRM).type(doctor.CRM);  
            cy.get(dashBoardPage.inputEspecialistaTelefone).type(doctor.telefone);  
            cy.get(dashBoardPage.insiraImagemEspecialista).type('https://s2.glbimg.com/Y3X4qWUVv35RgqHOvGqZ67BtBwg=/600x0/filters:quality(70)/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2022/B/r/RUAqubR0eByCv3ttFVOw/2017-06-12-kratos.jpg');
            cy.get(dashBoardPage.inputEspecialistaCEP).type(doctor.cep);
            cy.get(dashBoardPage.inputEspecialistaRua).type(doctor.rua);
            cy.get(dashBoardPage.inputEspecialistaNumero).type(doctor.numero);
            cy.get(dashBoardPage.inputEspecialistaComplemento).type(doctor.complemento);
            cy.get(dashBoardPage.inputEspecialistaEstado).type(doctor.estado);

            cy.get(dashBoardPage.checkBox).check();
            cy.get(dashBoardPage.checkBox).last().scrollIntoView({easing: 'linear'});
            cy.get('[type="checkbox"]').check(['Sulamerica', 'Unimed', 'Bradesco'])
            
            cy.get(dashBoardPage.btnCadastrar).click();

            cy.contains('h2', 'Cadastre o especialista inserindo os dados abaixo:');
        })

        it('Cadastrar especialista sem email - não permite', () => {
            cy.get(dashBoardPage.inputEspecialistaNome).type(doctor.nome);
            cy.get(dashBoardPage.inputEspecialistaSenha).type(doctor.senha, { log: false });
            cy.get(dashBoardPage.inputEspecialistaSenhaVerificada).type(doctor.senha, { log: false });
            cy.get(dashBoardPage.inputEspecialistaEspecialidade).type(doctor.especialidade);
            cy.get(dashBoardPage.inputEspecialistaCRM).type(doctor.CRM);  
            cy.get(dashBoardPage.inputEspecialistaTelefone).type(doctor.telefone);  
            cy.get(dashBoardPage.insiraImagemEspecialista).type('https://s2.glbimg.com/Y3X4qWUVv35RgqHOvGqZ67BtBwg=/600x0/filters:quality(70)/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2022/B/r/RUAqubR0eByCv3ttFVOw/2017-06-12-kratos.jpg');
            cy.get(dashBoardPage.inputEspecialistaCEP).type(doctor.cep);
            cy.get(dashBoardPage.inputEspecialistaRua).type(doctor.rua);
            cy.get(dashBoardPage.inputEspecialistaNumero).type(doctor.numero);
            cy.get(dashBoardPage.inputEspecialistaComplemento).type(doctor.complemento);
            cy.get(dashBoardPage.inputEspecialistaEstado).type(doctor.estado);

            cy.get(dashBoardPage.checkBox).check();
            cy.get(dashBoardPage.checkBox).last().scrollIntoView({easing: 'linear'});

            cy.get(".MuiFormGroup-root").each(($checkbox) => {
                cy.wrap($checkbox).should('be.visible');
            })

            cy.get(dashBoardPage.btnCadastrar).click();

            cy.contains('h2', 'Cadastre o especialista inserindo os dados abaixo:');
        })

        it('Cadastrar especialista com email inválido - não permite', () => {
            cy.get(dashBoardPage.inputEspecialistaNome).type(doctor.nome);
            cy.get(dashBoardPage.inputEspecialistaEmail).type('emailinvalido');
            cy.get(dashBoardPage.inputEspecialistaSenha).type(doctor.senha, { log: false });
            cy.get(dashBoardPage.inputEspecialistaSenhaVerificada).type(doctor.senha, { log: false });
            cy.get(dashBoardPage.inputEspecialistaEspecialidade).type(doctor.especialidade);
            cy.get(dashBoardPage.inputEspecialistaCRM).type(doctor.CRM);  
            cy.get(dashBoardPage.inputEspecialistaTelefone).type(doctor.telefone);  
            cy.get(dashBoardPage.insiraImagemEspecialista).type('https://s2.glbimg.com/Y3X4qWUVv35RgqHOvGqZ67BtBwg=/600x0/filters:quality(70)/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2022/B/r/RUAqubR0eByCv3ttFVOw/2017-06-12-kratos.jpg');
            cy.get(dashBoardPage.inputEspecialistaCEP).type(doctor.cep);
            cy.get(dashBoardPage.inputEspecialistaRua).type(doctor.rua);
            cy.get(dashBoardPage.inputEspecialistaNumero).type(doctor.numero);
            cy.get(dashBoardPage.inputEspecialistaComplemento).type(doctor.complemento);
            cy.get(dashBoardPage.inputEspecialistaEstado).type(doctor.estado);

            cy.get(dashBoardPage.checkBox).check();
            cy.get(dashBoardPage.checkBox).last().scrollIntoView({easing: 'linear'});

            cy.get(".MuiFormGroup-root").each(($checkbox) => {
                cy.wrap($checkbox).should('be.visible');
            })

            cy.get(dashBoardPage.btnCadastrar).click();

            cy.contains('h2', 'Cadastre o especialista inserindo os dados abaixo:');
        })

        it('Cadastrar especialista com senha divergente - não permite', () => {
            cy.get(dashBoardPage.inputEspecialistaNome).type(doctor.nome);
            cy.get(dashBoardPage.inputEspecialistaEmail).type(doctor.email);
            cy.get(dashBoardPage.inputEspecialistaSenha).type(doctor.senha, { log: false });
            cy.get(dashBoardPage.inputEspecialistaSenhaVerificada).type('senhaDiferente', { log: false });
            cy.get(dashBoardPage.inputEspecialistaEspecialidade).type(doctor.especialidade);
            cy.get(dashBoardPage.inputEspecialistaCRM).type(doctor.CRM);  
            cy.get(dashBoardPage.inputEspecialistaTelefone).type(doctor.telefone);  
            cy.get(dashBoardPage.insiraImagemEspecialista).type('https://s2.glbimg.com/Y3X4qWUVv35RgqHOvGqZ67BtBwg=/600x0/filters:quality(70)/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2022/B/r/RUAqubR0eByCv3ttFVOw/2017-06-12-kratos.jpg');
            cy.get(dashBoardPage.inputEspecialistaCEP).type(doctor.cep);
            cy.get(dashBoardPage.inputEspecialistaRua).type(doctor.rua);
            cy.get(dashBoardPage.inputEspecialistaNumero).type(doctor.numero);
            cy.get(dashBoardPage.inputEspecialistaComplemento).type(doctor.complemento);
            cy.get(dashBoardPage.inputEspecialistaEstado).type(doctor.estado);

            cy.get(dashBoardPage.checkBox).check();
            cy.get(dashBoardPage.checkBox).last().scrollIntoView({easing: 'linear'});

            cy.get(".MuiFormGroup-root").each(($checkbox) => {
                cy.wrap($checkbox).should('be.visible');
            })

            cy.get(dashBoardPage.btnCadastrar).click();

            cy.intercept('POST', '**/especialista').as('cadastroEspecialista');
            cy.wait('@cadastroEspecialista').its('response.statusCode').should('eq', 400);

            cy.contains('h2', 'Cadastre o especialista inserindo os dados abaixo:');
        })

        it("Cadastrar especialista sem senha - não permite", () => {
            cy.get(dashBoardPage.inputEspecialistaNome).type(doctor.nome);
            cy.get(dashBoardPage.inputEspecialistaEmail).type(doctor.email);
            cy.get(dashBoardPage.inputEspecialistaEspecialidade).type(doctor.especialidade);
            cy.get(dashBoardPage.inputEspecialistaCRM).type(doctor.CRM);
            cy.get(dashBoardPage.inputEspecialistaTelefone).type(doctor.telefone);
            cy.get(dashBoardPage.insiraImagemEspecialista).type('https://s2.glbimg.com/Y3X4qWUVv35RgqHOvGqZ67BtBwg=/600x0/filters:quality(70)/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2022/B/r/RUAqubR0eByCv3ttFVOw/2017-06-12-kratos.jpg');
            cy.get(dashBoardPage.inputEspecialistaCEP).type(doctor.cep);
            cy.get(dashBoardPage.inputEspecialistaRua).type(doctor.rua);
            cy.get(dashBoardPage.inputEspecialistaNumero).type(doctor.numero);
            cy.get(dashBoardPage.inputEspecialistaComplemento).type(doctor.complemento);
            cy.get(dashBoardPage.inputEspecialistaEstado).type(doctor.estado);

            cy.get(dashBoardPage.checkBox).check();
            cy.get(dashBoardPage.checkBox).last().scrollIntoView({easing: 'linear'});

            cy.get(".MuiFormGroup-root").each(($checkbox) => {
                cy.wrap($checkbox).should('be.visible');
            })

            cy.get(dashBoardPage.btnCadastrar).click();

            cy.contains('h2', 'Cadastre o especialista inserindo os dados abaixo:');
        })

        it("Cadastrar especialista sem especialidade - não permite", () => {
            cy.get(dashBoardPage.inputEspecialistaNome).type(doctor.nome);
            cy.get(dashBoardPage.inputEspecialistaEmail).type(doctor.email);
            cy.get(dashBoardPage.inputEspecialistaSenha).type(doctor.senha, { log: false });
            cy.get(dashBoardPage.inputEspecialistaSenhaVerificada).type(doctor.senha, { log: false });
            cy.get(dashBoardPage.inputEspecialistaCRM).type(doctor.CRM);
            cy.get(dashBoardPage.inputEspecialistaTelefone).type(doctor.telefone);
            cy.get(dashBoardPage.insiraImagemEspecialista).type('https://s2.glbimg.com/Y3X4qWUVv35RgqHOvGqZ67BtBwg=/600x0/filters:quality(70)/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2022/B/r/RUAqubR0eByCv3ttFVOw/2017-06-12-kratos.jpg');
            cy.get(dashBoardPage.inputEspecialistaCEP).type(doctor.cep);
            cy.get(dashBoardPage.inputEspecialistaRua).type(doctor.rua);
            cy.get(dashBoardPage.inputEspecialistaNumero).type(doctor.numero);
            cy.get(dashBoardPage.inputEspecialistaComplemento).type(doctor.complemento);
            cy.get(dashBoardPage.inputEspecialistaEstado).type(doctor.estado);

            cy.get(dashBoardPage.checkBox).check();
            cy.get(dashBoardPage.checkBox).last().scrollIntoView({easing: 'linear'});

            cy.get(".MuiFormGroup-root").each(($checkbox) => {
                cy.wrap($checkbox).should('be.visible');
            })

            cy.get(dashBoardPage.btnCadastrar).click(); 

            cy.contains('h2', 'Cadastre o especialista inserindo os dados abaixo:');
        })

        it("Cadastrar especialista sem CRM - não permite", () => {
            cy.get(dashBoardPage.inputEspecialistaNome).type(doctor.nome);
            cy.get(dashBoardPage.inputEspecialistaEmail).type(doctor.email);
            cy.get(dashBoardPage.inputEspecialistaSenha).type(doctor.senha, { log: false });
            cy.get(dashBoardPage.inputEspecialistaSenhaVerificada).type(doctor.senha, { log: false });
            cy.get(dashBoardPage.inputEspecialistaTelefone).type(doctor.telefone);
            cy.get(dashBoardPage.inputEspecialistaEspecialidade).type(doctor.especialidade);
            cy.get(dashBoardPage.insiraImagemEspecialista).type('https://s2.glbimg.com/Y3X4qWUVv35RgqHOvGqZ67BtBwg=/600x0/filters:quality(70)/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2022/B/r/RUAqubR0eByCv3ttFVOw/2017-06-12-kratos.jpg');
            cy.get(dashBoardPage.inputEspecialistaCEP).type(doctor.cep);
            cy.get(dashBoardPage.inputEspecialistaRua).type(doctor.rua);
            cy.get(dashBoardPage.inputEspecialistaNumero).type(doctor.numero);
            cy.get(dashBoardPage.inputEspecialistaComplemento).type(doctor.complemento);
            cy.get(dashBoardPage.inputEspecialistaEstado).type(doctor.estado);

            cy.get(dashBoardPage.checkBox).check();
            cy.get(dashBoardPage.checkBox).last().scrollIntoView({easing: 'linear'});

            cy.get(".MuiFormGroup-root").each(($checkbox) => {
                cy.wrap($checkbox).should('be.visible');
            })

            cy.get(dashBoardPage.btnCadastrar).click(); 

            cy.contains('h2', 'Cadastre o especialista inserindo os dados abaixo:');
        })

    })

})