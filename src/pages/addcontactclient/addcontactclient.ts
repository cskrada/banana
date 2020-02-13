import { ContactsclientPage } from './../contactsclient/contactsclient';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { constants } from './../../const/const';
import { TranslateService } from '@ngx-translate/core';



@IonicPage()
@Component({
  selector: 'page-addcontactclient',
  templateUrl: 'addcontactclient.html',
})
export class AddcontactclientPage {
  myForm: FormGroup;
  prospect: any = 0;
  id: any;
  contact: any;
  charges: any []=[];
  charge: any = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              public formBuilder:FormBuilder,
              public translateService: TranslateService,
              public toastCtrl: ToastController, 
              public viewCtrl: ViewController) {
    
    this.id= this.navParams.data;
    console.log('ID de CLiente',this.id);

    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      title: [''],
      charge: [null],
      phone: [''],
      phone_2: [''],
      email: [''],
      fax: [''],
      description: [''],
      comments: [''],
      birthday: [''],
      editable:[false],
      last_contact:[''],
      last_result:['']
    });

    // this.getCharge();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddcontactclientPage');
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

  addContact(){
    let body: any = {};
    body.contact = this.myForm.value;
    body.id = this.id;
		console.log(body);

		this.http.post(constants.apipostcontact,
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
      
      if (this.contact['contact_id'] != 0){
        // this.translateService.get('Alerta10').subscribe(
        //   value => {
        //     let message = value['MensajeAlerta'];
        //       const toast = this.toastCtrl.create({
        //       message: message,
        //       duration: 3000
        //       });
        //   toast.present();
        // });
        this.navCtrl.push(ContactsclientPage, this.id);
      }
		}, error => {
			console.log(error);
	  });
  }

  // close(){
  //   this.viewCtrl.dismiss();
  //   this.navCtrl.setRoot(ContactsclientPage, this.id);
  // }

}
