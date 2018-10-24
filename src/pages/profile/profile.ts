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
  public name: any;
  public user: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user= this.navParams.data;
    this.email = this.user[0].user[0].email;
    this.name = this.user[0].user[0].contact_id.name;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }



}
