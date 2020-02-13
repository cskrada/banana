import { SeeclientPage } from './../seeclient/seeclient';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { constants } from './../../const/const';
import { TranslateService } from '@ngx-translate/core';



@IonicPage()
@Component({
  selector: 'page-modifyclient',
  templateUrl: 'modifyclient.html',
})
export class ModifyclientPage {
  
  public client: any[]=[];
  myForm: FormGroup;
  
  prospect: any = 0;

  // campos de prospecto
  id: string;
  cif: string;
  business_name: string;
  trade_name: string;
  alias: string;
  email: string;
  url: string;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public http: HttpClient,
			  public translateService: TranslateService,
			  public toastCtrl: ToastController) {
				  
    this.client = this.navParams.data;
    this.id = this.navParams.get('id');
    this.cif = this.navParams.get('cif');
    this.business_name = this.navParams.get('business_name');
    this.trade_name = this.navParams.get('tradename');
    this.alias = this.navParams.get('alias');
	this.url = this.navParams.get('url');
	this.email = this.navParams.get('email');

    console.log('modificar cliente',  this.client);

    this.myForm = this.formBuilder.group({
		id: [this.id],	
		cif: [this.cif, Validators.required],
		business_name: [this.business_name, Validators.required],
		trade_name: [this.trade_name],
		alias: [this.alias],
		url: [this.url],
		email: [this.email]
    });
    console.log('datos del formulario',this.myForm.value);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifyclientPage');
  }

  putProspect(){
    let body =  this.myForm.value;
		console.log(this.myForm);

		this.http.put(constants.apiputclient+this.id,
			 body , 
			{ headers: new HttpHeaders()
			.set('authorization', sessionStorage.getItem('dns'))
			.append('app', 'BananaApp')
			.append('organization', sessionStorage.getItem('organization_id') )
			.append('user', sessionStorage.getItem('user'))
			.append('token', sessionStorage.getItem('token'))
			.append('Access-Control-Allow-Origin', '*')
	  }).subscribe(data => {
		this.prospect= data['prospect'];
		console.log(this.prospect);
		
			// if (this.prospect != 0){
			// 	this.translateService.get('Alerta14').subscribe(
			// 		value => {
			// 		let message = value['MensajeAlerta'];
			// 			const toast = this.toastCtrl.create({
			// 			message: message,
			// 			duration: 3000
			// 			});
			// 		toast.present();
			// 	});
			// }
			this.navCtrl.push(SeeclientPage, this.id);
  		}, error => {
			console.log(error);
		});
  }

}
