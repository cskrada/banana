import { BranchofficesclientsPage } from './../branchofficesclients/branchofficesclients';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { constants } from './../../const/const';
import { TranslateService } from '@ngx-translate/core';
import { Binary } from '@angular/compiler';

@IonicPage()
@Component({
  selector: 'page-addbranchoffice',
  templateUrl: 'addbranchoffice.html',
})
export class AddbranchofficePage {
  myForm: FormGroup;
	countries: any[] = [];
	states: any[] = [];
	cities: any[] = [];
	country: any;
	state: any;
	city: any;
	country_id: null;
	state_id: null;
	city_id: null;
  client: any[] = [];
  id_third: any;
  localization: any[] = [];
  branch: any;
  is_ship_to: any = false ;
  is_bill_to: any = false ;
  is_pay_from: any = false ;
  is_remit_to: any = false ;
  
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              public formBuilder:FormBuilder,
              public translateService: TranslateService,
              public toastCtrl: ToastController) {
  
    this.id_third = this.navParams.data;
    console.log( 'clienteeeee add branch office', this.id_third);

    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: [''],
      phone_2: [''],
      fax: [''],
      is_ship_to: [''],
      is_bill_to: [''],
      is_pay_from: [''],
      is_remit_to: [''],
      isdn: [''], 
      localization: this.formBuilder.group({
        address_1: ['',Validators.required],
        postal: [''],
        country_id: ['',Validators.required],
        state_id: ['',Validators.required],
        city_id: ['',Validators.required],
        })
    });

  this.getcountry();
  this.getstate(this.country_id);
  this.getcity(this.state_id);
}

ionViewDidLoad() {
  console.log('ionViewDidLoad AddbranchofficePage');
}

  addBranchOffice(){
    let body: any = {};
      body = this.myForm.value;
      body.localization = body.localization;
      body.bpartner_id = this.id_third;
      body.is_ship_to = this.is_ship_to;
      body.is_bill_to = this.is_bill_to;
      body.is_pay_from = this.is_pay_from;
      body.is_remit_to = this.is_remit_to;
      console.log(body);
      
    this.http.post(constants.apipostbranch,
        body , 
      { headers: new HttpHeaders()
      .set('authorization', sessionStorage.getItem('dns'))
      .append('app', 'BananaApp')
      .append('organization', sessionStorage.getItem('organization_id') )
      .append('user', sessionStorage.getItem('user'))
      .append('token', sessionStorage.getItem('token'))
      .append('Access-Control-Allow-Origin', '*')
    }).subscribe(data => {
        this.branch= data;
      console.log('data de addBRANCH',this.branch);
      // {branch_id: 1782, location_id: 1831}
      
      // if (this.branch['branch_id'] != 0){
      //   this.translateService.get('Alerta13').subscribe(
      //     value => {
      //       let message = value['MensajeAlerta'];
      //         const toast = this.toastCtrl.create({
      //         message: message,
      //         duration: 3000
      //         });
      //     toast.present();
      //   });
      // }
      this.navCtrl.push(BranchofficesclientsPage, this.id_third );
    }, error => {
      console.log(error);
    });
  }

  getcountry(){
		return this.http.get(constants.apicountries,
			{ headers: new HttpHeaders()
				.set('authorization', sessionStorage.getItem('dns'))
				.append('app', 'BananaApp')
				.append('organization', sessionStorage.getItem('organization_id') )
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
				.set('authorization', sessionStorage.getItem('dns'))
				.append('app', 'BananaApp')
				.append('organization', sessionStorage.getItem('organization_id') )
				.append('user', sessionStorage.getItem('user'))
				.append('Access-Control-Allow-Origin', '*')
				.append('token', sessionStorage.getItem('token')),
				params: {country_id: id}
			}).subscribe ( data=> {
				this.states= data['states'];
			}, error => {
				console.log(error);
		});
	}

	getcity(id){
		this.cities = [];
		return this.http.get(constants.apicities,
			{ headers: new HttpHeaders()
				.set('authorization', sessionStorage.getItem('dns'))
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
