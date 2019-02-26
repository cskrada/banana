import { ProductsPage } from './../products/products';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-addproduct',
  templateUrl: 'addproduct.html',
})
export class AddproductPage {
  myForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              public viewCtrl: ViewController, 
              public formBuilder:FormBuilder) {


  this.myForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],

  })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddproductPage');
  }

  close(){
		this.viewCtrl.dismiss();
		this.navCtrl.setRoot(ProductsPage);
  }
  
  postProduct(){
    // let body =  this.myForm.value;
    console.log(this.myForm);
    


  }

}
