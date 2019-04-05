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
  public products : any []=[];
  public manufacture : any = 0;
  public category : any = 0;
  public unit : any = 0;
  public tax : any = 0;
  public condition : any = 0;
  is_salable : any = false;
  is_purchasable : any = false;
  manufacture_id: any = 0;
  category_id: any = 0;
  unit_id: any = 0;
  tax_id: any = 0;
  condition_id: any = 0;
  // 
  public product_details : any []=[];
  public sale_price : any = 0;
  public cost : any = 0;

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
    condition_id: [''],
    reference_detail: [''],
    product_details: {
      reference: [''],
      name: [''],
      sku: [''],
      ean13: [''],
      upc: [''],
      cost: [''],
      sale_price: [''],
      image: [''],

      



    }

  })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SimpleproductPage');
    this.getResource();
    // this.postProductDetail();
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
      // console.log('condiciones', this.conditions);
    }, error => {
      console.log(error);
  });
  }

  postProductDetail(){
    let body =  this.myForm.value;
    console.log(this.myForm);

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
        this.products = data['products'];
        this.product_details = data['products'].products.products_details;
        console.log(this.products);
        console.log(this.product_details);
        // this.product_details = data['products']
        // console.log('productos', this.products);
      }, error => {
        console.log(error);
    });
  }
// products
  // "id": 1,
  // "detail_id": 1,
  // "reference": null,
  // "name": null,
  // "product_name": "",
  // "description": "DVDR DL 8.5GB240MIN8X PACK 10",
  // "sku": null,
  // "ean13": "7896541231590",
  // "upc": null,
  // "cost": 689.07,
  // "sale_price": 689.07,
  // "condition_id": null,
  // "image": null,
  // "price_list_id": null,
  // "archived": 0,
  // "created_at": "0000-00-00 00:00:00",
  // "updated_at": "0000-00-00 00:00:00",
  // "attribute_details": []


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
