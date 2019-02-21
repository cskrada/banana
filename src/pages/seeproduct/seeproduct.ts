import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-seeproduct',
  templateUrl: 'seeproduct.html',
})
export class SeeproductPage {

  product: any[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    this.product = this.navParams.data;
    console.log(this.product);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeeproductPage');
  }

  notificationSelect() {
    console.log('STP selected');
  }

}
