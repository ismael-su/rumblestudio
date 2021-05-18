# @rumbleplayer/player-service

**Rumble Player** is an open source HTML5 audio player
It contains all the logic to play sound (from an url, a playlist object, an RSS feed, ...), with all the common methods (next, prev, shuffle, volume controls...) and a few extra features (preload, event callbacks, ...)

## Install

Install the package `@rumblestudio/player-service`:

```shell
npm install @rumblestudio/player-service
```

Note: The service has [HowlerJS](https://howlerjs.com/) <img width="100" src="https://howlerjs.com/assets/images/logo.svg"> as a dependency, a javascript library for audio manipulation and UUID to generate some unique ID for playlist processes.

## Usage

### Angular

To use the library within your Angular project the best way is to use an Angular Service

1. Create an angular project with a service

```shell
npm install -g @angular/cli # install Angular
ng new demo-player-angular # Create a new Angular app
cd demo-player-angula
ng g s audio # generate a service
```

2. Install the Rumble Player Service package:

```shell
npm install @rumblestudio/player-service
```

3. Import the Rumble Player Service into the Angular service. You can extends the Angular service class from Rumble Player Service or you can create a property `this.player = new PlayerService()`. The following example use the "extends" option:

In the file `demo-player-angular/src/app/audio.service.ts`:

```typescript
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
    this.addNewOnCallback(this.on);
  }
  private on(event: PlayerServiceEvent) {
    // We convert the events into RxJS behaviour subject
    // so that you can subscribe to them the way you want.
    console.log('[audioService](on) new event:', event);
    this.playing$.next(this.isPlaying);
    this.index$.next(this.index);
    this.position$.next(this.position);
    this.percentage$.next(this.percentage);
  }
}
```

All events will trigger the `on` method in this example (new playlist, play, pause,...). You can filter on the event.type property, debounce the observables (see [debounceTime](https://rxmarbles.com/#debounceTime)) or filter if not distinct (see [distinctUntilChanged](https://rxmarbles.com/#distinctUntilChanged)) to avoid unnecessary observable triggers.

**A list of events is available further.**

4. Once you have an Angular service you can inject it in your components (for example in app.component.ts):

```typescript
import { Component } from '@angular/core';
import { AudioService } from './audio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-rumble-player';

  constructor(private audioService:AudioService){
    ...
  }
}
```

5. Give something to play to your service:

```typescript
//...
export class AppComponent {
  //...

  loadSomeMusic() {
    // method 1
    // from a list of audio urls
    const urls = [
      'https://example.com/myAudioFile_1.mp3',
      'https://example.com/myAudioFile_2.wav',
      'https://example.com/myAudioFile_3.flac',
    ];
    this.audioService.setPlaylistFromUrls(urls);

    // method 2
    // from a list of dict
    const songs: Partial<Song>[] = [
      {
        songTitle: 'my first song',
        file: 'https://example.com/myAudioFile_1.mp3',
        author: 'John Doe',
        songCover: 'https://example.com/cover_1.jpg',
        albumTitle: 'my amazing album',
      },
      //...
    ];
    this.audioService.setPlaylistFromSongObjects(songs);

    // method 3
    // from a RSS feed URL
    const url =
      'https://www.omnycontent.com/d/playlist/2e6498c5-ff94-4726-ba20-ad1000f32d21/2bed1e53-84f7-4f9a-9071-ad1000f84f8f/5d9318ee-dcf8-4337-ae15-ad1000f97d0c/podcast.rss';
    this.audioService.setPLaylistFromRSSFeedURL(url);
  }

  play() {
    this.audioService.play();
  }
}
```

and call those methods as you like from app.component.html:

```html
<button (click)="loadSomeMusic()">load</button>
<button (click)="play()">play</button>
```

**A list of all methods is available further.**

### React

**_not done yet_**

### Vue

**_not done yet_**

### Vanilla HTML

**_not done yet_**

## Other open source players

## Support

This library is actively supported by Rumble Studio who helps to create audio content. Check it out: [Rumble Studio](https://rumble.studio)

<img src="https://rumblestudio.app/assets/rs-logos/classic-reversed.svg">
