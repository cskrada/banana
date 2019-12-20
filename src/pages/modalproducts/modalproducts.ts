import { SearchPipe } from './../../pipes/search/search';
import { state } from '@angular/animations';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { constants } from './../../const/const';
import { TranslateService } from '@ngx-translate/core';
import 'rxjs/add/operator/debounceTime';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';

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

  state = {value: ''};
  products: any;
  quantity: any; 
  product: Array<any>=[];
  arr_product: Array<any>;
  
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
      this.arr_product = this.navParams.get('product');

      
      console.log(this.data);
      console.log('id',this.list);
      console.log('id',this.rate);
      console.log('id',this.ware);
      console.log('arreglo de PRODUCTOS desde addordersale',this.arr_product);

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
            if(this.arr_product.length == 0){
              for (let index = 0; index < this.products.length; index++) {
                this.products[index].quantity = 0; 
              }
            }else{
              for (let index = 0; index < this.products.length; index++) {
                for (let x = 0; x < this.arr_product.length; x++) {
                  if( this.products[index].reference == this.arr_product[x].reference ){
    
                    console.log('produtcs', this.products[index].reference, 'arr', this.arr_product[x].reference);
                    this.products[index].quantity = this.arr_product[x].quantity;
                    // console.log('khabsfbaskfbaksbf',this.arr_product[x].quantity);
                  }else{
                  }
                }
              }
            }
          }, error => {
            console.log(error);
        });
    
      });
  }

  buscar(event){
    let search;
    search = event.target.value;
    console.log(search);

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
                .set('filter', search)
                .set('warehouse_id', this.ware)
                .set('price_list_id', this.list)
                .set('tax_alternative', this.rate)
          }).subscribe ( data=> {
            loading.dismissAll();
            this.products = data['products'];
            if(this.arr_product.length == 0){
              for (let index = 0; index < this.products.length; index++) {
                this.products[index].quantity = 0; 
              }
            }else{
              for (let index = 0; index < this.products.length; index++) {
                for (let x = 0; x < this.arr_product.length; x++) {
                  if( this.products[index].reference == this.arr_product[x].reference ){
                    
                    console.log('produtcs', this.products[index].reference, 'arr', this.arr_product[x].reference);
                    this.products[index].quantity = this.arr_product[x].quantity;
                    console.log('khabsfbaskfbaksbf',this.arr_product[x].quantity);
                  }else{
                  }
                }
              }
            }
            
          }, error => {
            console.log(error);
        });
        
      });
  }

  cerrar(p){

		this.translateService.get('AlertaModalProducts').subscribe( 
			value=>{
				let input = value['InputPlaceholder'];
				let buttonCancel = value['BotonCancelar'];
				let buttonGuardar = value['BotonGuardar'];

				let prompt = this.alertCtrl.create({
          title: p.name,
          message: p.reference,
          inputs: [
            {
              name: 'quantity',
              placeholder: input,
              type: 'number',
              value: p.quantity
            },
          ],
          buttons: [
            {
              text: buttonCancel,
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: buttonGuardar,
              handler: data => {
                p.quantity = data.quantity;
                console.log(p);
              }
            }
          ]
				});
				prompt.present();
			});
   
  }

  close(){
    for (let index = 0; index < this.products.length; index++) {
      if ( this.products[index].quantity > 0 ) {
        this.product.push(this.products[index]);
      }
    }

    // this.arr_product = this.product;

    console.log('close', this.product);
    this.viewCtrl.dismiss(this.product);
  }



// for (let index = 0; index < this.products.length; index++) {
//   this.products[index].quantity = 0;            
// }
// console.log('THIS buscar',this.products);
}
