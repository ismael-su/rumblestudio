import { Component } from '@angular/core';
import {
	Configuration,
	generateLayout,
	isValid,
} from '@rumblestudio/player-configs';
import { PlayerService } from '@rumblestudio/player-service';

@Component({
	selector: 'rumblestudio-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'demo-player-angular-configs';
	private json: string;
	private css: string;
	private service: PlayerService;

	onCssChange(event) {
		//console.log(event.target.value)
		this.css = event.target.value;
	}

	onJsonChange(event) {
		// console.log(event.target.value)
		this.json = event.target.value;
	}

	loadConfig() {
		if (this.json === undefined || this.json === null) {
			return;
		}
		const conf = JSON.parse(this.json) as Configuration;
		console.log(conf);
		if (isValid(conf)) {
			console.log(conf);
			this.service = generateLayout(
				'container',
				conf,
				this.css,
			).playerService;
			this.service.setPLaylistFromRSSFeedURL(
				'https://rss.art19.com/apology-line',
			);
		}
	}
}
