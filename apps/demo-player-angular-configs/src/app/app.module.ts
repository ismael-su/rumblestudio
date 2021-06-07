import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ConfigsModule } from '@rumblestudio/player-configs';
import { SpotifyComponent } from './spotify/spotify.component';
import {
	MAT_DIALOG_DATA,
	MatDialogModule,
	MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import {
	BrowserAnimationsModule,
	NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { LoadDialogComponent } from './load-dialog/load-dialog.component';

@NgModule({
	declarations: [AppComponent, SpotifyComponent, LoadDialogComponent],
	imports: [
		BrowserModule,
		MatInputModule,
		MatFormFieldModule,
		MatIconModule,
		MatSliderModule,
		MatDialogModule,
		FormsModule,
		MatButtonModule,
		MatIconTestingModule,
		BrowserAnimationsModule,
		NoopAnimationsModule,
		ConfigsModule,
	],
	providers: [
		{
			provide: MatDialogRef,
			useValue: {},
		},
		{
			provide: MAT_DIALOG_DATA,
			useValue: {},
		},
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	bootstrap: [AppComponent],
})
export class AppModule {}
