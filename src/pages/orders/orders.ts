import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductPage } from './../product/product';

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {
  public products : any[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
   this.items();
  }

  items(){
    this.products=[
      {
        id : '1',
        img : 'calabaza.jpg',
        precio : 'bsS 1400',
        detail : 'Lorem ipsum dolor sit amet consectetur'
      },
      {
        id : '2',
        img : 'icon.png',
        precio : 'bsS 520',
        detail : 'Lorem ipsum dolor sit amet consectetur'
      },
      {
        id : '3',
        img : 'bananaApp.png',
        precio : 'bsS 1000',
        detail : 'Lorem ipsum dolor sit amet consectetur'
      },
      {
        id : '4',
        img : 'icon.png',
        precio : 'bsS 9940',
        detail : 'Lorem ipsum dolor sit amet consectetur'
      },
      {
        id : '5',
        img : 'bananaApp.png',
        precio : 'bsS 8999',
        detail : 'Lorem ipsum dolor sit amet consectetur'
      },
      {
        id : '6',
        img : 'calabaza.jpg',
        precio : 'bsS 9400',
        detail : 'halloween'
      },
      {
        id : '7',
        img : 'icon.png',
        precio : 'bsS 200',
        detail : 'Lorem ipsum dolor sit amet consectetur'
      },
      {
        id : '8',
        img : 'bananaApp.png',
        precio : 'bsS 10940',
        detail : 'Lorem ipsum dolor sit amet consectetur'
      }
    ]
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
  }

  product(){
    this.navCtrl.push(ProductPage);
  }

}
