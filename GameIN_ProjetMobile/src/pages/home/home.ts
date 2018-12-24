import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(private afAuth: AngularFireAuth, private toast: ToastController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid) {
        this.toast.create({
          message:'Welcome to GameIn, ${data.email}',
          duration: 3000
        }).present();
      }
      else{
        this.toast.create({
          message:'Could not find authentification details, ${data.email}',
          duration: 3000
        }).present();
      }
      });

  }

}
