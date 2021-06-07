import {
	PlayerService,
	PlayerServiceEvent,
} from '@rumblestudio/player-service';
/**
 * Class representing an object called playerHTML will be used
 * to subscribe to player-service events through DOM.
 * This class inherits HTMLElement base class
 * */
export class PlayerHTML extends HTMLElement {
	/**
	 * An instance of player-service which is in charge of all playing tasks*/
	playerService: PlayerService | null;
	/**
	 * Get the playlist from the service */
	get playlist() {
		return this.playerService.playlist;
	}

	/**
	 * Get the index of the song being played by the service */
	get index(): number {
		return this.playerService.index;
	}

	/**
	 * Get the progress position in seconds of the song being played by the service */

	get position(): number {
		return this.playerService.position;
	}

	/**
	 * Get the progress percentage of the song being played by the service*/
	get percentage(): number {
		return this.playerService.percentage;
	}

	/**
	 * Get the ETA of the song being played by the service.
	 * If an index is provided it will return the ETA of the song at that index
	 * in the playlist of the service
	 * */
	getSongTimeLeft(index?: number): number {
		return this.playerService.getSongTimeLeft(index);
	}

	/**
	 * Get the total duration in seconds of the song being played by the service
	 * If an index is provided it will return the total duration of the song at that index
	 * in the playlist of the service*/
	getSongTotalTime(index?: number): number {
		return this.playerService.getSongTotalTime(index);
	}

	/**
	 * Create the instances of playerHTML*/
	constructor(playerService?: PlayerService) {
		super();
		if (playerService) {
			this.setPlayerService(playerService);
		} else {
			this.playerService = null;
		}
	}

	/**
	 * Set the instance of playerService */
	public setPlayerService(playerService: PlayerService): void {
		this.playerService = playerService;
		this.playerService.addNewOnCallback((payload) =>
			this.eventsDispatcher(payload),
		);
	}

	/**
	 * Method in charge of dispatching events received from the service  */
	private eventsDispatcher(payload: PlayerServiceEvent): void {
		const e = new CustomEvent(payload.type, { detail: payload.state });
		this.dispatchEvent(e);
	}

	// SEND REQUESTS TO SERVICE:
	/**
	 * Start playing. if on pause, it will resume the actual song
	 * if not it will play the first song in the playlist.
	 * if index param is given inside options, it will play the song at the index.
	 * It will resolve a promise with 1 if successfully play,
	 * it will resolve -1 if the playlist is empty*/
	public play(options): Promise<number> {
		if (!this.playerService) {
			return;
		}
		const { stopOthers } = options;
		if (stopOthers === true) {
			this.playerService.pause();
		}
		this.playerService.playWithOptions(options);
	}

	/**
	 * Pause the song being played . if index provided it will put on pause
	 * the song at that index in the playlist, this is useful when playing multiple
	 * songs at the same time, a feature offered by this library.
	 * If pauseOthers is true, it will put on pause all the tracks in the playlist*/
	public pause(options?: { index?: number; pauseOthers?: boolean }): void {
		if (!this.playerService) {
			return;
		}
		this.playerService.pause(options);
	}

	/**
	 * Stop the song being played, if index provided it will stop the song
	 * at that index in the playlist */
	public stop(index?: number): void {
		if (!this.playerService) {
			return;
		}
		if (index !== undefined) {
			this.playerService.stop(index);
		} else {
			this.playerService.stop();
		}
	}

	/**
	 * Play next song in the playlist, if we are already on the last track
	 * it will play the first one*/
	public next(): void {
		console.log('[playerHTML](NEXT)NEXT FROM PLAYER HTML');
		if (!this.playerService) {
			return;
		}
		this.playerService.next();
	}

	/**
	 * Play the previously played song in the playlist if actual
	 * song being played hasn't been played for more than 2 seconds,
	 * otherwise it will simply restart the actual song*/
	public prev(): void {
		if (!this.playerService) {
			return;
		}
		this.playerService.prev();
	}

	/**
	 * Jump to a given progress percentage of actual song,
	 * if index is provided, it will make the jump on the song at the
	 * given index in the playlist  */
	public seekPerPercentage(percentage: number, index?: number): void {
		if (!this.playerService) {
			return;
		}
		if (index !== undefined && index !== null) {
			this.playerService.seekPerPercentage(percentage, index);
		} else {
			this.playerService.seekPerPercentage(percentage);
		}
	}

	/**
	 * Jump to a given progress position in seconds of actual song,
	 * if index is provided, it will make the jump on the song at the
	 * given index in the playlist  */
	public seekPerPosition(position: number): void {
		if (!this.playerService) {
			return;
		}
		this.playerService.seekPerPosition(position);
	}

	/**
	 * Jump in forward or backward in seconds, jump offset is the value
	 * event.detail.jump of event: CustomEvent. If the offset is a negative
	 * value, it will jump backwards
	 */
	public seekForJump(event: CustomEvent): void {
		const { jump } = event.detail;
		const position = this.playerService.position;
		const newPosition = jump + position;
		this.seekPerPosition(newPosition);
	}

	/**
	 * Jump to a given progress percentage of actual song,
	 * if index is provided, it will make the jump on the song at the
	 * given index in the playlist.
	 */
	seekPerPercentageAndIndex(clickEvent: eventSeek): void {
		const {
			index,
			percentage,
			stopOthers,
			keepPlaying,
			updateGlobalIndex,
			finishOthers,
		} = clickEvent.detail;

		const wasPlaying = this.playerService.isPlaying;

		if (stopOthers) {
			this.playerService.stop();
		}

		if (finishOthers && index > 0) {
			this.playerService.stop();
			this.playerService.index = 0;
			while (this.playerService.index < index) {
				this.playerService.seekPerPercentage(99);
				this.playerService.play();
				this.playerService.pause();
				this.playerService.next();
			}
		}

		if (index !== this.playerService.index && updateGlobalIndex) {
			this.playerService.index = index;
		}

		this.seekPerPercentage(percentage, index);
		if (keepPlaying && wasPlaying) {
			this.playerService.play(index);
		}
	}
}

interface eventSeek {
	detail: {
		index: number | undefined;
		percentage: number | undefined;
		stopOthers: boolean | undefined;
		keepPlaying: boolean | undefined;
		updateGlobalIndex: boolean | undefined;
		finishOthers: boolean | undefined;
	};
}
customElements.define('rumble-player', PlayerHTML);
