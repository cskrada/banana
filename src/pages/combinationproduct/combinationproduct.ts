import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { constants } from './../../const/const';
import { ProductsPage } from './../products/products';
import { TranslateService } from '@ngx-translate/core';


@IonicPage()
@Component({
  selector: 'page-combinationproduct',
  templateUrl: 'combinationproduct.html',
})
export class CombinationproductPage {
  
  myForm: FormGroup;
  
  public product : any []=[];
  public resources : any []=[];
  public manufacturers : any []=[];
  public categories : any []=[];
  public taxes : any []=[];
  public units : any []=[];
  public conditions : any []=[];
  public attributes : any []=[];
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
  public attribute_id: any = null;
  public product_details : any []=[];
  public attribute_details: any = null;

  public attributes_selected: any = null;
  public array_details: Array<any>;
  public attributes_o: any []=[];
  public post_ded : Array<any> = [];

  public items: any;
  public session_org: any;
  public type_products: any[];
  public type: any = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public http: HttpClient,
              public viewCtrl: ViewController,
              public toastCtrl: ToastController,
              public translateService: TranslateService,) {
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
    this.getResource();

    this.session_org=sessionStorage.getItem('organization_id');

    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      reference: [''],
      description: [''],
      type: [''],
      is_salable: [''],
      is_purchasable: [''],
      manufacture_id: [''],
      category_id: [''],
      unit_id: [''],
      tax_id: [''],
      is_combination: 1,
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

      console.log(this.myForm);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CombinationproductPage');
  }

  generate(){
    // console.log('generate',this.attributes_selected);
    let me = this;
    let attributes_selected_group:any=[];
    let name_group = '';
    let index = -1;
    let combinations = [];

    function allPossibleCases(arr) {
      if (arr.length == 1) {
        return arr[0];
      } else {
        var result = [];
        var allCasesOfRest = allPossibleCases(arr.slice(1));  // recur with the rest of array
        for (var i = 0; i < allCasesOfRest.length; i++) {
          for (var j = 0; j < arr[0].length; j++) {   
            result.push(arr[0][j] + ',' + allCasesOfRest[i]);
          }
        }
        for (var k = 0; k < result.length; ++k) {          
          result[k] = result[k].split(',');
        }
        return result;
      }
    }

    for (let i = 0; i < this.attributes_selected.length; i++) {
      for (let j = 0; j < this.attributes_o.length; j++) {
        for (let k = 0; k < this.attributes_o[j].children.length; k++) {
          if ( this.attributes_o[j].children[k].id == this.attributes_selected[i] ) {            
            if ( name_group != this.attributes_o[j].text ) {              
              name_group = this.attributes_o[j].text;
              index++;
              attributes_selected_group[index] = [];
              attributes_selected_group[index].push(String(this.attributes_o[j].children[k].id));
            } else {
              attributes_selected_group[index].push(String(this.attributes_o[j].children[k].id));
            }
          }
        }
      }
    }

    combinations = allPossibleCases(attributes_selected_group);

    combinations.forEach( function (attributes) {
        if (!Array.isArray(attributes))
        me.newDetail([attributes]);
        else
        me.newDetail(attributes);
    });

    // console.log('detalles',this.post_ded);
  }

  newDetail (attributes: Array<any>) {
    
    function newElement(me) {
      let detail: any = {};
        detail.id  = 0;
        detail.reference  = '';
        detail.product_id  = 0;
        detail.name  = '';
        detail.sku  = '';
        detail.ean13  = '';
        detail.upc  = '';
        detail.cost  = '';
        detail.sale_price  = '';
        detail.condition_id  = null;
        detail.price_list_id  = null;
        detail.archived  = 0;
        detail.image  = null;
        detail.attribute_details = [];
        detail.edit  = false;
        detail.more  = false;
      
      detail.attribute_details = attributes;
      me.post_ded.unshift(detail);
    }

    newElement(this);
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
      this.attributes = data['attributes_d'];
      this.attributes_o = data['attributes'];
      // console.log(this.attributes);
    }, error => {
      console.log(error);
    });
  }
  
  close(){
    this.viewCtrl.dismiss();
    this.navCtrl.setRoot(ProductsPage); 
  }

  postCombinationProduct(){
    let body = this.myForm.value;
    body.product_details = this.post_ded;
    console.log(body);
    
    this.http.post(constants.apipostproduct,
      body,
      { headers: new HttpHeaders()
        .set('authorization', 'http://localhost:4200')
        .append('app', 'BananaApp')
        .append('organization', sessionStorage.getItem('organization_id') )
        .append('user', sessionStorage.getItem('user'))
        .append('Access-Control-Allow-Origin', '*')
        .append('token', sessionStorage.getItem('token'))
      }).subscribe ( data=> {
        this.product = data['product_id'];
        this.product_details = data['product_details_ids'];     
        // console.log(this.product);
        // console.log(this.product_details);

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


}
