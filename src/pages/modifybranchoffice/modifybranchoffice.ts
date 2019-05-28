import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { constants } from './../../const/const';

@IonicPage()
@Component({
  selector: 'page-modifybranchoffice',
  templateUrl: 'modifybranchoffice.html',
})
export class ModifybranchofficePage {
  
  myForm: FormGroup;
  branch: any;

  countries: any[] = [];
	states: any[] = [];
	cities: any[] = [];
	country: any;
	state: any;
	city: any;
	country_id: null;
	state_id: null;
	city_id: null;

  branch_office: any;
  id_branchOffice: any;
  localization: any;
  id_thirds: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              public formBuilder:FormBuilder,
              public translateService: TranslateService,
              public toastCtrl: ToastController) {

    this.branch_office = this.navParams.data;
    this.localization = this.branch_office['localization'];
    this.id_branchOffice = this.branch_office['id'];
    this.id_thirds = this.branch_office['bpartner_id'];
    
    console.log('BRANCH OFFICE', this.branch_office);
    console.log('BRANCH OFFICE - > LOCALItazion', this.localization);
    
    this.myForm = this.formBuilder.group({
      name: [this.branch_office['name'], Validators.required],
      phone: [this.branch_office['phone']],
      phone_2: [this.branch_office['phone_2']],
      fax: [this.branch_office['fax']],
      is_ship_to: [this.branch_office['is_ship_to']],
      is_bill_to: [this.branch_office['is_bill_to']],
      is_pay_from: [this.branch_office['is_pay_from']],
      is_remit_to: [this.branch_office['is_remit_to']],
      isdn: [this.branch_office['isdn']], 
      localization: this.formBuilder.group({
        id: [this.localization['id']],
        address_1: [this.localization['address_1'],Validators.required],
        postal: [this.localization['postal']],
        country_id: [this.localization['country_id']],
        state_id: [this.localization['state_id']],
        city_id: [this.localization['city_id']],
        })
    });
    this.country_id= this.localization['country_id'];
	  this.state_id= this.localization['state_id'];
    this.city_id= this.localization['city_id'];
    
    this.getcountry(this.localization['country_id']);
    this.getstate(this.country_id);
    this.getcity(this.state_id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifybranchofficePage');
  }

  modifyBranchOffice(){
    let body: any = {};
      body = this.myForm.value;
      body.localization = body.localization;
      body.bpartner_id = this.id_thirds;
      body.id = this.id_branchOffice;
      console.log(body);
      
    this.http.put(constants.apiputbranch,
        body , 
      { headers: new HttpHeaders()
      .set('authorization', 'http://localhost:4200')
      .append('app', 'BananaApp')
      .append('organization', sessionStorage.getItem('organization_id') )
      .append('user', sessionStorage.getItem('user'))
      .append('token', sessionStorage.getItem('token'))
      .append('Access-Control-Allow-Origin', '*')
    }).subscribe(data => {
        this.branch= data;
      console.log('data de addBRANCH',this.branch);
      
      if (this.branch == 1){
        this.translateService.get('Alerta12').subscribe(
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

  getcountry(id){
		return this.http.get(constants.apicountries,
			{ headers: new HttpHeaders()
				.set('authorization', 'http://localhost:4200')
				.append('app', 'BananaApp')
				.append('organization', sessionStorage.getItem('organization_id') )
				.append('user', sessionStorage.getItem('user'))
				.append('Access-Control-Allow-Origin', '*')
        .append('token', sessionStorage.getItem('token')),
        params: {country_id: id}
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
				.append('organization', sessionStorage.getItem('organization_id') )
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
				.append('organization', sessionStorage.getItem('organization_id') )
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

}
