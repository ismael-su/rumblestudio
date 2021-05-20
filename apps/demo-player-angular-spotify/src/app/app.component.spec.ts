import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { SpotifyComponent } from './spotify/spotify.component';
import { PlaylistComponent } from './spotify/playlist/playlist.component';
import { PlaylistItemComponent } from './spotify/playlist-item/playlist-item.component';
import { ControlComponent } from './spotify/control/control.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('AppComponent', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				MatIconModule,
				MatSliderModule,
				MatDialogModule,
			],
			declarations: [
				AppComponent,
				SpotifyComponent,
				PlaylistComponent,
				PlaylistItemComponent,
				ControlComponent,
			],
		}).compileComponents();
	});

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
