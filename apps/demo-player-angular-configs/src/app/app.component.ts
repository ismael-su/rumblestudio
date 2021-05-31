import { Component, OnInit } from '@angular/core';
import { generateDefaultLayout } from '@rumblestudio/player-configs';
import { PlayerHTML } from '@rumblestudio/player-configs';

@Component({
	selector: 'rumblestudio-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	title = 'demo-player-angular-configs';

	ngOnInit(): void {
		const playerHTML: PlayerHTML = generateDefaultLayout(
			'container',
			'config5',
		);
		const service = playerHTML.playerService;
		service.setPLaylistFromRSSFeedURL('https://rss.art19.com/apology-line');
	}
}
