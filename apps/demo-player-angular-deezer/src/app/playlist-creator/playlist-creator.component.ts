import { Component } from '@angular/core';
import { AudioService } from '../audio.service';

@Component({
	selector: 'rumblestudio-playlist-creator',
	templateUrl: './playlist-creator.component.html',
	styleUrls: ['./playlist-creator.component.scss'],
})
export class PlaylistCreatorComponent {
	isOpen = false;
	popUpClass = 'pop-up-disappear';
	playlistDefault =
		'https://letempsdunvoyage.com/wp-content/uploads/2019/07/PLAYLIST-HOTEL-1170x780.png';
	asPlaylist = false;

	constructor(private audioService: AudioService) {
		if (this.audioService.playlist.length > 0) {
			this.asPlaylist = true;
		} else {
			this.asPlaylist = false;
		}
	}

	popupAppear(): void {
		if (this.isOpen) {
			this.popUpClass = 'pop-up-disappear';
		} else {
			this.popUpClass = 'pop-up-appear';
		}

		this.isOpen = !this.isOpen;
	}

	async addPlaylist(form) {
		await this.audioService.setPLaylistFromRSSFeedURL(form.value.link);
		this.asPlaylist = true;
		this.popUpClass = 'pop-up-disappear';
		form.reset();
	}
}
