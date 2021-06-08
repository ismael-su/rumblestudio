import { addPlaylist } from '../support/app.po';

describe('demo-player-angular-deezer', () => {
	beforeEach(() => cy.visit('/'));

	it('should display a welcome message', () => {
		cy.visit('/home');

		cy.get('h1').contains('Welcome to RumbleDeezer !');
	});

	it('should navigate to playlist page', () => {
		cy.get('.routerPlaylist').click();

		cy.get('.create')
			.children()
			.should('contain', 'RSS Link playlist')
			.and('be.visible');
	});

	it('should add a playlist', () => {
		cy.visit('/playlist');

		cy.get('.create').contains('Add a playlist').click();

		cy.get('.songInfo').contains('no song played').should('not.exist');
	});

	it('should play a playlist from play button', () => {
		addPlaylist();

		cy.get('.play').click();

		cy.clock();
		cy.tick(2000);
		cy.get('.timeLeft').should('have.text', '0:02');
	});

	it('should play a playlist from choice', () => {
		addPlaylist();
		cy.get('.playlist').click({ force: true });
		cy.get('.playlist-item').first().click();

		cy.clock();
		cy.tick(2000);
		cy.get('.timeLeft').should('have.text', '0:02');
	});

	it('should change songs', () => {
		addPlaylist();

		cy.get('.next').click();
		cy.get('.songInfo').should('have.text', 'second song');

		cy.get('.prev').click();
		cy.get('.songInfo').should('have.text', 'first song');
	});

	it('should update time', () => {
		addPlaylist();

		cy.get('.play').click();

		cy.get('.fullBar').click(0, 2, { force: true });
		cy.get('.timeLeft').contains('0:00').should('not.exist');
	});
});
