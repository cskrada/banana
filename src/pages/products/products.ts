import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
  public products : any[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
   this.items();

  }
  items(){
    this.products=[
      {
        id : '1',
        img : 'calabaza.jpg',
        title : 'Lampara',
        detail : 'Lorem ipsum dolor sit amet consectetur'
      },
      {
        id : '2',
        img : 'icon.png',
        title : 'Ccama',
        detail : 'Lorem ipsum dolor sit amet consectetur'
      },
      {
        id : '3',
        img : 'bananaApp.png',
        title : 'Huawei',
        detail : 'Lorem ipsum dolor sit amet consectetur'
      },
      {
        id : '4',
        img : 'icon.png',
        title : 'Cuchuillos de plastico',
        detail : 'Lorem ipsum dolor sit amet consectetur'
      },
      {
        id : '5',
        img : 'bananaApp.png',
        title : 'Platos de acero',
        detail : 'Lorem ipsum dolor sit amet consectetur'
      }
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
  }

}
