import { GenericVisual } from './GenericVisual';
import { Song } from '@rumblestudio/player-service';

export class SimplePlaylist extends GenericVisual {
	div: HTMLDivElement = document.createElement('div');
	private _shadow: ShadowRoot;
	private _playlist: Song[] = [];
	set playlist(playlist: Song[]) {
		this._playlist = playlist;
		this.updateContentVisual();
	}
	get playlist() {
		return this._playlist;
	}

	constructor(private playlistTitle = 'RS Playlist') {
		super();
		this.createHTMLElements();
	}

	protected createHTMLElements() {
		this._shadow = this.attachShadow({ mode: 'open' });
		this.div = document.createElement('div');
		const style = document.createElement('style');
		const MaterialIcons =
			'https://fonts.googleapis.com/icon?family=Material+Icons';
		const css = document.createElement('link');
		css.setAttribute('rel', 'stylesheet');
		css.setAttribute('type', 'text/css');
		css.setAttribute('href', MaterialIcons);
		this.div.setAttribute('id', 'container');
		this._shadow.appendChild(style);
		this._shadow.appendChild(css);
		this._shadow.appendChild(this.div);
		this._shadow.querySelector('style').textContent = this.generateStyle();
	}

	protected setEmitters() {
		super.setEmitters();
	}

	updateContentVisual() {
		this.div.innerHTML = '';
		const p = document.createElement('p');
		p.innerText = this.playlistTitle;
		const ul = document.createElement('ul');
		this.div.appendChild(p);
		const infoMessage = document.createElement('p');
		infoMessage.style.fontWeight = 'bold';
		infoMessage.style.fontSize = 'large';
		if (this.playerHTML) {
			infoMessage.innerHTML =
				this.playerHTML.playlist.length === 0 ? 'Playlist empty' : '';
			this.div.appendChild(infoMessage);
			this.playerHTML.playlist.forEach((value, index) => {
				const line = this.generateLine(value, index);
				ul.appendChild(line);
			});
		} else {
			infoMessage.innerHTML = 'Playlist empty';
		}
		this.div.appendChild(ul);
	}

	generateLine(song: Song, index: number): HTMLDivElement | HTMLLIElement {
		// Each line of the playlist

		// Each line of the playlist V2
		const li = document.createElement('li');

		const image = document.createElement('img');
		const noImage = document.createElement('p');
		//noImage.style.position='absolute'
		noImage.style.fontWeight = 'bold';
		if (song.songCover) {
			image.setAttribute('src', song.songCover);
		} else {
			noImage.innerHTML = '[NO IMAGE]';
		}
		image.style.maxHeight = '50px';
		const p = document.createElement('p');
		p.innerText =
			song.songTitle +
			(song.valid == undefined
				? ' (false) '
				: ' (' + String(song.valid) + ')');
		if (index === this.playerHTML.index) {
			p.style.fontWeight = 'bold';
			p.innerHTML = song.songTitle + ' (SELECTED)';
		}
		li.appendChild(p);

		const playButton = document.createElement('button');
		const playIcon = document.createElement('i');
		playIcon.className = 'material-icons';
		playIcon.innerText = 'play_circle';
		playButton.appendChild(playIcon);
		playButton.addEventListener('click', () => {
			console.log('play song', index);
			if (song.valid) {
				const event = new CustomEvent('play', {
					detail: {
						index,
						stopOthers: true,
						keepPlaying: false,
						updateGlobalIndex: true,
						startSongAgain: false,
					},
				});
				this.playerHTML.play(event);
			}
		});

		const pauseButton = document.createElement('button');
		const pauseIcon = document.createElement('i');
		pauseIcon.className = 'material-icons';
		pauseIcon.innerText = 'pause_circle';
		pauseButton.appendChild(pauseIcon);
		pauseButton.addEventListener('click', () => {
			if (song.valid) {
				this.playerHTML.pause({ index });
			}
		});
		song.onload = (song: Song) => {
			const text = li.querySelector('p');

			text.innerHTML = song.songTitle + '(' + song.valid + ')';
			if (index === this.playerHTML.index) {
				text.style.fontWeight = 'bold';
				text.innerHTML =
					song.songTitle + ' (SELECTED)' + '(' + song.valid + ')';
			}
		};

		li.appendChild(noImage);
		li.appendChild(image);
		li.appendChild(playButton);
		li.appendChild(pauseButton);
		return li;
	}
	updateLine = () => {
		if (
			this.playerHTML.playlist.length <= 1 ||
			this.playerHTML.index === -1 ||
			!this._shadow === null
		) {
			return;
		}

		this.playerHTML.playlist.forEach((song, index) => {
			console.log(index);
			const shadow = this._shadow;
			const allLines = shadow.querySelectorAll('li');
			if (!allLines) {
				return;
			}
			const item = allLines.item(index);
			if (!item) {
				return;
			}
			const text = item.querySelector('p');
			if (!text) {
				return;
			}
			text.innerHTML = song.songTitle + '(' + song.valid + ')';
			if (index === this.playerHTML.index) {
				text.style.fontWeight = 'bold';
				text.innerHTML =
					song.songTitle + ' (SELECTED)' + '(' + song.valid + ')';
			}
		});
	};

	protected setListeners() {
		this.playerHTML.addEventListener('new playlist', this.onPlaylist);
		this.playerHTML.addEventListener('new index', () => {
			this.updateLine();
		});
	}
	onPlaylist = () => {
		this.updateContentVisual();
	};

	generateStyle() {
		return `
		#container{
			width:90%;
			min-height:50px;
			position:relative;
			display: flex;
			flex-direction:column;
		}
`;
	}
}
customElements.define('rs-simple-playlist', SimplePlaylist);
