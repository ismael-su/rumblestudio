import { Howl } from 'howler';

export interface Song {
  id: string; // unique id to identify the song even when we add new song to the playlist
  file: string;

  songTitle?: string;
  howl?: Howl | null;
  duration?: number | null;
  loaded?: boolean;
  valid?: boolean;
  songCover?: string | null;
  author?: string;
  albumCover?: string;
  albumTitle?: string;
  position?: number | null; // current seeking of position of the howl
  onload?: (song: Song) => void;
}

export interface PlayerState {
  position: number;
  percentage: number;
  index: number;
  playing: boolean;
}

export interface PlayerServiceEvent {
  type: PlayerServiceEventType;
  state: PlayerState;
}

export enum PlayerServiceEventType {
  Play = 'play',
  Pause = 'pause',
  Stop = 'stop',
  Next = 'next',
  Prev = 'prev',
  Seek = 'seek',
  EndOfSong = 'end of song',
  NewPosition = 'new position',
  NewIndex = 'new index',
  PlayError = 'play error',
  LoadError = 'load error',
  NewPlaylist = 'new playlist',
}
