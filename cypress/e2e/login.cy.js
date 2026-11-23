describe('Login', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  context('com credenciais válidas', () => {
    it('CT-01: faz login com standard_user e acessa os produtos', () => {
      cy.get('[data-test="username"]').type('standard_user');
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('[data-test="login-button"]').click();

      cy.url().should('include', '/inventory.html');
      cy.get('[data-test="inventory-container"]').should('be.visible');
    });
  });

  context('com credenciais inválidas', () => {
    it('CT-02: exibe erro com senha incorreta', () => {
      cy.get('[data-test="username"]').type('standard_user');
      cy.get('[data-test="password"]').type('senha_errada');
      cy.get('[data-test="login-button"]').click();

      cy.get('[data-test="error"]')
        .should('be.visible')
        .and('contain', 'Username and password do not match');
      cy.url().should('not.include', '/inventory.html');
    });

    it('CT-03: bloqueia o usuário locked_out_user', () => {
      cy.get('[data-test="username"]').type('locked_out_user');
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('[data-test="login-button"]').click();

      cy.get('[data-test="error"]')
        .should('be.visible')
        .and('contain', 'locked out');
      cy.url().should('not.include', '/inventory.html');
    });
  });

  context('com campos vazios', () => {
    it('CT-04: exibe erro de username obrigatório', () => {
      cy.get('[data-test="login-button"]').click();

      cy.get('[data-test="error"]')
        .should('be.visible')
        .and('contain', 'Username is required');
    });
  });
});