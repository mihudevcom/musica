import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'

/*
  Generated class for the MusicProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const API: string = "http://orangevalleycaa.org/api/music";
@Injectable()
export class MusicProvider {
  public favoriteSongs = [];

  constructor(public http: Http) {
    console.log('Hello MusicProvider Provider');
  }

  getMusic(){
    return this.http.get(API).map(response => response.json());
  }

  getOneSong(){
    let oneSongUrl = API + "/qty/1";
    return this.http.get(oneSongUrl)
    .map(response => response.json());
  }

  addToFavorites(song){
    let isSongAdded = this.favoriteSongs.findIndex((favoriteSong) => {
      return song.id === favoriteSong.id
    });

    if(isSongAdded === -1){
      this.favoriteSongs.push(song);
      console.log("Added to favorites in music provider");
    }
  }

  getFavorites(){
    return this.favoriteSongs;
  }

}
