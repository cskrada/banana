import { constants } from './../../const/const';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { CallNumber } from '@ionic-native/call-number';
import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// importacion de paginas
import { EmailPage } from '../email/email';
import { ModifyclientPage } from './../modifyclient/modifyclient';
import { ContactsclientPage } from './../contactsclient/contactsclient';
import { BranchofficesclientsPage } from './../branchofficesclients/branchofficesclients';

@IonicPage()
@Component({
  selector: 'page-seeclient',
  templateUrl: 'seeclient.html',
})
export class SeeclientPage {

client: any[] = [];
phone: string;
url: string;
id: string;
thirds: any []=[];
public contacts: any;
public branchOffice: any[] = [];

constructor(public navCtrl: NavController,
	public alerta: AlertController, 
	public navParams: NavParams, 
	public emailComposer: EmailComposer,
	private callNumber: CallNumber,
	private iab: InAppBrowser,
	public translateService: TranslateService,
	public http: HttpClient) {
		
		this.client = this.navParams.data;
		this.phone = this.navParams.get('phone');
		this.id = this.navParams.get('id');
		
		this.getContacts();
	}
	
	ionViewDidEnter(){
		this.client = this.navParams.data;
		this.seeClient();
	}

	call(phone){
		this.callNumber.callNumber(phone, true)
		.then(res => console.log('Launched dialer!', res))
		.catch(err => console.log('Error launching dialer', err));
	}

	openUrl(url){
		const options: InAppBrowserOptions = {
			zoom: 'yes'
		}
		this.iab.create(url, "_blank", options);
	}

	ionViewDidLoad() {
	console.log('ionViewDidLoad SeeclientPage');
	}

	seeClient(){
		return this.http.get(constants.apiseeclient+this.id,
			{ headers: new HttpHeaders()
			  .set('authorization', 'http://localhost:4200')
			  .append('app', 'BananaApp')
			  .append('organization', sessionStorage.getItem('organization_id') )
			  .append('user', sessionStorage.getItem('user'))
			  .append('Access-Control-Allow-Origin', '*')
			  .append('token', sessionStorage.getItem('token'))
			}).subscribe ( data=> {
			  this.thirds = data['client'];
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
		this.translateService.get('Alerta2').subscribe( 
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
								this.modify(this.client);
							}
						}
					]
				});
				alert2.present();
			});
	}

	getContacts(){
		return this.http.get(constants.apicontactsclient+this.id,
		  { headers: new HttpHeaders()
			.set('authorization', 'http://localhost:4200')
			.append('app', 'BananaApp')
			.append('organization', sessionStorage.getItem('organization_id') )
			.append('user', sessionStorage.getItem('user'))
			.append('Access-Control-Allow-Origin', '*')
			.append('token', sessionStorage.getItem('token'))
		  }).subscribe ( data=> {
			this.contacts = data;
			// console.log('get contacts', this.contacts);
		  }, error => {
			console.log(error);
		});
	  }

	getBranchOffices(){
		return this.http.get(constants.apibranchoffices+this.id,
			{ headers: new HttpHeaders()
			.set('authorization', 'http://localhost:4200')
			.append('app', 'BananaApp')
			.append('organization', sessionStorage.getItem('organization_id') )
			.append('user', sessionStorage.getItem('user'))
			.append('Access-Control-Allow-Origin', '*')
			.append('token', sessionStorage.getItem('token'))
			}).subscribe ( data=> {
			this.branchOffice = data['branchOffice'];
			}, error => {
			console.log(error);
		});
	}


	modify(client){
		this.navCtrl.push(ModifyclientPage, client);
	}

	contactsClient(client){
		this.navCtrl.push(ContactsclientPage, client);
	}

	branchOfficesClient(client){
		this.navCtrl.push(BranchofficesclientsPage, client);
	}

	openEmail(client) {
		this.navCtrl.push(EmailPage, client);
	}
}