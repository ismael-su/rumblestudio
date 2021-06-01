import { Howl } from 'howler';
import { v4 as uuidv4 } from 'uuid';
import {
	PlayerServiceEvent,
	PlayerServiceEventType,
	PlayerState,
	Song,
} from './interfaces';
import { allEqual, downloadFile, urlToFile } from './utils';

/**
 * Class representing a service that exposes an API for
 *  playing audio files
 * */
export class PlayerService {
	/** * When set to true the player will automatically
	 * play the next song in the playlist when actual
	 * song reaches end */
	autoPlayNext = true;

	/** * True when there is a song actually being played */
	private _isPlaying = false;
	/** *
	 * Get the _isPlaying value */
	get isPlaying(): boolean {
		return this._isPlaying;
	}
	/**
	 * Set the _isPlaying value */
	set isPlaying(newPlayingState: boolean) {
		if (this._isPlaying == newPlayingState) return;
		this._isPlaying = newPlayingState;
		if (this._isPlaying) {
			this.emit(PlayerServiceEventType.Play);
		}
		if (!this._isPlaying) {
			this.emit(PlayerServiceEventType.Pause);
		}
	}

	/**
	 * If set to true, the player will automatically start playing
	 * when a new song or playlist is loaded*/
	autoPlay = false;
	/**
	 * If set to true, the actually played song will be played in loop */
	loop = false;
	/**
	 * If set to true, the playlist will be shuffled in a random a order*/
	_shuffle = false;
	/**
	 * Get the value of _shuffle */
	get shuffle(): boolean {
		return this._shuffle;
	}
	/**
	 * Set the value of shuffle */
	set shuffle(value: boolean) {
		if (!this.playlist || this.playlist.length === 0) return;
		this._shuffle = value;
		if (!value) {
			this._shuffledPlaylist = Object.assign([], this._playlist);
		} else {
			this.shufflePlaylist();
			while (
				this._shuffledPlaylist.every(
					(value1, index1) => this._playlist[index1] === value1,
				) &&
				!allEqual(this._shuffledPlaylist)
			) {
				this.shufflePlaylist();
			}
		}
		this.emit(PlayerServiceEventType.NewPlaylist);
	}

	/**
	 * If set to true, player will keep loaded only 3 songs in the playlist:
	 * the previous song, actual song and next song. This will not have any
	 * effect if the playlist contains less than 5 songs*/
	_unloadAll = false;
	/**
	 * Get the value of _unloadAll*/
	get unloadAll() {
		return this._unloadAll;
	}
	/**
	 * Set the value of _unloadAll */
	set unloadAll(value: boolean) {
		if (value === this._unloadAll) return;
		this._unloadAll = value;
		if (value) {
			this.unload();
		} else {
			this.preloadPlaylist();
		}
	}

	/**
	 * The rate of the playback speed, a value between 0.5 to 4.0
	 * 1.0 is the normal speed which is default value*/
	private _rate = 1;
	/**
	 * Get the value of _rate */
	get rate(): number {
		return this._rate;
	}
	/**
	 * Set the value of rate */
	set rate(rate: number) {
		if (rate <= 4 && rate >= 0) {
			this._playlist.forEach((song) => {
				if (song.howl && song.valid) {
					song.howl.rate(rate);
				}
			});
			this._rate = rate;
		}
	}

	/**
	 * The volume of playback. a value between 0 to 1.0.
	 * default value is the max : 1*/
	private _volume = 1;
	/**
	 * Get the value of _volume */
	get volume() {
		return this._volume;
	}
	/**
	 * Set the value of _volume */
	set volume(level: number) {
		if (level <= 1 && level >= 0) {
			this._volume = level;
			if (this._isPlaying) {
				this._playlist[this.index].howl.volume(level);
			}
			this._playlist.forEach((value, index) => {
				if (index !== this.index && value.howl) {
					value.howl.volume(level);
				}
			});
		}
	}

	/**
	 * The index in the playlist of the song
	 * actually being played*/
	private _index: number;
	/** Get the value of _index */
	get index() {
		return this._index;
	}
	/**
	 * Set the value of _index*/
	set index(value: number) {
		if (value == this._index) return;
		this._index = value;
		this.emit(PlayerServiceEventType.NewIndex);
	}

	/**
	 * An array containing a set set of song to be played
	 * it can contain a single song or multiple songs loaded
	 * from an RSS feed URL, audio file urls or Song Objects */
	private _playlist: Song[];
	/** @hidden : holds a copy of the playlist, but randomly reorder which is used as the playlist when _shuffle is set to true */
	private _shuffledPlaylist: Song[];
	/**
	 * Get the value of _playlist*/
	get playlist() {
		if (this._shuffle === true) {
			return this._shuffledPlaylist;
		}
		return this._playlist;
	}
	/**
	 * Set the value of playlist */
	set playlist(playlist: Song[]) {
		this.stop(); // stop before doing anything else
		this._playlist = playlist;
		this._shuffledPlaylist = playlist;
		this.index = this._playlist.length > 0 ? 0 : -1;
		this.preloadPlaylist();
		this.emit(PlayerServiceEventType.NewPlaylist);
	}

	/**
	 * The total duration of the song actually being played*/
	private _duration: number;
	/**
	 * Get the value of _duration */
	get duration() {
		return this._duration;
	}
	/** Set the value of _duration */
	set duration(newDuration: number) {
		if (this._duration == newDuration) return;
		this._duration = newDuration;
	}

	/** The progress in percentage of the song being played */
	private _percentage: number;
	/**
	 * Get the value of _percentage */
	get percentage() {
		return this._percentage;
	}
	/**
	 * Set the value of _percentage*/
	set percentage(newPercentage: number) {
		if (this._percentage == newPercentage) return;
		this._percentage = newPercentage;
	}

	/**
	 * The progress in seconds of the song being played*/
	private _position: number;
	/**
	 * Get the value of _position */
	get position() {
		return this._position;
	}
	/**
	 * Set the value of _position */
	set position(newPosition: number) {
		if (this._position == newPosition) return;
		this._position = newPosition;
		let duration = 0;
		if (this.playlist[this.index].howl) {
			duration = this.playlist[this.index].howl.duration();
		}
		this._percentage = duration > 0 ? this.position / duration : 0;
		this.emit(PlayerServiceEventType.NewPosition);
	}

	/**
	 * Create a player service
	 */
	constructor(update_delay = 100) {
		this._playlist = [];
		this._shuffledPlaylist = [];
		this._index = -1;
		this._position = 0;
		this._percentage = 0;

		setInterval(() => {
			this.updatePositions();
		}, update_delay);
	}

	/**
	 * Returns the index of a given song in the playlist*/
	getRank(song: Song): number {
		return this.playlist.map((s) => s.id).indexOf(song.id);
	}

	/** @hidden : called regularly to update positions  */
	private updatePositions(): void {
		if (this.playlist.length === 0) return;
		this.playlist.forEach((song: Song) => {
			if (song.howl && song.valid && song.loaded) {
				song.position = song.howl.seek() as number;
			} else {
				song.position = -1;
			}
		});
		this.position = this.playlist[this.index].position;
	}

	/**
	 * Returns the song at index in the playlist, if instanciateHowlIfMissing
	 * is set to true, it will load the song if it is not already loaded
	 * this is important when unloadAll is set to true*/
	getSong(index: number, instanciateHowlIfMissing = true): Song {
		let song = this.playlist[index];
		if (!song.valid) {
			// song invalid is return as it is without loading any more howl
			return song;
		}

		if (!song.howl && instanciateHowlIfMissing) {
			song = this.createHowlWithBindings(song, index);
			if (!song.howl) {
				song.valid = false;
			}
		}
		return song;
	}

	/** @hidden : generate new Song using Howl */
	private createHowlWithBindings(song: Song, index: number): Song | null {
		// Extract the file extension from the URL or base64 data URI.
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const fileURI = song.file;
		//console.log('[playerService](createHowlWithBindings)',{fileURI})
		let ext: RegExpExecArray = /^data:audio\/([^;,]+);/i.exec(fileURI);
		if (!ext) {
			ext = /\.([^.]+)$/.exec(fileURI.split('?', 1)[0]);
		}
		const extLowerCase: string = ext ? ext[1].toString().toLowerCase() : '';
		if (!extLowerCase) {
			// howler library can't manage file without extension
			console.warn(
				'This file does not have an extension and will be ignored by the player',
			);
			this.playlist[index].valid = false;
			this.playlist[index].loaded = false;
			return null;
		}
		const howl = new Howl({
			src: [song.file],
			html5: true,
			onplayerror: (error) => {
				console.error('error howler playing', error);
				this.emit(PlayerServiceEventType.PlayError);

				if (index == this.index) {
					this.isPlaying = false;
				}

				song.valid = false;
				song.loaded = false;
			},
			onload: () => {
				song.valid = true;
				song.loaded = true;

				if (index === 0 && this.autoPlay) this.play(0);

				if (song.onload) song.onload(song);
			},
			onloaderror: (error) => {
				console.warn('error howler loading', error);
				this.emit(PlayerServiceEventType.LoadError);
				song.valid = true;
				song.loaded = true;
			},
			onend: () => {
				if (this.loop) {
					this.seekPerPercentage(0);
					this.emit(PlayerServiceEventType.EndOfSong);
					this.play();
					return;
				}
				if (this.autoPlayNext) this.next();
				else {
					this.stop();
				}
				this.emit(PlayerServiceEventType.EndOfSong);
			},
			onpause: () => {
				if (index == this.index) {
					this.isPlaying = false;
				}
			},
			onplay: () => {
				if (index == this.index) {
					this.isPlaying = true;
				}
			},
			onseek: () => {
				//
			},
		});
		song.howl = howl;
		return song;
	}

	/**
	 * Preload all songs in the playlist, or at least 3 of them when unloadAll is true
	 */
	preloadPlaylist(): void {
		if (this.unloadAll) {
			this.unload();
			return;
		}
		this.playlist.forEach((song, index) => {
			song = this.createHowlWithBindings(song, index);
		});
	}

	/**
	 * Unload a song */
	unloadSong(song: Song): void {
		if (song.valid && song.howl) {
			song.howl.unload();
			song.loaded = false;
		}
	}

	/** Load a song*/
	loadSong(song: Song): void {
		if (song.valid && song.howl) {
			song.howl.load();
			song.loaded = true;
		}
	}

	/**
	 * Add a new track in the playlist */
	addSong(songFileUrl: string): void {
		const index = this.playlist.length;
		const song = this.generateSongFromUrl(songFileUrl, index);
		const newPlaylist = this.playlist;
		newPlaylist.push(song);

		this.playlist = newPlaylist;
		this.playlist[index] = this.createHowlWithBindings(song, index);
	}

	/**
	 * Start playing. if on pause, it will resume the actual song
	 * if not it will play the first song in the playlist.
	 * if index param is given, it will play the song at the index.
	 * It will resolve a promise with 1 if successfully play,
	 * it will resolve -1 if the playlist is empty*/
	public play(index?: number): Promise<number> {
		if (index > -1 && index < this.playlist.length) {
			this.index = index;
		}

		// if no playlist index is -1
		if (this.playlist.length === 0) return Promise.resolve(-1);

		const indexToPlay = this.index;

		// Check howl instance to play
		const song = this.getSong(indexToPlay);

		if (song.howl && !song.valid) {
			return;
		}
		this.isPlaying = true;

		// Check if howl is already playing
		if (song.valid) {
			if (song.howl.playing()) {
				return Promise.resolve(indexToPlay);
			} else {
				song.howl.play();
				return Promise.resolve(indexToPlay);
			}
		}
	}

	/**
	 * Same as play, start playing, but with the possibility to add additional
	 * options such as stop playing all other songs in the playlist*/
	public playWithOptions(options): Promise<number> {
		if (options.index !== undefined) {
			return this.play(options.index);
		} else {
			return this.play();
		}
	}

	/**
	 * Pause the song being played . if index provided it will put on pause
	 * the song at that index in the playlist, this is useful when playing multiple
	 * songs at the same time, a feature offered by this library.
	 * If pauseOthers is true, it will put on pause all the tracks in the playlist*/
	public pause(options?: { index?: number; pauseOthers?: boolean }): void {
		if (this.playlist.length === 0) return;
		if (
			options &&
			options.index > -1 &&
			options.index < this.playlist.length &&
			!options.pauseOthers
		) {
			// should pause only 1 song
			const song = this.playlist[options.index];
			if (song.howl && song.valid) {
				song.howl.pause();
			}
		}
		if (
			options &&
			options.index > -1 &&
			options.index < this.playlist.length &&
			options.pauseOthers
		) {
			// should pause OTHERS only
			this.playlist.forEach((song: Song, songIndex: number) => {
				if (song.howl && song.valid && songIndex != options.index) {
					song.howl.pause();
				}
			});
		} else {
			// we pause all song in the playlist (several can play together)
			this.playlist.forEach((song: Song) => {
				if (song.howl && song.valid) {
					song.howl.pause();
				}
			});
		}
		this.updatePositions();
	}

	/**
	 * Stop the song being played, if index provided it will stop the song
	 * at that index in the playlist */
	public stop(index?: number): void {
		if (this.playlist.length === 0) return;

		if (index) {
			const song = this.playlist[index];
			if (song.howl && song.valid) {
				song.howl.stop();
				this.isPlaying = false;
				this.emit(PlayerServiceEventType.Stop);
			}
		} else {
			// we stop all songs in the playlist (several can play together)
			this.playlist.forEach((song: Song) => {
				if (song.howl && song.valid) {
					song.howl.stop();
					this.isPlaying = false;
					this.emit(PlayerServiceEventType.Stop);
				}
			});
		}
	}

	/**
	 * Play next song in the playlist, if we are already on the last track
	 * it will play the first one*/
	public next(): void {
		if (this.playlist.length === 0) {
			console.warn("Can't do next: no file available.");
			return;
		}

		// remember value before stopping
		const isPlaying = this._isPlaying;
		this.stop();
		// if no other song is valid we stop
		if (!this.playlist.some((s) => s.valid)) {
			console.warn("Can't do next: no file valid.");
			return;
		}

		if (this.index + 1 >= this.playlist.length) {
			this.index = 0;
		} else {
			this.index += 1;
		}

		// re-use value from before stop
		if (!this.playlist[this.index].valid) {
			this.next();
			return;
		}
		if (isPlaying) {
			this.emit(PlayerServiceEventType.Play);
			this.play();
		}
		const length = this.playlist.length;
		if (this.unloadAll && length >= 5) {
			let indexToLoad: number;
			let indexToUnLoad: number;
			if (this.index === 0) {
				indexToUnLoad = length - 2;
				indexToLoad = 1;
			} else if (this.index === 1) {
				indexToUnLoad = length - 1;
				indexToLoad = this.index + 1;
			} else {
				indexToLoad = this.index === length - 1 ? 0 : this.index + 1;
				indexToUnLoad = this.index - 2;
			}
			this.loadSong(this.playlist[indexToLoad]);
			this.unloadSong(this.playlist[indexToUnLoad]);
		}
		this.emit(PlayerServiceEventType.Next);
	}

	/**
	 * Play the previously played song in the playlist if actual
	 * song being played hasn't been played for more than 2 seconds,
	 * otherwise it will simply restart the actual song*/
	public prev(): void {
		if (this.playlist.length === 0) return;

		const song = this.getSong(this.index);
		if (song.howl && song.valid) {
			const currentPosition = song.howl.seek() as number;
			if (currentPosition > 2) {
				this.seekPerPosition(0);
				this.emit(PlayerServiceEventType.Play);
				return;
			}
		}

		// remember value before stopping
		const isPlaying = this._isPlaying;

		this.stop();

		// if no other song is valid we stop
		if (!this.playlist.some((s) => s.valid)) {
			console.warn("Can't do prev: no file valid.");
			return;
		}

		if (this.index - 1 < 0) {
			this.index = this.playlist.length - 1;
		} else {
			this.index -= 1;
		}
		if (!this.playlist[this.index].valid) {
			this.prev();
			return;
		}

		if (isPlaying) {
			this.play();
		}
		const length = this.playlist.length;
		if (this.unloadAll && length >= 5) {
			let indexToLoad: number;
			let indexToUnLoad: number;
			if (this.index === 0) {
				indexToLoad = length - 1;
				indexToUnLoad = 2;
			} else if (this.index === length - 1) {
				indexToUnLoad = 1;
				indexToLoad = length - 2;
			} else {
				indexToLoad = this.index - 1;
				indexToUnLoad = this.index === length - 2 ? 0 : this.index + 2;
			}
			this.loadSong(this.playlist[indexToLoad]);
			this.unloadSong(this.playlist[indexToUnLoad]);
		}
		this.emit(PlayerServiceEventType.Prev);
	}

	/**
	 * Jump to a given progress percentage of actual song,
	 * if index is provided, it will make the jump on the song at the
	 * given index in the playlist  */
	public seekPerPercentage(percentage: number, index?: number): void {
		if (this.playlist.length === 0) return;

		let indexToSeek = this.index;
		if (index !== undefined && index > -1 && index < this.playlist.length) {
			indexToSeek = index;
		}
		const song = this.getSong(indexToSeek);
		if (song.howl.state() === 'loading') {
			song.howl.once('load', () => {
				const position = percentage * song.howl.duration();
				this.seekPerPosition(position, indexToSeek);
			});
		} else if (song.howl.state() === 'loaded') {
			const position = percentage * song.howl.duration();
			this.seekPerPosition(position, indexToSeek);
		}
	}

	/**
	 * Jump to a given progress position in seconds of actual song,
	 * if index is provided, it will make the jump on the song at the
	 * given index in the playlist  */
	public seekPerPosition(position: number, index?: number): void {
		if (this.playlist.length === 0) return;

		let indexToSeek = this.index;
		if (index !== undefined && index > -1 && index < this.playlist.length) {
			indexToSeek = index;
		}
		const song = this.getSong(indexToSeek);

		if (song.howl.state() === 'loading') {
			song.howl.once('load', () => {
				if (position > song.howl.duration()) {
					this.next();
				} else if (position < 0) {
					song.howl.seek(0);
				} else {
					song.howl.seek(position);
				}
			});
		} else if (song.howl.state() === 'loaded') {
			if (position > song.howl.duration()) {
				this.next();
			} else if (position < 0) {
				song.howl.seek(0);
			} else {
				song.howl.seek(position);
			}
		}
	}

	/** Returns the ETA of the actual song in seconds, if index provided it will
	 * return the ETA for the song at index in the playlist */
	public getSongTimeLeft(index?: number): number {
		if (this.playlist.length === 0) return -1;

		let indexToSeek = this.index;
		if (index !== undefined && index > -1 && index < this.playlist.length) {
			indexToSeek = index;
		}
		const song = this.getSong(indexToSeek);
		if (!song.valid) {
			return -1;
		}
		if (song.howl.state() === 'loading') {
			// TODO: can we improve behaviour with a Promise?f
			return -1;
		} else if (song.howl.state() === 'loaded') {
			return song.howl.duration() - <number>song.howl.seek();
		}
	}

	/** Returns the total duration in seconds of the song at index
	 * otherwise it returns the total duration of the actual song */
	public getSongTotalTime(index?: number): number {
		if (this.playlist.length === 0) return -1;

		let indexToSeek = this.index;
		if (index !== undefined && index > -1 && index < this.playlist.length) {
			indexToSeek = index;
		}
		const song = this.getSong(indexToSeek);
		if (!song.valid) {
			return -1;
		}
		if (song.howl.state() === 'loading') {
			// TODO: can we improve behaviour with a Promise?
			return -1;
		} else if (song.howl.state() === 'loaded') {
			return song.howl.duration();
		}
	}

	/** Load a playlist from an array of song files URI*/
	public setPlaylistFromUrls(urls: string[]): void {
		this.playlist = urls.map((url, index) => {
			const song: Song = {
				songTitle: 'Song ' + index,
				file: url,
				howl: null,
				id: uuidv4(),
			};
			return song;
		});
	}

	/** Load a playlist from Partial Song object */
	public setPlaylistFromSongObjects(songs: Partial<Song>[]) {
		this.playlist = songs.map((songData, index) => {
			const song: Song = {
				songTitle: songData.songTitle || 'Song ' + index,
				file: songData.file,
				howl: null,
				id: songData.id || uuidv4(),
				songCover: songData.songCover,
				albumTitle: songData.albumTitle,
				author: songData.author,
				albumCover: songData.albumCover,
			};
			return song;
		});
	}

	/**
	 *
	 * Allows to generate a song object using an URL
	 * @param url
	 * @param index
	 * @returns
	 */
	private generateSongFromUrl(url: string, index: number): Song {
		return {
			songTitle: 'Song ' + index,
			file: url,
			howl: null,
			id: uuidv4(),
		} as Song;
	}

	/**
	 * Load a playlist from the URL of a RSS feed file */
	public setPLaylistFromRSSFeedURL(url: string): Promise<void> {
		return fetch(url)
			.then((r) => r.text())
			.then((r) => {
				const parser = new DOMParser();
				const dom = parser.parseFromString(r, 'application/xml');
				const songList: Song[] = [];
				const channel = dom.documentElement
					.getElementsByTagName('channel')
					.item(0);
				const albumTitle = channel.querySelector('title').textContent;
				const author = channel
					.getElementsByTagName('itunes:author')
					.item(0).textContent;
				let albumCover = this.extractImage(channel);
				dom.documentElement
					.querySelectorAll('item')
					.forEach((value) => {
						const songTitle =
							value.querySelector('title').textContent;
						const file = value
							.querySelector('enclosure')
							.getAttribute('url');
						let songCover = this.extractImage(value);

						songCover = songCover || albumCover;
						albumCover = albumCover || songCover;

						const song: Song = {
							id: uuidv4(),
							songTitle,
							file,
							songCover,
							albumTitle,
							author,
							albumCover,
						};
						songList.push(song);
					});
				this.setPlaylistFromSongObjects(songList);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	/** @hidden : used to get the picture of a podcast show and/or the picture
	 * of some of its episodes */
	private extractImage(elt: Element): string | null {
		try {
			const simpleImage = elt.querySelector('image');

			if (simpleImage) {
				const url = simpleImage.querySelector('url');
				if (url) {
					return url.textContent;
				}
			}
		} catch (e) {
			console.warn(e);
		}
		try {
			const itunesImage = elt.getElementsByTagName('itunes:image');
			if (itunesImage) {
				const img = itunesImage.item(0);
				if (img) {
					const url = img.getAttribute('href');
					return url;
				}
			}
		} catch (e) {
			console.warn(e);
		}
		return null;
	}

	/** Allows to download song file from its index in the playlist.
	 * If the index is not provided, it will download the track actually played*/
	async download(index?: number): Promise<void> {
		const indexToDowload = index || this.index;
		const song = this.playlist[indexToDowload];
		downloadFile(
			await urlToFile(
				song.file,
				song.songTitle,
				'application/octet-stream',
			),
		);
	}

	/** Allows to shuffle the playlist*/
	private shufflePlaylist(): void {
		let currentIndex = this._shuffledPlaylist.length,
			temporaryValue,
			randomIndex;
		const array = this._shuffledPlaylist;
		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		this._shuffledPlaylist = array;
	}

	/** CALLBACKS ON UPDATE */

	addNewOnCallback(callback: (event: PlayerServiceEvent) => void): void {
		if (this.playingEventsCallbacks.some((value) => value === callback)) {
			console.warn('Callback already present: ignored');
			return;
		}

		this.playingEventsCallbacks.push(callback);
	}
	/** CALLBACKS ON STATE CHANGE */
	private playingEventsCallbacks: ((event: PlayerServiceEvent) => void)[] =
		[];
	private PlayerStateChangedCallback(event: PlayerServiceEvent) {
		this.playingEventsCallbacks.forEach((callback) => {
			callback(event);
		});
	}

	/**
	 * Responsible for emitting events whenever the player state changes*/
	private emit(type: PlayerServiceEventType) {
		const event: PlayerServiceEvent = {
			type,
			state: {
				position: this.position,
				percentage: this.percentage,
				index: this.index,
				playing: this._isPlaying,
			} as PlayerState,
		};
		this.PlayerStateChangedCallback(event);
	}

	/**
	 * Unload song from memory
	 */
	private unload() {
		if (this.playlist.length >= 4) {
			const length = this.playlist.length;
			const before = this.index === 0 ? length - 1 : this.index - 1;
			const after = this.index === length - 1 ? 0 : this.index + 1;
			for (let i = 0; i < length; i++) {
				if (i != this.index && i != before && i != after) {
					this.unloadSong(this.playlist[i]);
				} else {
					if (!(this.playlist[i].valid === false)) {
						this.createHowlWithBindings(this.playlist[i], i);
					}
				}
			}
		}
	}
}
