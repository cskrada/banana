import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { constants } from './../../const/const';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-modifycontactclient',
  templateUrl: 'modifycontactclient.html',
})
export class ModifycontactclientPage {
  contact: any;
  myForm: FormGroup;
  charges: any []=[];
  charge: any = null;
  id_contact: any;
  id_thirds: any;
  client: any;
  
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder:FormBuilder,
              public http: HttpClient,
              public viewCtrl: ViewController,
              public translateService: TranslateService,
              public toastCtrl: ToastController) {
    
    this.contact = this.navParams.data['contact'];
    this.id_thirds = this.navParams.data['id'];
    this.id_contact = this.contact['id'];

    console.log('modifycontactclient ID tercero', this.id_contact);
    console.log('modifycontactclient ID tercero', this.id_thirds);

    this.myForm = this.formBuilder.group({
      id: [this.contact['id']],
      name: [this.contact['name'], Validators.required],
      title: [this.contact['title']],
      charge: [null],
      phone: [this.contact['phone']],
      phone_2: [this.contact['phone_2']],
      email: [this.contact['email']],
      fax: [this.contact['fax']],
      description: [this.contact['description']],
      comments: [this.contact['comments']],
      birthday: [this.contact['birthday']],
      editable:[false],
      last_contact:[null],
      last_result:[null]
    });
  }

  ionViewDidEnter(){
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifycontactclientPage');
  }

  getCharge(){
    return this.http.get(constants.apicharges,
			{ headers: new HttpHeaders()
				.set('authorization', sessionStorage.getItem('dns'))
				.append('app', 'BananaApp')
				.append('organization', sessionStorage.getItem('organization_id') )
				.append('user', sessionStorage.getItem('user'))
				.append('Access-Control-Allow-Origin', '*')
				.append('token', sessionStorage.getItem('token'))
			}).subscribe ( data=> {
				this.charges= data['charges'];
				console.log('get charges', this.charges);
			}, error => {
				console.log(error);
		});
  }

  updateContactClient(){
    let body: any = {};
    body.contact = this.myForm.value;
    body.id = this.id_thirds;
		console.log(body);

		this.http.put(constants.apiputcontact,
			 body , 
			{ headers: new HttpHeaders()
			.set('authorization', sessionStorage.getItem('dns'))
			.append('app', 'BananaApp')
			.append('organization', sessionStorage.getItem('organization_id') )
			.append('user', sessionStorage.getItem('user'))
			.append('token', sessionStorage.getItem('token'))
			.append('Access-Control-Allow-Origin', '*')
	  }).subscribe(data => {
      this.contact= data;
      console.log('data de addcontactclient',this.contact);
      
      if (this.contact['user_id'] == null ){
        this.translateService.get('Alerta11').subscribe(
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

  close(){
		this.viewCtrl.dismiss();
		// this.navCtrl.push(ContactsclientPage);
	}

}
