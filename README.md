# 🚀 VolMed Cypress CI

Automação de testes end-to-end (E2E) com foco em qualidade, confiabilidade e integração contínua utilizando Cypress e GitHub Actions.

---

## 📌 Sobre o projeto

Este projeto realiza testes automatizados na aplicação **VolMed**, validando fluxos críticos como:

* 🔐 Login de usuários
* 📝 Cadastro (sucesso e erro)
* 📊 Dashboard
* ℹ️ Página institucional

Os testes são executados automaticamente em pipeline CI, garantindo que novas alterações não quebrem funcionalidades existentes.

---

## 🧪 Tecnologias utilizadas

* Cypress — testes E2E
* GitHub Actions — CI/CD
* Mochawesome — geração de relatórios
* Node.js
* JavaScript

---

## 📁 Estrutura do projeto

```bash
.
├── .github/workflows/
│   └── cypress.yml        # Pipeline CI
├── cypress/
│   ├── e2e/
│   │   ├── utils/
│   │   ├── login.cy.js
│   │   ├── cadastro-sucesso.cy.js
│   │   ├── cadastro-sem-sucesso.cy.js
│   │   ├── dashboard.cy.js
│   │   └── sobre.cy.js
│   ├── fixtures/
│   ├── support/
│   ├── reports/           # Relatórios Mochawesome
│   ├── screenshots/       # Evidências de erro
│   └── videos/            # Gravações dos testes
├── server/                # Backend da aplicação
├── web/                   # Frontend da aplicação
├── cypress.config.js
├── package.json
└── .env
```

---

## ▶️ Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/MarxWesley/volmed_cypress_ci.git
cd volmed_cypress_ci
```

---

### 2. Instale as dependências

```bash
npm install
cd server && npm install
cd ../web && npm install
```

---

### 3. Suba a aplicação

```bash
npm run start:back
npm run start:front
```

---

### 4. Execute os testes

Modo interativo:

```bash
npx cypress open
```

Modo headless:

```bash
npx cypress run
```

---

## 🔄 Integração Contínua (CI)

A pipeline configurada com GitHub Actions executa automaticamente:

* ✅ Execução dos testes Cypress
* 📊 Geração de relatórios com Mochawesome
* 📸 Captura de screenshots em falhas
* 🎥 Gravação de vídeos
* 📦 Upload de artifacts
* 📧 Envio de relatório por email

---

## 📊 Relatórios

Após a execução dos testes, são gerados relatórios completos contendo:

* ✔ Status dos testes
* ❌ Detalhes de falhas
* 📸 Screenshots automáticos
* 🎥 Vídeos da execução
* ⏱ Tempo de execução

---

## 📦 Artifacts

Os seguintes arquivos ficam disponíveis no GitHub Actions:

* 📄 Relatório HTML
* 📸 Screenshots
* 🎥 Vídeos

---

## 📬 Notificações

Ao final da pipeline:

* 📧 Um email é enviado automaticamente com o relatório
* 🔗 Link direto para execução no GitHub

---

## 🧠 Boas práticas aplicadas

* Uso de `cy.session` para otimizar login
* Interceptação de requisições com `cy.intercept`
* Testes organizados por feature
* Separação de responsabilidades (frontend/backend/testes)
* Pipeline CI automatizada
* Geração de relatórios consolidado

---

## 🚀 Melhorias futuras

* [ ] Execução paralela por múltiplos browsers
* [ ] Dashboard online de testes
* [ ] Integração com Slack ou Telegram
* [ ] Testes de API integrados
* [ ] Testes de performance

---

## 👨‍💻 Autor

Desenvolvido por **Wesley Marques**
