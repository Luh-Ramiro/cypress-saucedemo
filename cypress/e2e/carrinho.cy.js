describe('Carrinho', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    cy.url().should('include', '/inventory.html');
  });

  context('adicionar produtos', () => {
    it('CT-05: adiciona um produto e atualiza o contador', () => {
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

      cy.get('[data-test="remove-sauce-labs-backpack"]')
        .should('be.visible')
        .and('contain', 'Remove');
      cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1');
    });

    it('CT-08: adiciona dois produtos e o contador mostra 2', () => {
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

      cy.get('[data-test="shopping-cart-badge"]').should('have.text', '2');
    });
  });

  context('remover produtos', () => {
    it('CT-06: remove o produto e o contador desaparece', () => {
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      cy.get('[data-test="remove-sauce-labs-backpack"]').click();

      cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').should('be.visible');
    });
  });

  context('página do carrinho', () => {
    it('CT-07: lista o produto adicionado no carrinho', () => {
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      cy.get('[data-test="shopping-cart-link"]').click();

      cy.url().should('include', '/cart.html');
      cy.get('[data-test="inventory-item-name"]')
        .should('have.length', 1)
        .and('contain', 'Sauce Labs Backpack');
    });
  });
});