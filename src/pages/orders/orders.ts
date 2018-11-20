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
        detail : 'la calabaza ionica hula hula'
      },
      {
        id : '2',
        img : 'icon.png',
        precio : 'bsS 520',
        detail : 'icono de wallpaper'
      },
      {
        id : '3',
        img : 'bananaApp.png',
        precio : 'bsS 1000',
        detail : 'banana app image de aplicacion'
      },
      {
        id : '4',
        img : 'icon.png',
        precio : 'bsS 9940',
        detail : 'icono de banana para web'
      },
      {
        id : '5',
        img : 'bananaApp.png',
        precio : 'bsS 8999',
        detail : 'mercado de coche.... jiji'
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
        detail : 'icono para paginas web'
      },
      {
        id : '8',
        img : 'bananaApp.png',
        precio : 'bsS 10940',
        detail : 'cambures a 50 el kilo oferta'
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
