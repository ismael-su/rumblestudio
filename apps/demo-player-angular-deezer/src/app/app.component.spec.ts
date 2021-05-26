import { TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { HomeComponent } from './home/home.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistCreatorComponent } from './playlist-creator/playlist-creator.component';
import { PlaylistItemComponent } from './playlist-item/playlist-item.component';
import { APP_BASE_HREF } from '@angular/common';

describe('AppComponent', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				AppComponent,
				PlayerComponent,
				HomeComponent,
				PlaylistComponent,
				PlaylistCreatorComponent,
				PlaylistItemComponent,
			],
			imports: [
				MatIconModule,
				RouterModule.forRoot(
					[
						{ path: 'home', component: HomeComponent },
						{
							path: 'playlist',
							component: PlaylistCreatorComponent,
						},
						{ path: 'playlist/:id', component: PlaylistComponent },
					],
					{ initialNavigation: 'enabled' },
				),
			],
			providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
		}).compileComponents();
	});

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});

	it(`should have as title 'demo-player-angular-deezer'`, () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app.title).toEqual('demo-player-angular-deezer');
	});

	it('should render title', () => {
		const fixture = TestBed.createComponent(AppComponent);
		fixture.detectChanges();
		const compiled = fixture.nativeElement;
		expect(compiled.querySelector('h1').textContent).toContain(
			'RumbleDeezer',
		);
	});
});
