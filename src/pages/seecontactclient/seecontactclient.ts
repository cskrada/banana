import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { ModifycontactclientPage } from './../modifycontactclient/modifycontactclient';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { constants } from './../../const/const';

@IonicPage()
@Component({
  selector: 'page-seecontactclient',
  templateUrl: 'seecontactclient.html',
})
export class SeecontactclientPage {
  contact_1: any;
  client: any []= [];
  id_contact: any
  id_thirds: any;
  contact_will: any;
  contact_id: any;
  contact_new: any;
  contact: any[]=[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public translateService: TranslateService,
              public alerta: AlertController,
							public http: HttpClient,
							public loadingCtrl: LoadingController
    ) {
    this.contact_1= this.navParams.data['c']; //datos de contacto
    this.id_thirds= this.navParams.data['id']; //ID de tercero
    this.id_contact = this.contact_1['id']; //id de contacto
	console.log('this.contact_1', this.contact_1);
	console.log('this.client', this.client);
	console.log('this.id_contact', this.id_contact);
	
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SeecontactclientPage');
  }
  
  ionViewDidEnter(){
    this.seeContact();
  }

  seeContact(){
		this.translateService.get('Por favor espere...').subscribe(
			value => {
				let content = value;
				let loading = this.loadingCtrl.create({
					content: content
					});
				loading.present();
			return this.http.get(constants.apiseecontact+this.id_contact,
				{ headers: new HttpHeaders()
					.set('authorization', sessionStorage.getItem('dns'))
					.append('app', 'BananaApp')
					.append('organization', sessionStorage.getItem('organization_id') )
					.append('user', sessionStorage.getItem('user'))
					.append('Access-Control-Allow-Origin', '*')
					.append('token', sessionStorage.getItem('token'))
				}).subscribe ( data=> {
					loading.dismissAll();
					this.contact = data['contact'];
				}, error => {
					console.log(error);
			});
		});
  }

  modified(){
		this.translateService.get('AlertaSeeContactClient').subscribe( 
			value=>{
				let title = value['TituloAlerta'];
				let message = value['MensajeAlerta'];
				let buttoncancel = value['BotonCancelar'];
				let buttonmodify = value['BotonModificar'];

				let alert2 = this.alerta.create({
					title : title,
					message : message,
					buttons: [
						{  
							text: buttoncancel,
							handler: data => {
								console.log('Cancelado!');
							}
						},
						{
							text: buttonmodify,
							handler: data => {
								console.log('Modificado!');
								this.modify(this.contact);
							}
						}
					]
				});
				alert2.present();
			});
  }
  
  modify(contact){
    this.navCtrl.push(ModifycontactclientPage, {contact,id:this.id_thirds});
  }


}
