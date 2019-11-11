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

    it('Test reservation', () => {
        //setup date
        cy.scrollTo('bottom')
        cy.wait(1000)
        cy.get('#startDate').type('1998-07-26')
        cy.wait(1000)
        cy.get('#endDate').type('1999-07-26')
        cy.wait(1000)

        //start search
        cy.contains('Rechercher').click()
        cy.wait(1000)

        //catch if no error
        cy.get('#startDate')
            .should(($input) => {
                expect($input).to.have.css('background-color', "rgb(255, 255, 255)");
            });
        cy.get('#endDate')
            .should(($input) => {
                expect($input).to.have.css('background-color', "rgb(255, 255, 255)");
            });
        
        //cheack results
        cy.get('#book-image-1').should('be.visible')
        cy.scrollTo('bottom')
        cy.wait(1000)
        cy.get('#1').click()
        cy.wait(1000)
        
        //test button Close/Valider
        cy.get('#close-book').click()
        cy.wait(1000)
        cy.get('#1').click()
        cy.wait(1000)
        cy.get('#book').click()
        cy.wait(1000)

        //cheack booking
        cy.get('#book-image-a8019ec0-bfdc-4140-9dbz-4927e5ef5c8d').should('be.visible')

    })
});