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

    it('Test erreur reservation', () => {
        //setup startDate
        cy.scrollTo('bottom')
        cy.wait(1000)
        cy.get('#startDate').type('1998-07-26')
        cy.wait(1000)
        cy.contains('Rechercher').click()
        cy.wait(1000)
        
        //catch error (missing date)
        cy.get('#startDate')
        .should(($input) => {
            expect($input).to.have.css('background-color', "rgb(255, 0, 0)");
            });
        cy.get('#endDate')
        .should(($input) => {
            expect($input).to.have.css('background-color', "rgb(255, 0, 0)");
            });

        //setup endDate
        cy.wait(1000)
        cy.get('#endDate').type('1997-07-26')
        cy.wait(1000)

        //catch error (incoherent date)
        cy.get('#startDate')
        .should(($input) => {
            expect($input).to.have.css('background-color', "rgb(255, 0, 0)");
            });
        cy.get('#endDate')
        .should(($input) => {
            expect($input).to.have.css('background-color', "rgb(255, 0, 0)");
            });
        
        //setup coherent endDate
        cy.wait(1000)
        cy.get('#endDate').type('1999-07-26')
        cy.wait(1000)
        cy.contains('Rechercher').click()
        cy.wait(1000)
        
        //if none available
        cy.contains("Désoler aucun Jetpack n'est diponible dans cette periode").should('be.visible')

    })

    it('Test different adding button', () => {
        //test Jetpack Fortnite
        cy.get('#a8019ec0-bfdc-4140-9dbb-4927e5ef5c8d').click()
        cy.wait(1000)
        cy.get('#close-edit').click()
        cy.wait(1000)
        cy.get('#a8019ec0-bfdc-4140-9dbb-4927e5ef5c8d').click()
        cy.wait(1000)
        cy.get('#edit').click()

        cy.wait(1000)

        //test Jetpack JackTalior
        cy.get('#a8019ec0-bfdc-4140-9dba-4927e5ef5c8d').click()
        cy.wait(1000)
        cy.get('#close-edit').click()
        cy.wait(1000)
        cy.get('#a8019ec0-bfdc-4140-9dba-4927e5ef5c8d').click()
        cy.wait(1000)
        cy.get('#edit').click()  
    })

    it('.as() - alias a DOM element for later use', () => {
        cy.contains('Liste de tous les Jetpacks').should('be.visible')
    
            
        cy.get('#jetpacks').should('be.visible')
        cy.get('#cardColumn').should('be.visible')
        //Verif first jetpack
        cy.get('#edit-image-a8019ec0-bfdc-4140-9dbb-4927e5ef5c8d').should('be.visible')
        cy.get('#edit-name-a8019ec0-bfdc-4140-9dbb-4927e5ef5c8d').should('be.visible')
        cy.get('#a8019ec0-bfdc-4140-9dbb-4927e5ef5c8d').should('be.visible')
        
        //Verif second jetpack
        cy.get('#edit-name-a8019ec0-bfdc-4140-9dba-4927e5ef5c8d').should('be.visible')
        cy.get('#edit-image-a8019ec0-bfdc-4140-9dba-4927e5ef5c8d').should('be.visible')
        cy.get('#a8019ec0-bfdc-4140-9dba-4927e5ef5c8d').should('be.visible')
    
        //Verif date
        cy.get('#startDate.form-control-sm').should('be.visible')
        cy.get('#endDate').should('be.visible')
    
        cy.get('#edit-image-a8019ec0-bfdc-4140-9dbz-4927e5ef5c8d').should('be.visible')
        cy.get('#book-image-a8019ec0-bfdc-4140-9dbz-4927e5ef5c8d').should('be.visible')
    
        cy.get('Ajouter').should('be.visible')
        cy.get('Réservez un jetpack').should('be.visible')
        cy.get('Debut :').should('be.visible')
        cy.get(' Fin :').should('be.visible')
        cy.get('Réservations').should('be.visible')
      })

    
});