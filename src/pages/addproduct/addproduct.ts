import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SimpleproductPage } from './../simpleproduct/simpleproduct';
import { CombinationproductPage } from './../combinationproduct/combinationproduct';


@IonicPage()
@Component({
  selector: 'page-addproduct',
  templateUrl: 'addproduct.html',
})
export class AddproductPage {
  constructor(public navCtrl: NavController,
              public navParams: NavParams) {

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad AddproductPage');
  }

  simpleProduct(){
    this.navCtrl.push(SimpleproductPage);
  }

  combinationProduct(){
    this.navCtrl.push(CombinationproductPage);
  }

}
