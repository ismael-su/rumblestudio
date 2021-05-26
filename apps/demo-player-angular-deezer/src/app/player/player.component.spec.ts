import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';

import { PlayerComponent } from './player.component';

describe('PlayerComponent', () => {
	let component: PlayerComponent;
	let fixture: ComponentFixture<PlayerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PlayerComponent],
			imports: [MatIconModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(PlayerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
