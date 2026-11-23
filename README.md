# Automação de Testes E2E com Cypress: Sauce Demo

Projeto de automação de testes end-to-end desenvolvido com **Cypress** (Mocha: `describe`, `context` e `it`), sem Cucumber/Gherkin e sem esperas fixas (`cy.wait`).

**Autora:** Luh Ramiro

## 1. Sistema alvo

- **Sistema:** Sauce Demo (Swag Labs), e-commerce público para treino de automação
- **URL:** https://www.saucedemo.com
- **Funcionalidades cobertas:** Login e Carrinho
- **Usuários utilizados:** `standard_user` e `locked_out_user` (senha de todos: `secret_sauce`)

## 2. Regras de negócio

### Funcionalidade 1: Login

| ID | Regra |
|---|---|
| RN01 | Usuário e senha válidos levam o usuário à página de produtos (`/inventory.html`). |
| RN02 | Senha incorreta exibe mensagem de erro e mantém o usuário na tela de login. |
| RN03 | Usuário bloqueado (`locked_out_user`) não consegue entrar e vê uma mensagem informando o bloqueio. |
| RN04 | Username e password são obrigatórios: campo vazio exibe mensagem de erro e impede o login. |

### Funcionalidade 2: Carrinho

| ID | Regra |
|---|---|
| RN05 | Ao adicionar um produto, o botão do produto muda para "Remove" e o contador do ícone do carrinho aumenta. |
| RN06 | Ao remover um produto, o contador do ícone do carrinho diminui (e desaparece quando chega a zero). |
| RN07 | A página do carrinho lista exatamente os produtos que foram adicionados. |
| RN08 | É possível adicionar mais de um produto, e o contador reflete a quantidade total. |

## 3. Casos de teste

**Pré-condição dos testes de Carrinho:** usuário autenticado com `standard_user`.

### Login

| ID | Regra | O que está sendo testado | Resultado esperado |
|---|---|---|---|
| CT-01 | RN01 | Login com `standard_user` e `secret_sauce` | Redireciona para `/inventory.html` e exibe a lista de produtos |
| CT-02 | RN02 | Login com usuário válido e senha incorreta | Exibe mensagem de erro de credenciais inválidas e permanece na tela de login |
| CT-03 | RN03 | Login com `locked_out_user` e `secret_sauce` | Exibe mensagem de usuário bloqueado e não acessa os produtos |
| CT-04 | RN04 | Login com os campos username e password vazios | Exibe mensagem informando que o username é obrigatório |

### Carrinho

| ID | Regra | O que está sendo testado | Resultado esperado |
|---|---|---|---|
| CT-05 | RN05 | Adicionar um produto ao carrinho | O botão passa a "Remove" e o contador do carrinho mostra 1 |
| CT-06 | RN06 | Remover o produto adicionado | O contador do carrinho desaparece |
| CT-07 | RN07 | Abrir o carrinho após adicionar um produto | O produto adicionado aparece na página do carrinho |
| CT-08 | RN08 | Adicionar dois produtos | O contador do carrinho mostra 2 |

## 4. Como instalar e rodar

Pré-requisito: [Node.js](https://nodejs.org) instalado.

```bash
git clone https://github.com/Luh-Ramiro/cypress-saucedemo.git
cd cypress-saucedemo
npm install
```

Executar pela interface do Cypress:

```bash
npx cypress open
```

Executar em modo headless:

```bash
npx cypress run --browser chrome
```