import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, LoadingController, AlertController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { constants } from './../../const/const';
import { TranslateService } from '@ngx-translate/core';

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
	prospect: any [] = [];
  constructor(public navCtrl: NavController,
			  public navParams: NavParams,
			  public formBuilder:FormBuilder,
			  public loadingCtrl: LoadingController,
			  public alertCtrl: AlertController,
			  private viewCtrl: ViewController,
			  public http: HttpClient,
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
	  
  	postProspect(cif: string, business_name: string, trade_name: string, alias: string, address: string, postal_code: string, phone: string, email: string, site_web: any, country_id: any, state_id: any, city_id: any){
		this.http.post(constants.apipostclient,
			{ cif,business_name,trade_name,alias,address,postal_code,phone,email,site_web,country_id,state_id,city_id}, 
			{ headers: new HttpHeaders()
			.set('authorization', 'http://localhost:4200')
			.append('app', 'BananaApp')
			.append('Access-Control-Allow-Origin', '*')
	  }).subscribe(data => {
		  	this.prospect= data['prospect'];
			console.log(this.prospect);
		}, error => {
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
				// console.log('get cities ', this.cities[0].id);
			}, error => {
				console.log(error);
		});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad AddclientPage');
	}

	close(){
		this.viewCtrl.dismiss();
	}

}