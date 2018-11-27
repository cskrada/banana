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
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.name = sessionStorage.getItem('name');
    this.email = sessionStorage.getItem('email');
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad');
  }



}
