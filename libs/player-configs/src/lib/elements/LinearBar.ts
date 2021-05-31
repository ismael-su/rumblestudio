import { GenericVisual } from './GenericVisual';

export class LinearBar extends GenericVisual {
	// tslint:disable-next-line:variable-name
	protected _kind = 'LinearBar';
	// tslint:disable-next-line:variable-name
	private _shadow: ShadowRoot;
	div: HTMLDivElement = document.createElement('div');
	progressDiv: HTMLDivElement = document.createElement('div');
	percentage: number;

	constructor() {
		super();
		this.createHTMLElements();
	}

	protected createHTMLElements() {
		this.style.display = 'flex';
		this.style.flex = '1';
		this._shadow = this.attachShadow({ mode: 'open' });
		const style = document.createElement('style');
		this.div = document.createElement('div');
		this.div.setAttribute('id', 'bar');
		this.progressDiv = document.createElement('div');
		this.progressDiv.setAttribute('id', 'progressBar');
		this.div.appendChild(this.progressDiv);
		this._shadow.appendChild(style);
		this._shadow.appendChild(this.div);
		this._shadow.querySelector('style').textContent = this.generateStyle(0);
	}

	protected setEmitters() {
		console.log('EMITTER');

		this.addEventListener('click', (event) => {
			const bcr = this.getBoundingClientRect();
			const percentage = (event.clientX - bcr.left) / bcr.width;

			this.playerHTML.seekPerPercentage(percentage);
		});
	}

	protected setListeners() {
		console.log('setting listners');
		this.playerHTML.addEventListener('new position', (payload) =>
			this.updateVisual(payload),
		);
		this.playerHTML.addEventListener('seek', () => this.updateVisual());
	}

	updateVisual = (payload?) => {
		console.log('UPDATE');

		if (payload) {
			console.log(payload);
			this.percentage = this.playerHTML.percentage;
		}
		this._shadow.querySelector('style').textContent = this.generateStyle(
			this.percentage,
		);
	};

	generateStyle(percentage: number) {
		return `
		#bar{
		  flex:1;
			height:9px;
			position:relative;
			background-color: red;
			cursor:pointer;
			min-width: 30px;
		}
		#progressBar {
			width: ${100 * percentage}%;
			height: 100%;
			background-color: white;
			opacity:0.5
		}`;
	}
}

customElements.define('rs-linear-bar', LinearBar);
