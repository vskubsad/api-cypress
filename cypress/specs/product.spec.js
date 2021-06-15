/// <reference types="Cypress" />

describe('Test Product Component', () => {

    const baseURI = `http://localhost:3000/product`;
    let id = '';
    it('Test Post Service', () => {
        cy.request({
            method: 'POST',
            url: baseURI,
            body: {
                name: "Laptop",
                price:"$599",
                description: "MSI Laptop"
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            expect(res.status).to.be.ok;
            let dataArray = res.body;
            cy.log(dataArray)
            id = dataArray;
        })


    });



    it('Get Products with specifc Id', () => {
        cy.request({
            method: 'GET',
            url: baseURI,
            headers: {
                'Content-Type': 'application/json'
            }
        }).as('response');
        cy.get('@response').then(response => {
            expect(response.status).to.be.ok;
            let prodcutsArray = response.body
            prodcutsArray = Cypress.$.makeArray(prodcutsArray).filter(x=> x.id === id);
            prodcutsArray = prodcutsArray[0];
            expect(prodcutsArray.id).to.equal(id, 'id are not equal');
            expect(prodcutsArray.name).to.be.equal('Laptop')
            expect(prodcutsArray.price).to.be.eq('$599')
            expect(prodcutsArray.description).to.be.equal('MSI Laptop')
        })
    });

    it('Update Products with specifc Id', () => {
        cy.request({
            method: 'PUT',
            url: `${baseURI}/${id}`,
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                name: "Laptop",
                price:"$599",
                description: "Apple Mackbook"
            }
        }).as('response');
        cy.get('@response').then(response => {
            expect(response.status).to.be.ok;
        });

        cy.request({
            method: 'GET',
            url: baseURI,
            headers: {
                'Content-Type': 'application/json'
            }
        }).as('getresponse');
        cy.get('@getresponse').then(response => {
            expect(response.status).to.be.ok;
            let prodcutsArray = response.body
            prodcutsArray = Cypress.$.makeArray(prodcutsArray).filter(x=> x.id === id);
            prodcutsArray = prodcutsArray[0];
            expect(prodcutsArray.id).to.equal(id, 'id are not equal');
            expect(prodcutsArray.name).to.be.equal('Laptop');
            expect(prodcutsArray.price).to.be.eq('$599');
            expect(prodcutsArray.description).to.be.equal('Apple Mackbook');
        })
    });


    it('Delete a  Product with specifc Id', () => {
        cy.request({
            method: 'DELETE',
            url:`${baseURI}/${id}`,
            headers: {
                'Content-Type': 'application/json'
            }
        }).as('response');
        cy.get('@response').then(response => {
            expect(response.status).to.be.ok;
            cy.request({
                method: 'GET',
                url: baseURI,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).as('getresponse');
            cy.get('@getresponse').then(response => {
                expect(response.status).to.be.ok;
                let prodcutsArray = response.body
                prodcutsArray = Cypress.$.makeArray(prodcutsArray).filter(x=> x.id === id);
                expect(prodcutsArray.length).to.be.eq(0);
            })
        })
    });
});