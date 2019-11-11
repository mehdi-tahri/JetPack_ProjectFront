/// <reference types="Cypress" />

context('Jetpack list', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Test adding button', () => {
        cy.get('#add-button').click()
        
        //test button close
        cy.wait(1000)
        cy.contains('Close').click()
        cy.wait(1000)
        cy.get('#add-button').click()
        
        //test save
        cy.wait(1000)
        cy.get('#save').click()
        cy.wait(1000)
        cy.scrollTo('top')
        
        //cheack results
        cy.get('#edit-image-a8019ec0-bfdc-4140-9dbz-4927e5ef5c8d').should('be.visible')
    })
});