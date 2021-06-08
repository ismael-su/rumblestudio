export const addPlaylist = () => {
	cy.visit('/playlist');

	cy.get('.create').contains('Add a playlist').click();
};
