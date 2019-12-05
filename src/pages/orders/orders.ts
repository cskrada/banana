import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/debounceTime';
import { constants } from './../../const/const';
import { SeesaleorderPage } from './../seesaleorder/seesaleorder';
import { AddordersalePage } from './../addordersale/addordersale';
// import { ProductPage } from './../product/product';

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {
  items = [
    'Pokémon Yellow',
    'Super Metroid',
    'Mega Man X',
    'The Legend of Zelda',
    'Pac-Man',
    'Super Mario World',
    'Street Fighter II',
    'Half Life',
    'Final Fantasy VII',
    'Star Fox',
    'Tetris',
    'Donkey Kong III',
    'GoldenEye 007',
    'Doom',
    'Fallout',
    'GTA',
    'Halo'
  ];

  ordersale: any;


  // public products : any[] = [];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public translateService: TranslateService) {
  //  this.items();
  }
                  
  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
  }
  itemSelected(item: string) {
    console.log("Selected Item", item);
  }

  ionViewDidEnter(){
		this.getSaleOrder();
  }
  
  order(o){
    this.navCtrl.push(SeesaleorderPage, o);
  }

  getSaleOrder(){
    this.translateService.get('Por favor espere...').subscribe(
      value => {
        let content = value;
        let loading = this.loadingCtrl.create({
          content: content
        });
        loading.present();

        return this.http.get(constants.apiordersale,
        { headers: new HttpHeaders()
          .set('authorization', sessionStorage.getItem('dns'))
          .append('app', 'BananaApp')
          .append('organization', sessionStorage.getItem('organization_id') )
          .append('user', sessionStorage.getItem('user'))
          .append('Access-Control-Allow-Origin', '*')
          .append('token', sessionStorage.getItem('token'))
        }).subscribe ( data=> {
          loading.dismissAll();
          this.ordersale = data;

          // console.log('ordersale', this.ordersale);
        }, error => {
          console.log(error);
        });
    });
  }

  addOrderSale(){
    this.navCtrl.push(AddordersalePage);
  }

  buscar(event){
    let search = event.target.value;
    console.log(search); 

    this.translateService.get('Por favor espere...').subscribe(
      value => {
        let content = value;
        let loading = this.loadingCtrl.create({
          content: content
        });
        loading.present();

        return this.http.get(constants.apisearchorder,
        { headers: new HttpHeaders()
          .set('authorization', sessionStorage.getItem('dns'))
          .append('app', 'BananaApp')
          .append('organization', sessionStorage.getItem('organization_id') )
          .append('user', sessionStorage.getItem('user'))
          .append('Access-Control-Allow-Origin', '*')
          .append('token', sessionStorage.getItem('token')),
          params: new HttpParams()
            .set('search', search)
            .set('type_document', '2')
        }).subscribe ( data=> {
          loading.dismissAll();
          this.ordersale = data;

          // console.log('ordersale', this.ordersale);
        }, error => {
          console.log(error);
        });
    });
  }

}
