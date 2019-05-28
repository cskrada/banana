import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
              public http: HttpClient
    ) {
    this.contact_1= this.navParams.data['c'];
    this.client= this.navParams.data['client'];
    this.id_thirds = this.client['id'];
    this.id_contact = this.contact_1['id'];

  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SeecontactclientPage');
  }
  
  ionViewDidEnter(){
    this.seeContact();
  }

  seeContact(){
    return this.http.get(constants.apiseecontact+this.id_contact,
      { headers: new HttpHeaders()
        .set('authorization', 'http://localhost:4200')
        .append('app', 'BananaApp')
        .append('organization', sessionStorage.getItem('organization_id') )
        .append('user', sessionStorage.getItem('user'))
        .append('Access-Control-Allow-Origin', '*')
        .append('token', sessionStorage.getItem('token'))
      }).subscribe ( data=> {
        this.contact = data['contact'];
      }, error => {
        console.log(error);
    });
  }

  // archived(){
	// 	this.translateService.get('Alerta1').subscribe(
	// 		value => {
	// 			let title = value['TituloAlerta'];
	// 			let message = value['MensajeAlerta'];
	// 			let buttoncancel = value['BotonCancelar'];
	// 			let buttonarchived = value['BotonArchivar'];
			  
	// 		 	 let alert = this.alerta.create({
	// 			  title : title,
	// 			  message : message,
	// 			  buttons: [
	// 				  {  
	// 					  text: buttoncancel,
	// 					  handler: data => {
	// 						  console.log('Cancelado!');
	// 						}
	// 					},
	// 					{
	// 						text: buttonarchived,
	// 						handler: data => {
	// 							console.log('Archivado!');
	// 						}
	// 					}
	// 				]
	// 			});
	// 			alert.present();
	// 		});
	// }

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
								this.modify(this.contact, this.client);
							}
						}
					]
				});
				alert2.present();
			});
  }
  
  modify(contact, client){
    this.navCtrl.push(ModifycontactclientPage, {contact,client});
  }


}
