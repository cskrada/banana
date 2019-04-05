import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, NavParams } from 'ionic-angular';
import { constants } from './../../const/const';
import { TranslateService } from '@ngx-translate/core';
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
  
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              public loadingCtrl: LoadingController,
              public translateService: TranslateService) {

  }


  ionViewDidLoad() {
    this.getProducts();
  }

  getProducts(){
    this.translateService.get('Por favor espere...').subscribe(
      value => {
        let content = value;
        let loading = this.loadingCtrl.create({
          content: content
          });
        loading.present();

      return this.http.get(constants.apiproducts,
        { headers: new HttpHeaders()
          .set('authorization', 'http://localhost:4200')
          .append('app', 'BananaApp')
          .append('organization', '1' )
          .append('user', sessionStorage.getItem('user'))
          .append('Access-Control-Allow-Origin', '*')
          .append('token', sessionStorage.getItem('token'))
        }).subscribe ( data=> {
          loading.dismissAll();
          this.productos = data['products'];
          console.log('data products: ', this.productos);
        }, error => {
          console.log(error);
      });
    });
  }

  seeProduct(p){
    this.navCtrl.push(SeeproductPage, p);
  }  

  addProduct(){
    this.navCtrl.push(AddproductPage);
  }

}
