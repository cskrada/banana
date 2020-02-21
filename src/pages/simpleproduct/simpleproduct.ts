import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { constants } from './../../const/const';
import { TranslateService } from '@ngx-translate/core';
import { ProductsPage } from './../products/products';


@IonicPage()
@Component({
  selector: 'page-simpleproduct',
  templateUrl: 'simpleproduct.html',
})
export class SimpleproductPage {
  myForm: FormGroup;

  public resources : any []=[];
  public manufacturers : any []=[];
  public categories : any []=[];
  public taxes : any []=[];
  public units : any []=[];
  public conditions : any []=[];
  public product : any []=[];
  public manufacture : any = 0;
  public category : any = 0;
  public unit : any = 0;
  public tax : any = 0;
  public condition : any = 0;
  public is_salable : boolean=false;
  public is_purchasable : boolean=false;
  public manufacture_id: any = null;
  public category_id: any = null;
  public unit_id: any = null;
  public tax_id: any = null;
  public condition_id: any = null;
  public price_list_id: any = null;
  public product_details : any []=[];
  public session_org: any;
  public type_products: any[];
  public type: any = null;
  public reference: any = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public http: HttpClient,
              public translateService: TranslateService,
              public toastCtrl: ToastController,
              public viewCtrl: ViewController) {

    this.translateService.get('TipoProducto').subscribe(
      value => {
        let stock = value['Stock'];
        let servicio = value['Servicio'];
        let consumible = value['Consumible'];

        this.type_products = [
          {
            id : 'P',
            text : stock
          },
          {
            id : 'S',
            text : servicio
          },
          {
            id : 'C',
            text : consumible
          }
        ];
    });
    console.log('this.type_products', this.type_products);
    this.getResource();

    this.session_org=sessionStorage.getItem('organization_id')
    
    this.myForm = this.formBuilder.group({
    name: ['', Validators.required],
    reference: ['', Validators.required],
    description: [''],
    type: [''],
    is_salable: [''],
    is_purchasable: [''],
    manufacture_id: [''],
    category_id: [''],
    unit_id: [''],
    tax_id: [''],
    is_combination: 0,
    archived: 0,
    organizations: [[this.session_org]], 
    product_details: this.formBuilder.group({
      reference: [''],
      name: [''],
      sku: [''],
      ean13: [''],
      upc: [''],
      cost: [''],
      sale_price: [''],
      image: [''],
      condition_id: [''],
      price_list_id: [''],
      attribute_details: this.formBuilder.array([])
      })
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SimpleproductPage');
  }

  getResource(){
    return this.http.get(constants.resources,
      { headers: new HttpHeaders()
      .set('authorization', sessionStorage.getItem('dns'))
      .append('app', 'BananaApp')
      .append('organization', sessionStorage.getItem('organization_id') )
      .append('user', sessionStorage.getItem('user'))
      .append('Access-Control-Allow-Origin', '*')
      .append('token', sessionStorage.getItem('token'))
    }).subscribe ( data=> {
      this.resources = data['resources'];
      this.manufacturers = data['manufacturers'];
      this.categories = data['categories'];
      this.taxes = data['taxes'];
      this.units = data['units'];
      this.conditions = data['conditions'];
      // console.log('manufacturreers', this.manufacturers);
    }, error => {
      console.log(error);
  });
  }

  postProductDetail(){
    let body =  this.myForm.value;
    body.product_details = [body.product_details];

    // body.reference = [body.body.product_details.reference];
    console.log(body);
    console.log(body.reference);
    console.log(body.product_details[0].reference);

    this.http.post(constants.apipostproduct,
      body,
      { headers: new HttpHeaders()
        .set('authorization', sessionStorage.getItem('dns'))
        .append('app', 'BananaApp')
        .append('organization', sessionStorage.getItem('organization_id') )
        .append('user', sessionStorage.getItem('user'))
        .append('Access-Control-Allow-Origin', '*')
        .append('token', sessionStorage.getItem('token'))
      }).subscribe ( data=> {
        this.product = data['product_id'];
        this.product_details = data['product_details_ids'];
        console.log(this.product);
        console.log(this.product_details);

        if (this.product != [0]){
          this.translateService.get('Alerta8').subscribe(
            value => {
              let message = value['MensajeAlerta'];
                const toast = this.toastCtrl.create({
                message: message,
                duration: 3000
                });
            toast.present();
          });
        }
      }, error => {
        console.log(error);
        if (error.ok == false){
          this.translateService.get('Alerta9').subscribe(
            value => {
              let message = value['MensajeAlerta'];
                const toast = this.toastCtrl.create({
                message: message,
                duration: 3000
                });
            toast.present();
          });
        }
    });
  }

  close(){
		this.viewCtrl.dismiss();
		this.navCtrl.setRoot(ProductsPage);
	}
  
}
