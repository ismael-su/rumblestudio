import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

import { PlaylistCreatorComponent } from './playlist-creator.component';

describe('PlaylistCreatorComponent', () => {
	let component: PlaylistCreatorComponent;
	let fixture: ComponentFixture<PlaylistCreatorComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PlaylistCreatorComponent],
			imports: [MatIconModule, FormsModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(PlaylistCreatorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
