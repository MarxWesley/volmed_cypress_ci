describe("Página Sobre", () => {
    beforeEach(() => {
        cy.visit('/');
    })

    it("Verifica redirecionamento sobre", () => {
        cy.get('[href="/sobre"]').click();
        cy.url().should('include', '/sobre');
    })

})