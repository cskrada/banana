import { constants } from './../../const/const';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@IonicPage()
@Component({
  selector: 'page-seeproduct',
  templateUrl: 'seeproduct.html',
})
export class SeeproductPage {

  category: any [] = [];
  id_cat : any;
  categories: any[] = [];
  productDetails: any[] = [];
  producto: any[] = [];
  product: any[] = [];
  id: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    
    this.product = this.navParams.data;
    console.log('navparams de producto',this.product);
    this.id = this.navParams.get('id');
    this.id_cat = this.navParams.get('category_id');
    console.log( 'id de categoria',this.id_cat);
  }

  ionViewDidLoad() {
    this.getProduct();
  }

  notificationSelect() {
    console.log('STP selected');
  }

  getProduct(){
    return this.http.get(constants.apiseeproduct+this.id,
      { headers: new HttpHeaders()
        .set('authorization', 'http://localhost:4200')
        .append('app', 'BananaApp')
        .append('user', sessionStorage.getItem('user'))
        .append('Access-Control-Allow-Origin', '*')
        .append('token', sessionStorage.getItem('token'))
      }).subscribe ( data=> {
        this.producto = data['product'];
        this.productDetails = data['product_details'];
        this.categories = data['categories'];
        for (let cat of this.categories){
          if ( this.id_cat == cat.id){
            this.category = cat.text;
          }
        }
        console.log(this.category);
      }, error => {
        console.log(error);
    });
  }

}
