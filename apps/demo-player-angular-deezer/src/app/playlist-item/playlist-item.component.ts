import { Component, Input, OnInit } from '@angular/core';
import { AudioService } from '../audio.service';

@Component({
	selector: 'rumblestudio-playlist-item',
	templateUrl: './playlist-item.component.html',
	styleUrls: ['./playlist-item.component.scss'],
})
export class PlaylistItemComponent implements OnInit {
	@Input() index;
	@Input() name;
	@Input() author;
	@Input() album;
	@Input() songCover;

	isOn = false;
	isPlaying = false;

	constructor(private audioService: AudioService) {}

	ngOnInit(): void {
		this.audioService.addNewOnCallback(() => this.songPlayed());
	}

	mouseEnter(): void {
		this.isOn = !this.isOn;
	}

	mouseLeave(): void {
		this.isOn = !this.isOn;
	}

	playSong(index): void {
		this.audioService.stop(this.audioService.index);
		this.audioService.play(index);
	}

	songPlayed(): void {
		if (this.index === this.audioService.index) {
			this.isPlaying = true;
		} else {
			this.isPlaying = false;
		}
	}

	getTime(index): string {
		const time = this.audioService.getSongTotalTime(index);

		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time - minutes * 60);

		return `${minutes}:` + (seconds < 10 ? `0${seconds}` : `${seconds}`);
	}
}
