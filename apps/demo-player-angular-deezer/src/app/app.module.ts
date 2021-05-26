import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { PlayerComponent } from './player/player.component';
import { HomeComponent } from './home/home.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistCreatorComponent } from './playlist-creator/playlist-creator.component';
import { PlaylistItemComponent } from './playlist-item/playlist-item.component';
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
	declarations: [
		AppComponent,
		PlayerComponent,
		HomeComponent,
		PlaylistComponent,
		PlaylistCreatorComponent,
		PlaylistItemComponent,
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot(
			[
				{ path: 'home', component: HomeComponent },
				{ path: 'playlist', component: PlaylistCreatorComponent },
				{ path: 'playlist/:id', component: PlaylistComponent },
			],
			{ initialNavigation: 'enabled' },
		),
		MatIconModule,
		FormsModule,
	],
	providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
	bootstrap: [AppComponent],
})
export class AppModule {}
