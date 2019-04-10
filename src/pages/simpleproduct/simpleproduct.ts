import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { constants } from './../../const/const';

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



  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public http: HttpClient) {

    this.myForm = this.formBuilder.group({
    name: ['', Validators.required],
    reference: ['', Validators.required],
    description: ['', Validators.required],
    type: [''],
    is_salable: [''],
    is_purchasable: [''],
    manufacture_id: [''],
    category_id: [''],
    unit_id: [''],
    tax_id: [''],
    is_combination: 0,
    archived: 0,
    organizations: [[1]], 
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
   this.getResource();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SimpleproductPage');
  }

  getResource(){
    return this.http.get(constants.resources,
      { headers: new HttpHeaders()
      .set('authorization', 'http://localhost:4200')
      .append('app', 'BananaApp')
      .append('organization', '1' )
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
    console.log(body);

    this.http.post(constants.apipostproduct,
      body,
      { headers: new HttpHeaders()
        .set('authorization', 'http://localhost:4200')
        .append('app', 'BananaApp')
        .append('organization', '1' )
        .append('user', sessionStorage.getItem('user'))
        .append('Access-Control-Allow-Origin', '*')
        .append('token', sessionStorage.getItem('token'))
      }).subscribe ( data=> {
        this.product = data['product'];
        this.product_details = data['product_details'];
        console.log(this.product);
        console.log(this.product_details);
      }, error => {
        console.log(error);
    });
  }
      //   "id": 0,
  //   "reference": "PRUEBA",
  //   "name": "PRUEBA",
  //   "description": "",
  //   "type": "P",
  //   "is_salable": 1,
  //   "is_purchasable": 1,
  //   "unit_id": null,
  //   "category_id": null,
  //   "manufacture_id": null,
  //   "tax_id": null,
  //   "archived": 0,
  //   "is_combination": 1,
  //   "product_details": [
  //     {
  //       "id": 1056,
  //       "reference": "PRUEBA-44",
  //       "product_id": 0,
  //       "name": "",
  //       "sku": "",
  //       "ean13": "",
  //       "upc": "",
  //       "cost": 0,
  //       "sale_price": 0,
  //       "condition_id": null,
  //       "price_list_id": null,
  //       "archived": 0,
  //       "image": "4YXKi5Ifet3TijUUTSoZzXaWw4NFtJJInkPZGsGK.jpeg",
  //       "attribute_details": [],
  //       "edit": true,
  //       "more": false
  //     }
  
}
