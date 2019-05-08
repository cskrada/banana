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
  image: any;
  attributes: any []= [];
  resources: any []= [];
  test:  any []= []; 

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    
    this.product = this.navParams.data;
    // console.log('navparams de producto',this.product);
    this.id = this.navParams.get('id');
    this.id_cat = this.navParams.get('category_id');
    // console.log( 'id de categoria',this.id_cat);
    this.getProduct();
    this.getResource();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad seeproduct');
  }

  notificationSelect() {
    console.log('STP selected');
  }

  getProduct(){
    return this.http.get(constants.apiseeproduct+this.id,
      { headers: new HttpHeaders()
        .set('authorization', 'http://localhost:4200')
        .append('app', 'BananaApp')
        .append('organization', '1' )
        .append('user', sessionStorage.getItem('user'))
        .append('Access-Control-Allow-Origin', '*')
        .append('token', sessionStorage.getItem('token'))
      }).subscribe ( data=> {
        this.producto = data['product'];
        this.productDetails = data['product_details'];
        this.categories = data['categories'];
        this.test = data['product_details'][0].image;
        // console.log('tessssst see product', this.test);

        if (this.test != null){
          this.image = constants.apiimage+data['product_details'][0].image;
        }else{
          this.image = 'assets/imgs/products.jpeg';
        }

        for (let cat of this.categories){
          if ( this.id_cat == cat.id){
            this.category = cat.text;
          }
        }
        // console.log('producto',this.producto);
        // console.log('product',this.product);
        // console.log('productoDetails',this.productDetails);
        // console.log('image',this.image);
        // console.log('teeeesst img',this.test);
      }, error => {
        console.log(error);
    });
  }

  getResource(){
    return this.http.get(constants.resources,
      { headers: new HttpHeaders()
      .set('authorization', 'http://localhost:4200')
      .append('app', 'BananaApp')
      .append('organization', sessionStorage.getItem('organization_id') )
      .append('user', sessionStorage.getItem('user'))
      .append('Access-Control-Allow-Origin', '*')
      .append('token', sessionStorage.getItem('token'))
    }).subscribe ( data=> {
      this.resources = data['resources'];
      this.attributes = data['attributes_d'];
      // console.log(this.attributes);
    }, error => {
      console.log(error);
    });
  }
}
