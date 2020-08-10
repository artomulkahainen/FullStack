describe('Blog ', function () {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Kusti Korhonen',
      username: 'kkorhone',
      password: 'passu',
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Login');
  });

  it('login success with correct creds', () => {
    cy.contains('Login').click();
    cy.get('#username').type('kkorhone');
    cy.get('#password').type('passu');
    cy.get('#login-button').click();

    cy.contains('Kusti Korhonen logged in');
    cy.contains('Logout').click();
  });

  it('login fails with wrong creds', () => {
    cy.contains('Login').click();
    cy.get('#username').type('mluukkai');
    cy.get('#password').type('salaine');
    cy.get('#login-button').click();

    cy.contains('Wrong username or password');
  });

  describe.only('When logged in', () => {
    beforeEach(() => {
      cy.contains('Login').click();
      cy.get('#username').type('kkorhone');
      cy.get('#password').type('passu');
      cy.get('#login-button').click();
    });

    it('user can create blog', () => {
      cy.contains('Create').click();
      cy.get('#input-title').type('Kustin retki');
      cy.get('#input-author').type('Kusti Korhonen');
      cy.get('#input-url').type('kustinretki.com');
      cy.get('#create-blog-button').click();
      cy.contains('Kustin retki');
      cy.contains('view');
    });

    it('blog can be liked', () => {
      cy.contains('Create').click();
      cy.get('#input-title').type('Kustin retki');
      cy.get('#input-author').type('Kusti Korhonen');
      cy.get('#input-url').type('kustinretki.com');
      cy.get('#create-blog-button').click();
      cy.contains('view').click();
      cy.contains('Like').click();
      cy.contains('likes 1');
    });
    it('user who created blog, can delete the blog', () => {
      cy.contains('Create').click();
      cy.get('#input-title').type('Kustin retki');
      cy.get('#input-author').type('Kusti Korhonen');
      cy.get('#input-url').type('kustinretki.com');
      cy.get('#create-blog-button').click();
      cy.contains('view').click();
      cy.contains('Remove').click();
      cy.get('html').should('not.contain', 'view');
    });
  });
});
