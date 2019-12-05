import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { constants } from './../../const/const';
import { TranslateService } from '@ngx-translate/core';
import 'rxjs/add/operator/debounceTime';

@IonicPage()
@Component({
  selector: 'page-modalproducts',
  templateUrl: 'modalproducts.html',
})

export class ModalproductsPage {
  
  data: any;
  list: any;
  rate: any;
  ware: any;

  products: any;
  quantity: any; 
  product: Array<any>=[];
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public http: HttpClient,
    public translateService: TranslateService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
      
      this.data = this.navParams.data;
      this.list = this.navParams.get('lis');
      this.list = this.list['id'];
      this.rate = this.navParams.get('tax');
      this.rate = this.rate['rate'];
      this.ware = this.navParams.get('war');
      this.ware = this.ware['id'];
      
      console.log(this.data);
      console.log('id',this.list);
      console.log('id',this.rate);
      console.log('id',this.ware);
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

      return this.http.get(constants.apisearchproducts,
        { headers: new HttpHeaders()
          .set('authorization', sessionStorage.getItem('dns'))
          .append('app', 'BananaApp')
          .append('organization', sessionStorage.getItem('organization_id') )
          .append('user', sessionStorage.getItem('user'))
          .append('Access-Control-Allow-Origin', '*')
          .append('token', sessionStorage.getItem('token')),
          params: new HttpParams()
            .set('filter', '')
            .set('warehouse_id', this.ware)
            .set('price_list_id', this.list)
            .set('tax_alternative', this.rate)
        }).subscribe ( data=> {
          loading.dismissAll();
          this.products = data['products'];

          for (let index = 0; index < this.products.length; index++) {
            this.products[index].quantity = 0;            
          }

          // console.log('THIS',this.products);
        }, error => {
          console.log(error);
      });
    });
  }

  buscar(event){
    let search = event.target.value;
    console.log(search);   
    
    return this.http.get(constants.apisearchproducts,
      { headers: new HttpHeaders()
        .set('authorization', sessionStorage.getItem('dns'))
        .append('app', 'BananaApp')
        .append('organization', sessionStorage.getItem('organization_id') )
        .append('user', sessionStorage.getItem('user'))
        .append('Access-Control-Allow-Origin', '*')
        .append('token', sessionStorage.getItem('token')),
        params: new HttpParams()
            .set('filter', search)
            .set('warehouse_id', this.ware)
            .set('price_list_id', this.list)
            .set('tax_alternative', this.rate)
      }).subscribe ( data=> {
        
        this.products = data['products'];

        for (let index = 0; index < this.products.length; index++) {
          this.products[index].quantity = 0;            
        }

        console.log('THIS',this.products);
      }, error => {
        console.log(error);
    });
  }

  cerrar(p){
    let prompt = this.alertCtrl.create({
      title: p.name,
      message: p.reference,
      inputs: [
        {
          name: 'quantity',
          placeholder: 'cantidad',
          type: 'number',
          value: p.quantity
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            p.quantity = data.quantity;
            console.log(p);
          }
        }
      ]
    });
    prompt.present();
   
  }

  close(w){
    for (let index = 0; index < this.products.length; index++) {
      if ( this.products[index].quantity > 0 ) {
        this.product.push(this.products[index]);
      }
    }
    console.log(this.product)
    this.viewCtrl.dismiss(this.product);
  }
}
