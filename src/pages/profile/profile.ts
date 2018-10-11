import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public email: any;
  public user: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user= this.navParams.data;
    console.log(this.user[0]);
    console.log("user",this.user[0].user[0].email);
    this.email= this.user[0].user[0].email;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }



}
