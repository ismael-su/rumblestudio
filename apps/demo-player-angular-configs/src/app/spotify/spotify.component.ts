import { Component, OnInit } from '@angular/core';
import { generateLayout } from '@rumblestudio/player-configs';
import CONF from './conf';
import { PlayerService } from '@rumblestudio/player-service';
import { LoadDialogComponent } from '../load-dialog/load-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'rumblestudio-spotify',
	templateUrl: './spotify.component.html',
	styleUrls: ['./spotify.component.scss'],
})
export class SpotifyComponent implements OnInit {
	private service: PlayerService;
	constructor(public dialog: MatDialog) {}

	ngOnInit(): void {
		const style = `
    .rounded{
    border-radius:50%;
    color: white;
    background-color: transparent;
    border-color: transparent;
    transform: scale(1.2)
    }`;
		this.service = generateLayout('container', CONF, style).playerService;
		this.service.setPLaylistFromRSSFeedURL(
			'https://rss.art19.com/apology-line',
		);
	}
	openDialog() {
		const dialogRef = this.dialog.open(LoadDialogComponent, {
			width: '400px',
			height: '200px',
		});

		dialogRef.afterClosed().subscribe((result) => {
			console.log(result);
			if (result === 'default') {
				this.service.setPLaylistFromRSSFeedURL(
					'https://rss.art19.com/apology-line',
				);
			} else {
				this.service.setPLaylistFromRSSFeedURL(result);
			}
		});
	}
}
