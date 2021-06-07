import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistItemComponent } from './playlist-item.component';
import { MatIconModule } from '@angular/material/icon';
import { MatIconTestingModule } from '@angular/material/icon/testing';

describe('PlaylistItemComponent', () => {
	let component: PlaylistItemComponent;
	let fixture: ComponentFixture<PlaylistItemComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PlaylistItemComponent],
			imports: [MatIconModule, MatIconTestingModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(PlaylistItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
