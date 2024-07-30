describe('Avaliação projeto de testeE2E', () => {
  const jsonFilePath = './cypress/fixtures/data.json';
  const expectedData = {
    albumId: 1,
    id: 6,
    title: "accusamus ea aliquid et amet sequi nemo",
    url: "https://via.placeholder.com/600/56a8c2",
    thumbnailUrl: "https://via.placeholder.com/150/56a8c2"
  }

  context('Dado que estou na página inicial e clico no link Guide', () => {
    before(() => {
      cy.visit('/');
      cy.get('a[href="/guide"]').contains('Guide').click();
    });

    context('E obtenho as fotos do álbum', () => {
      before(() => {
        cy.get('a[href="/albums/1/photos"]').should('be.visible').then(($link) => {
          const href = $link.attr('href');
          cy.request(href).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
            cy.writeFile(jsonFilePath, response.body);
          });
        });
      });

      it('Então eu deveria encontrar um item com id 6 e validar seus dados', () => {
        cy.readFile(jsonFilePath).then((data) => {
          const item = data.find((obj) => obj.id === 6);
          expect(item, 'Objeto com id 6 deve existir').to.be.not.undefined;
          expect(item).to.deep.equal(expectedData);
        });
      });
    });
  });
});