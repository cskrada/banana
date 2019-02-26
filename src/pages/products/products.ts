import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { constants } from './../../const/const';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { SeeproductPage } from './../seeproduct/seeproduct';
import { AddproductPage } from './../addproduct/addproduct';

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
  view: string = "list";
  isAndroid: boolean = false;
  public id : any ;
  // public products : any[] = [];
  public productos : any[] = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient) {
  //  this.items();

  }
  // items(){
  //   this.products=[
  //     {
  //       id : '1',
  //       img : 'calabaza.jpg',
  //       title : 'Lampara',
  //       detail : 'Lorem ipsum dolor sit amet consectetur'
  //     },
  //     {
  //       id : '2',
  //       img : 'icon.png',
  //       title : 'Cama',
  //       detail : 'Lorem ipsum dolor sit amet consectetur'
  //     },
  //     {
  //       id : '3',
  //       img : 'bananaApp.png',
  //       title : 'Huawei',
  //       detail : 'Lorem ipsum dolor sit amet consectetur'
  //     },
  //     {
  //       id : '4',
  //       img : 'icon.png',
  //       title : 'Cuchillos de plastico',
  //       detail : 'Lorem ipsum dolor sit amet consectetur'
  //     },
  //     {
  //       id : '5',
  //       img : 'bananaApp.png',
  //       title : 'Platos de acero',
  //       detail : 'Lorem ipsum dolor sit amet consectetur'
  //     }
  //   ]
  // }

  ionViewDidLoad() {
    this.getProducts();
  }

  getProducts(){
    return this.http.get(constants.apiproducts,
      { headers: new HttpHeaders()
        .set('authorization', 'http://localhost:4200')
        .append('app', 'BananaApp')
        .append('user', sessionStorage.getItem('user'))
        .append('Access-Control-Allow-Origin', '*')
        .append('token', sessionStorage.getItem('token'))
      }).subscribe ( data=> {
        this.productos = data['products'];
        console.log('data products: ', this.productos);
      }, error => {
        console.log(error);
    });
  }

  seeProduct(p){
    this.navCtrl.push(SeeproductPage, p);
  }  

  addProduct(){
    this.navCtrl.push(AddproductPage);
  }

}
