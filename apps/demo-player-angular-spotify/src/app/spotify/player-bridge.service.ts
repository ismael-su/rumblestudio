import { Injectable } from '@angular/core';
import {  PlayerService, Song, PlayerServiceEvent} from '@rumblestudio/player-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerBridgeService {

  public playerService: PlayerService;
  public playlist: BehaviorSubject<Song[]> = new BehaviorSubject<Song[]>([] as Song[])
  public index: BehaviorSubject<number> = new BehaviorSubject<number>(-1)
  public percentage: BehaviorSubject<number> = new BehaviorSubject(0)
  public position: BehaviorSubject<number> = new BehaviorSubject(0)
  public playing: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  constructor() {
    this.playerService = new PlayerService()
    this.index.next(this.playerService.index);
    this.percentage.next(this.playerService.percentage)
    this.playing.next(this.playerService.isPlaying)
    this.playlist.next([])
    this.playerService.addNewOnCallback((event)=>{this.on(event)})
  }

  private on(event: PlayerServiceEvent){
    switch (event.type) {
      case 'new position':
        this.position.next(this.playerService.position);
        this.percentage.next(this.playerService.percentage);
        break;
      case 'new playlist':
        this.playlist.next(this.playerService.playlist);
        break;
      case 'new index':
        this.index.next(this.playerService.index);
        break;
      case 'seek':
        this.position.next(this.playerService.position);
        this.percentage.next(this.playerService.percentage);
        break;
      case 'play error':
        this.playing.next(this.playerService.isPlaying)
        break;
      case 'load error':
        this.playing.next(this.playerService.isPlaying)
        break;
      default:
        this.playing.next(this.playerService.isPlaying);
        this.index.next(this.playerService.index);
        this.position.next(this.playerService.position);
        this.percentage.next(this.playerService.percentage);
    }
  }


  play(index?:number){
    if(index !== undefined){
      this.playerService.play(index)
    } else {
      this.playerService.play()
    }
  }
  pause(options?: {index?: number, pauseOthers?: boolean}){
    if(options){
      this.playerService.pause()
    } else {
      this.playerService.pause()
    }
  }
  prev(){
    this.playerService.prev()
  }
  next(){
    this.playerService.next()
  }
  stop(index?:number){
    if(index !== undefined){
      this.playerService.stop(index)
    } else {
      this.playerService.stop()
    }
  }

  seekPerPercentage(percentage: number) {
    this.playerService.seekPerPercentage(percentage)
  }

  seekForJump(e: CustomEvent) {
    const { jump } = e.detail;
    const position = this.playerService.position;
    const newPosition = jump + position;
    this.playerService.seekPerPosition(newPosition);
  }

  setPlaylistFromUrls(urls: string[]) {
    this.playerService.setPlaylistFromUrls(urls)
  }

  setPLaylistFromRSSFeedURL(url: string) {
    this.playerService.setPLaylistFromRSSFeedURL(url)
  }
}
