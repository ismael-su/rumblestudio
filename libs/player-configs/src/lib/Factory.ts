// const GlyphIcons = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css';
// const FontAwesomeIcons = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
import { PlayerHTML } from './elements/playerHTML';
import { PlayerService } from '@rumblestudio/player-service';
import { LinearBar } from './elements/LinearBar';
import CONFIGS from './configs';
import { SimplePlaylist } from './elements/SimplePlaylist';
import { SimpleImage } from './elements/SimpleImage';
const { config1, config2, config3, config4, config5 } = CONFIGS;

const MaterialIcons = 'https://fonts.googleapis.com/icon?family=Material+Icons';
const css = document.createElement('link');
css.setAttribute('rel', 'stylesheet');
css.setAttribute('type', 'text/css');
css.setAttribute('href', MaterialIcons);
document.getElementsByTagName('head')[0].appendChild(css);

function getButtonOrBar(
	element: ElementLayout,
	player: PlayerHTML,
	css?,
): HTMLButtonElement | LinearBar | SimplePlaylist | SimpleImage {
	if (element.task === 'bar') {
		const bar = new LinearBar();
		bar.playerHTML = player;
		if (css) {
			bar.className = element.cssClasses;
			bar.style.position = 'absolute';
			bar.style.width = element?.width;
			bar.style.height = element?.height;
			bar.style.left = element?.x;
			bar.style.top = element?.y;
		}
		return bar;
	}
	if (element.task === 'playlist') {
		const playlist = new SimplePlaylist();
		playlist.playerHTML = player;
		if (css) {
			playlist.className = element.cssClasses;
			playlist.style.position = 'absolute';
			playlist.style.width = element?.width;
			playlist.style.height = element?.height;
			playlist.style.left = element?.x;
			playlist.style.top = element?.y;
		}
		return playlist;
	}
	if (element.task === 'image') {
		if (css) {
			const image = new SimpleImage(element.height, element.width);
			image.setPlayerHTML(player);
			image.className = element.cssClasses;
			image.style.position = 'absolute';
			image.style.left = element?.x;
			image.style.top = element?.y;
			return image;
		}
	}
	const button = document.createElement('button');
	const icon = document.createElement('i');
	icon.className = 'material-icons';
	icon.innerText = iconSet[element.task];
	button.appendChild(icon);
	switch (element.task) {
		case 'play':
			button.addEventListener('click', () => {
				player.play({ detail: { stopOthers: true } });
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
	button.style.position = 'absolute';
	button.style.marginLeft = '3px';
	button.style.marginRight = '3px';
	button.style.cursor = 'pointer';
	button.style.width = element?.width;
	button.style.height = element?.height;
	button.style.left = element?.x;
	button.style.top = element?.y;
	if (css) {
		button.className = element.cssClasses;
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

export function isValid(conf: Configuration): boolean {
	const { dimensions, elements } = conf;
	if (!dimensions.height || !dimensions.width) {
		console.error('You need to specify the dimensions of the container');
		return false;
	}

	elements.forEach((element) => {
		if (!availableTasks.includes(element.task)) {
			console.error('You need to specify  a valid task');
			return false;
		}
	});
	return true;
}
export function generateLayout(
	idContainer: string,
	conf: Configuration,
	styleSheet?: string,
): PlayerHTML {
	const playerService = new PlayerService();
	const playerHTML = new PlayerHTML(playerService);
	const container = document.getElementById(idContainer);
	if (styleSheet) {
		const css = document.createElement('style');
		css.innerHTML = styleSheet;
		document.getElementsByTagName('head')[0].appendChild(css);
	}
	const div = document.createElement('div');
	div.style.position = 'relative';
	div.style.backgroundColor = conf.dimensions.backgroundColor
		? conf.dimensions.backgroundColor
		: '#f1f0f0';
	div.style.boxShadow = '0 4px 8px 0 rgba(0,0,0,0.2)';
	div.style.width = conf.dimensions.width;
	div.style.height = conf.dimensions?.height;
	for (const element of conf.elements) {
		div.appendChild(getButtonOrBar(element, playerHTML, true));
	}
	container.appendChild(div);
	// if (container.hasChildNodes()) {
	// 	container.replaceChild(div, container.firstChild);
	// } else {
	// 	container.appendChild(div);
	// }
	return playerHTML;
}

export function timeFormat(timestamp: number) {
	const hours = Math.floor(timestamp / 60 / 60);
	const minutes = Math.floor(timestamp / 60) - hours * 60;
	const seconds = timestamp % 60;

	const formatted =
		hours.toFixed(0).padStart(2, '0') +
		':' +
		minutes.toFixed(0).padStart(2, '0') +
		':' +
		seconds.toFixed(0).padStart(2, '0');

	return formatted;
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
	image: 'image',
	loop: 'loop',
};
const availableTasks = [
	'play',
	'pause',
	'next',
	'prev',
	'stop',
	'forward',
	'rewind',
	'shuffle',
	'loop',
	'image',
	'bar',
	'playlist',
	'image',
];
export interface Configuration {
	elements: ElementLayout[];
	layout: { rows: number; columns: number };
	dimensions: { height: string; width: string; backgroundColor: string };
}
export interface ElementLayout {
	task: string;
	cssClasses: string;
	width: string;
	height: string;
	x: string;
	y: string;
}
