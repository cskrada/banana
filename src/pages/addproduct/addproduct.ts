import { ProductsPage } from './../products/products';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { constants } from './../../const/const';


@IonicPage()
@Component({
  selector: 'page-addproduct',
  templateUrl: 'addproduct.html',
})
export class AddproductPage {
  myForm: FormGroup;
  public resources : any []=[];
  public manufacturers : any []=[];
  public categories : any []=[];
  public taxes : any []=[];
  public units : any []=[];
  public conditions : any []=[];
  public manufacture : any = 0;
  public category : any = 0;
  public unit : any = 0;
  public tax : any = 0;
  public condition : any = 0;
  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              public viewCtrl: ViewController, 
              public formBuilder:FormBuilder,
              public http: HttpClient) {


  this.myForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],

  })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddproductPage');
    this.getResource();
  }

  close(){
		this.viewCtrl.dismiss();
		this.navCtrl.setRoot(ProductsPage);
  }
  
  postProduct(){
    // let body =  this.myForm.value;
    console.log(this.myForm);
  }

  getResource(){
    return this.http.get(constants.resources,
      { headers: new HttpHeaders()
      .set('authorization', 'http://localhost:4200')
      .append('app', 'BananaApp')
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
      console.log('condiciones', this.conditions);
      // console.log('data resources: ', this.resources );
      // console.log('data manufacturers: ', this.manufacturers );
      // console.log('data categories: ', this.categories );
      // console.log('data taxes: ', this.taxes );
      // console.log('data units: ', this.units );
    }, error => {
      console.log(error);
  });
  }

}
