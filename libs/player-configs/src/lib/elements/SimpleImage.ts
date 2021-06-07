import { GenericVisual } from './GenericVisual';
import { PlayerService } from '@rumblestudio/player-service';
import { PlayerHTML } from './playerHTML';

export class SimpleImage extends GenericVisual {
	private src: string;
	height: string;
	width: string;
	_playerService: PlayerService;
	set player(player: PlayerService) {
		this._playerService = player;
		this.src = player.playlist[player.index]?.albumCover
			? player.playlist[player.index].albumCover
			: '';
		this.shadowRoot.querySelector('img').setAttribute('src', this.src);
	}
	constructor(height?: string, width?: string) {
		super();
		this.height = height ? height : '200px';
		this.width = width ? width : '200px';
		this.createHTMLElements();
	}

	protected createHTMLElements() {
		const wrapper = document.createElement('div');
		wrapper.style.maxHeight = this.height;
		wrapper.style.maxWidth = this.width;
		this.attachShadow({ mode: 'open' });
		const image = document.createElement('img');
		image.style.maxHeight = this.height;
		if (this.src && this.src.length > 0) {
			image.setAttribute('src', this.src);
		}
		wrapper.appendChild(image);
		const style = document.createElement('style');
		this.shadowRoot.appendChild(style);
		this.shadowRoot.appendChild(wrapper);
	}

	setPlayerHTML(playerHTML: PlayerHTML) {
		this.player = playerHTML.playerService;
		this.playerHTML = playerHTML;
	}
	protected updateState(state?) {
		if (state.type === 'play') {
			this.src =
				this._playerService.playlist[
					this._playerService.index
				].albumCover;
			this.shadowRoot.querySelector('img').setAttribute('src', this.src);
		}
	}

	protected setListeners() {
		this.playerHTML.addEventListener('new position', (payload) =>
			this.updateVisual(payload),
		);
		this.playerHTML.addEventListener('play', (event) =>
			this.updateState(event),
		);
	}
}

customElements.define('rs-simple-image', SimpleImage);
