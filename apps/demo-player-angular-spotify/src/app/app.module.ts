import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SpotifyModule } from './spotify/spotify.module';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { SpotifyComponent } from './spotify/spotify.component';
import { PlaylistComponent } from './spotify/playlist/playlist.component';
import { PlaylistItemComponent } from './spotify/playlist-item/playlist-item.component';
import { ControlComponent } from './spotify/control/control.component';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		FormsModule,
		MatDialogModule,
		SpotifyModule,
		BrowserAnimationsModule,
		MatIconModule,
	],
	providers: [],
	exports: [
		SpotifyComponent,
		PlaylistComponent,
		PlaylistItemComponent,
		ControlComponent,
	],
	bootstrap: [AppComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
