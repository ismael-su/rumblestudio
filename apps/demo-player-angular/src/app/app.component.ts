import { Component } from '@angular/core';
import { Song } from '@rumblestudio/player-service';
import { AudioService } from './audio.service';

@Component({
  selector: 'rumblestudio-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'demo-player-angular';

  constructor(private audioService: AudioService) {}

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
