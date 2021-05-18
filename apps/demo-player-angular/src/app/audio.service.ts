import { Injectable } from '@angular/core';
import {
  Song,
  PlayerService,
  PlayerServiceEvent,
} from '@rumblestudio/player-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AudioService extends PlayerService {
  public playlist$: BehaviorSubject<Song[]> = new BehaviorSubject<Song[]>([]);
  public index$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  public percentage$: BehaviorSubject<number> = new BehaviorSubject(0);
  public position$: BehaviorSubject<number> = new BehaviorSubject(0);
  public playing$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor() {
    super(); // needed as this class extends the Rumble Player Service
    this.addNewOnCallback((event: PlayerServiceEvent) => this.on(event));
  }

  on(event: PlayerServiceEvent) {
    // We convert the events into RxJS behaviour subject
    // so that you can subscribe to them the way you want.
    console.log('[audioService](on) new event:', event, this);
    this.playing$.next(this.isPlaying);
    this.index$.next(this.index);
    this.position$.next(this.position);
    this.percentage$.next(this.percentage);
  }
}
