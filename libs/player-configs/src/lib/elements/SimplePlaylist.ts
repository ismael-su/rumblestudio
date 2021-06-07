import { GenericVisual } from './GenericVisual';
import { Song } from '@rumblestudio/player-service';
import { timeFormat } from '../Factory';

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
		this.style.overflow = 'scroll';
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
		const ul = document.createElement('ul');
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
		const li = document.createElement('div');
		li.setAttribute('class', 'li');
		li.style.display = 'flex';
		li.style.flexDirection = 'rows';
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
		p.style.display = 'inline';
		p.innerText = song.songTitle + '\t' + timeFormat(song.howl.duration());
		if (index === this.playerHTML.index) {
			p.style.fontWeight = 'bold';
		}
		// li.appendChild(p);

		const playButton = document.createElement('button');
		const playIcon = document.createElement('i');
		playIcon.className = 'material-icons';
		playIcon.innerText = 'play_circle';
		playButton.appendChild(playIcon);
		playButton.addEventListener('click', () => {
			if (!this.playerHTML.playerService.isPlaying) {
				if (song.valid) {
					const event = {
						index: index,
						stopOthers: true,
						keepPlaying: false,
						updateGlobalIndex: true,
						startSongAgain: false,
					};
					this.playerHTML.play(event);
				}
			} else {
				if (song.valid) {
					if (index === this.playerHTML.index) {
						this.playerHTML.pause({ index });
					} else {
						const event = {
							index: index,
							stopOthers: true,
							keepPlaying: false,
							updateGlobalIndex: true,
							startSongAgain: false,
						};
						this.playerHTML.play(event);
					}
				}
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

			text.innerHTML =
				song.songTitle + '\t' + timeFormat(song.howl.duration());
			if (index === this.playerHTML.index) {
				text.style.fontWeight = 'bold';
			}
		};
		playButton.style.cursor = 'pointer';
		pauseButton.style.cursor = 'pointer';
		const line2 = document.createElement('div');
		line2.style.display = 'flex';
		line2.style.flexDirection = 'row';
		line2.style.alignItems = 'center';
		image.style.margin = '3px';
		noImage.style.margin = '3px';
		playButton.style.margin = '3px';
		pauseButton.style.margin = '3px';
		// li.appendChild(noImage);
		// line2.appendChild(image);
		line2.appendChild(playButton);
		// line2.appendChild(pauseButton);
		li.appendChild(line2);
		li.appendChild(p);

		li.style.borderTop = '1px solid black';
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
			const shadow = this._shadow;
			const allLines = shadow.querySelectorAll('.li');
			if (!allLines) {
				return;
			}
			const item = allLines.item(index);
			if (!item) {
				return;
			}
			const text = item.querySelector('p');
			const button = item.querySelector('button');
			if (!text) {
				return;
			}
			text.innerHTML =
				song.songTitle + '\t' + timeFormat(song.howl.duration());
			text.style.fontWeight = 'normal';
			if (index === this.playerHTML.index) {
				if (this.playerHTML.playerService.isPlaying) {
					button.className = 'material-icons';
					button.innerText = 'pause_circle';
				} else {
					button.className = 'material-icons';
					button.innerText = 'play_circle';
				}
				text.style.fontWeight = 'bold';
				text.innerHTML =
					song.songTitle + '\t' + timeFormat(song.howl.duration());
			} else {
				button.className = 'material-icons';
				button.innerText = 'play_circle';
			}
		});
	};

	protected setListeners() {
		this.playerHTML.addEventListener('new playlist', this.onPlaylist);
		this.playerHTML.addEventListener('new index', () => {
			this.updateLine();
		});
		this.playerHTML.addEventListener('play', () => {
			this.updateLine();
		});
		this.playerHTML.addEventListener('pause', () => {
			this.updateLine();
		});
		this.playerHTML.addEventListener('stop', () => {
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
			overflow: scroll;
			position:relative;
			display: flex;
			flex-direction:column;
		}
`;
	}
}
customElements.define('rs-simple-playlist', SimplePlaylist);
