import { Component } from '@angular/core';
import { AudioService } from '../audio.service';

@Component({
	selector: 'rumblestudio-playlist',
	templateUrl: './playlist.component.html',
	styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent {
	tracks;

	constructor(private audioService: AudioService) {
		this.tracks = this.audioService.playlist;
	}
}
