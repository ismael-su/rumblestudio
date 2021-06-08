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

	defaultConfig() {
		this.json =
			'{"dimensions":{"height":"120px","width":"300px"},"layout":{"rows":1,"columns":3},"elements":[{"task":"play","cssClasses":"","width":"100px","height":"50px","x":"10px","y":"5px"},\n' +
			'{"task":"stop","cssClasses":"blue-yellow","width":"80px","height":"50px","x":"110px","y":"5px"},\n' +
			'{"task":"pause","cssClasses":"","width":"100px","height":"50px","x":"190px","y":"5px"},{"task":"prev","cssClasses":"rounded blue-yellow","width":"50px","height":"50px","x":"10px","y":"60px"},{"task":"bar","cssClasses":"","width":"140px","height":"50px","x":"80px","y":"80px"},{"task":"next","cssClasses":"rounded","width":"50px","height":"50px","x":"240px","y":"60px"}]}\n';
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
