import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, LoadingController, AlertController, ToastController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { constants } from './../../const/const';
import { TranslateService } from '@ngx-translate/core';
import { ClientsPage } from '../clients/clients';

@IonicPage()
@Component({
  selector: 'page-addclient',
  templateUrl: 'addclient.html',
})
export class AddclientPage {
	public results: any;
	myForm: FormGroup;
	countries: any[] = [];
	states: any[] = [];
	cities: any[] = [];
	country: any;
	state: any;
	city: any;
	country_id: any = 0;
	state_id: any = 0;
	city_id: any = 0;
	// prospect: any [] = [];
	prospect: any = 0;
  constructor(public navCtrl: NavController,
			  public navParams: NavParams,
			  public formBuilder:FormBuilder,
			  public loadingCtrl: LoadingController,
			  public alertCtrl: AlertController,
			  private viewCtrl: ViewController,
			  public http: HttpClient,
			  public toastCtrl: ToastController,
			  public translateService: TranslateService) {
	
	this.myForm = this.formBuilder.group({
		cif: ['', Validators.required],
		business_name: ['', Validators.required],
		trade_name: [''],
		alias: [''],
		address: [''],
		postal_code: [''],
		phone: [''],
		email: [''],
		site_web: [''],
		country_id: [''],
		state_id: [''],
		city_id: [''],
	});

	// this.country= 'VENEZUELA';
	// this.state= 'Miranda';
	// this.city= 'Los Teques';
	this.getcountry();
	this.getstate(this.country_id);
	this.getcity(this.state_id);
  }
	  
  	postProspect(){
		let body =  this.myForm.value;
		console.log(this.myForm);

		this.http.post(constants.apipostclient,
			 body , 
			{ headers: new HttpHeaders()
			.set('authorization', 'http://localhost:4200')
			.append('app', 'BananaApp')
			.append('user', sessionStorage.getItem('user'))
			.append('token', sessionStorage.getItem('token'))
			.append('Access-Control-Allow-Origin', '*')
	  }).subscribe(data => {
		  	this.prospect= data['prospect'];
			console.log(this.prospect);
			if (this.prospect === 0){

				this.translateService.get('Alerta6').subscribe(
					value => {
						let message = value['MensajeAlerta'];
							const toast = this.toastCtrl.create({
							message: message,
							duration: 3000
							});
					toast.present();
				});
			} else if (this.prospect != 0){
				this.translateService.get('Alerta7').subscribe(
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
	  });
	}
  
	getcountry(){
		return this.http.get(constants.apicountries,
			{ headers: new HttpHeaders()
				.set('authorization', 'http://localhost:4200')
				.append('app', 'BananaApp')
				.append('user', sessionStorage.getItem('user'))
				.append('Access-Control-Allow-Origin', '*')
				.append('token', sessionStorage.getItem('token'))
			}).subscribe ( data=> {
				this.countries= data['countries'];
				// console.log('get countries ', this.countries[0].id);
			}, error => {
				console.log(error);
		});
	}

	getstate(id){
		this.states = [];
		this.cities = [];
		return this.http.get(constants.apistates,
			{ headers: new HttpHeaders()
				.set('authorization', 'http://localhost:4200')
				.append('app', 'BananaApp')
				.append('user', sessionStorage.getItem('user'))
				.append('Access-Control-Allow-Origin', '*')
				.append('token', sessionStorage.getItem('token')),

				params: {country_id: id}
			}).subscribe ( data=> {
				this.states= data['states'];
				// console.log('get states ', this.states[0].id);
			}, error => {
				console.log(error);
		});
	}

	getcity(id){
		this.cities = [];
		return this.http.get(constants.apicities,
			{ headers: new HttpHeaders()
				.set('authorization', 'http://localhost:4200')
				.append('app', 'BananaApp')
				.append('user', sessionStorage.getItem('user'))
				.append('Access-Control-Allow-Origin', '*')
				.append('token', sessionStorage.getItem('token')),

				params: {state_id: id}
			}).subscribe ( data=> {
				this.cities= data['cities'];
			}, error => {
				console.log(error);
		});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad AddclientPage');
	}

	close(){
		this.viewCtrl.dismiss();
		this.navCtrl.setRoot(ClientsPage);
	}

}