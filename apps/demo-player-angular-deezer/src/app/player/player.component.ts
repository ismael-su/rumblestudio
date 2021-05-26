import { Component, OnInit } from '@angular/core';
import { Song } from '@rumblestudio/player-service';
import { AudioService } from '../audio.service';

@Component({
	selector: 'rumblestudio-player',
	templateUrl: './player.component.html',
	styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
	isPause = true;
	song: Song;
	songTitle = 'no song played';
	songLength = '0:00';
	timeLeft = '0:00';
	percentage = 0;

	constructor(private audioService: AudioService) {}

	ngOnInit(): void {
		this.audioService.addNewOnCallback(() => this.changeSongInfo());
		this.audioService.addNewOnCallback(() => this.playState());
	}

	playState(): void {
		if (this.audioService.isPlaying) {
			this.isPause = false;
		} else {
			this.isPause = true;
		}
	}

	changeState(): void {
		if (this.isPause) {
			this.audioService.play();
		} else {
			this.audioService.pause();
		}
	}

	prev(): void {
		this.audioService.prev();
		this.changeSongInfo();
	}

	next(): void {
		this.audioService.next();
		this.changeSongInfo();
	}

	updateTime(event): void {
		const totalWidth =
			document.getElementsByClassName('fullBar')[0].clientWidth;
		const clickedWidth = event.offsetX;

		const updatedTime = (clickedWidth * 100) / totalWidth;

		this.audioService.seekPerPercentage(updatedTime / 100);
	}

	changeSongInfo(): void {
		this.song = this.audioService.getSong(this.audioService.index);
		this.songTitle = this.song.songTitle;

		const length = this.audioService.getSongTotalTime(
			this.audioService.index,
		);
		this.songLength = this.convertTime(length);

		const timeLeft =
			length - this.audioService.getSongTimeLeft(this.audioService.index);
		this.timeLeft = this.convertTime(timeLeft);

		this.percentage = 100 * this.audioService.percentage;
		const progressBar = document.getElementById('progressBar');

		progressBar.style.width = `${this.percentage}%`;
	}

	convertTime(time): string {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time - minutes * 60);

		return `${minutes}:` + (seconds < 10 ? `0${seconds}` : `${seconds}`);
	}
}
