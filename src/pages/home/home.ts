import { Component } from '@angular/core';
import { NavController, LoadingController,ActionSheetController } from 'ionic-angular';
import { MusicProvider } from '../../providers/music/music'
import { SocialSharing } from '@ionic-native/social-sharing'
import { MusicPlayerPage } from '../music-player/music-player'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public allMusic = [];

  constructor(public navCtrl: NavController, 
              private musicProvider: MusicProvider, 
              private loadingController: LoadingController,
              private actionSheetController: ActionSheetController,
              private socialSharing: SocialSharing) {
    
  }

  ionViewDidLoad(){
    let allMusicLoadingController = this.loadingController.create({
      content: "Getting your Music from server"
    });
    allMusicLoadingController.present();
    this.musicProvider.getMusic()
      .subscribe((musicList) => {
        allMusicLoadingController.dismiss();
        this.allMusic = musicList
      });
  }

  addOneSong(refresher){
    this.musicProvider.getOneSong()
    .subscribe(oneSong => {
      this.allMusic.unshift(oneSong[0]);
      refresher.complete();
    });
  }

  shareSong(music){
    let shareSongActionSheet = this.actionSheetController.create({
      title: "Share Song with Friends",
      buttons: [
        {
          text: "Share on Facebook",
          icon: "logo-facebook",
          handler: () =>{
            this.socialSharing.shareViaFacebook(music.name, music.image, music.music_url);
          }
          
        },
        {
          text: "Share on twitter",
          icon: "logo-twitter",
          handler: () =>{
            this.socialSharing.shareViaTwitter(music.name, music.image, music.music_url);
          }
        },
        {
          text: "Share",
          icon: "share",
          handler: ()=>{
            this.socialSharing.share(music.name, "", music.image, music.image_url);
          }
        },
        {
          text: "Cancel",
          role: "destructive"
        }
      ]
    });
    shareSongActionSheet.present();
  }

  goToMusicPlayer(music){
    this.navCtrl.push(MusicPlayerPage,{
      music: music
    });
  }

  addToFavorites(music){
    this.musicProvider.addToFavorites(music);
    console.log("Added to favorites in home");
  }

}
