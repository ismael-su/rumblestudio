import { Component } from '@angular/core';
import {
	Configuration,
	generateLayout,
	isValid,
	CONFIGS,
} from '@rumblestudio/player-configs';
import { PlayerService } from '@rumblestudio/player-service';

@Component({
	selector: 'rumblestudio-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'demo-player-angular-configs';
	public json = '';
	public css = '';
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

	defaultConfig(conf: number) {
		switch (conf) {
			case 1:
				this.json = JSON.stringify(CONFIGS.default.config1);
				break;
			case 2:
				this.json = JSON.stringify(CONFIGS.default.config2);
				break;
			case 3:
				this.json = JSON.stringify(CONFIGS.default.config3);
				break;
			case 4:
				this.json = JSON.stringify(CONFIGS.default.config4);
				break;
			case 5:
				this.json = JSON.stringify(CONFIGS.default.config5);
				break;
		}
	}
	defaultCSS() {
		this.css =
			'.blue-yellow{\n' +
			'color: blue;\n' +
			'background-color: yellow}\n' +
			'.rounded{\n' +
			'border-radius: 50%\n' +
			'}';
	}
}
