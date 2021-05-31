// const GlyphIcons = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css';
// const FontAwesomeIcons = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
import { PlayerHTML } from './elements/playerHTML';
import { PlayerService } from '@rumblestudio/player-service';
import { LinearBar } from './elements/LinearBar';
import CONFIGS from './configs';
const { config1, config2, config3, config4, config5 } = CONFIGS;

const MaterialIcons = 'https://fonts.googleapis.com/icon?family=Material+Icons';
const css = document.createElement('link');
css.setAttribute('rel', 'stylesheet');
css.setAttribute('type', 'text/css');
css.setAttribute('href', MaterialIcons);
document.getElementsByTagName('head')[0].appendChild(css);

function getButtonOrBar(
	task: string,
	player: PlayerHTML,
	css?: string,
): HTMLButtonElement | LinearBar {
	if (task === 'bar') {
		const bar = new LinearBar();
		bar.playerHTML = player;
		if (css) {
			bar.className = css;
		}
		return bar;
	}
	const button = document.createElement('button');
	const icon = document.createElement('i');
	icon.className = 'material-icons';
	icon.innerText = iconSet[task];
	button.appendChild(icon);
	switch (task) {
		case 'play':
			button.addEventListener('click', () => {
				player.play({});
			});
			break;
		case 'pause':
			button.addEventListener('click', () => {
				player.pause({});
			});
			break;
		case 'stop':
			button.addEventListener('click', () => {
				player.stop();
			});
			break;
		case 'next':
			button.addEventListener('click', () => {
				player.next();
			});
			break;
		case 'prev':
			button.addEventListener('click', () => {
				player.prev();
			});
			break;
		case 'forward':
			button.addEventListener('click', () => {
				player.seekForJump(
					new CustomEvent('jump', { detail: { jump: 15 } }),
				);
			});
			break;
		case 'rewind':
			button.addEventListener('click', () => {
				player.seekForJump(
					new CustomEvent('jump', { detail: { jump: 15 } }),
				);
			});
			break;
	}
	button.style.marginLeft = '3px';
	button.style.marginRight = '3px';
	button.style.cursor = 'pointer';
	if (css) {
		button.className = css;
	}
	return button;
}

export function generateDefaultLayout(
	idContainer: string,
	config: string,
): PlayerHTML {
	let conf;
	switch (config) {
		case 'config1':
			conf = config1;
			break;
		case 'config2':
			conf = config2;
			break;
		case 'config3':
			conf = config3;
			break;
		case 'config4':
			conf = config4;
			break;
		case 'config5':
			conf = config5;
			break;
	}
	return generateLayout(idContainer, conf);
}

export function generateLayout(
	idContainer: string,
	conf: Configuration,
): PlayerHTML {
	// We can either generate the container and return it
	// or get the container as argument, then inflate it
	// we will decide with dev team what to do
	const playerService = new PlayerService();
	const playerHTML = new PlayerHTML(playerService);
	console.log(conf);
	const container = document.getElementById(idContainer);
	const div = document.createElement('div');
	div.style.display = 'flex';
	div.style.flexDirection = 'row';
	div.style.alignItems = 'center';
	div.style.backgroundColor = '#f1f0f0';
	div.style.boxShadow = '0 4px 8px 0 rgba(0,0,0,0.2)';
	div.style.width = conf.dimensions.width;
	// div.style.height = conf.dimensions.height;
	for (const element of conf.elements) {
		div.appendChild(
			getButtonOrBar(element.task, playerHTML, element.cssClasses),
		);
	}
	container.appendChild(div);
	return playerHTML;
}

const iconSet = {
	play: 'play_circle',
	pause: 'pause_circle',
	next: 'skip_next',
	prev: 'skip_previous',
	stop: 'stop_circle',
	forward: 'fast_forward',
	rewind: 'fast_rewind',
	shuffle: 'shuffle',
	loop: 'loop',
};
interface Configuration {
	elements: { task: string; cssClasses: string }[];
	layout: { rows: number; columns: number };
	dimensions: { height: string; width: string };
}
