import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { CallNumber } from '@ionic-native/call-number';
import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { TranslateService } from '@ngx-translate/core';


// importacion de paginas
import { EmailPage } from '../email/email';


@IonicPage()
@Component({
  selector: 'page-seeclient',
  templateUrl: 'seeclient.html',
})
export class SeeclientPage {

client: any[] = [];
phone: string;
url: string;

constructor(public navCtrl: NavController,
				public alerta: AlertController, 
				public navParams: NavParams, 
				public emailComposer: EmailComposer,
				private callNumber: CallNumber,
				private iab: InAppBrowser,
				public translateService: TranslateService) {
	this.client = this.navParams.data;
	this.phone = this.navParams.get('phone');
	// console.log("seeclient",this.client);
	// console.log("telefono",this.phone);
}

	call(){
		this.callNumber.callNumber(this.phone, true)
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

	archived(){
		
		this.translateService.get('Alerta1').subscribe(
			value => {
				let title = value['TituloAlerta'];
				let message = value['MensajeAlerta'];
				let buttoncancel = value['BotonCancelar'];
				let buttonarchived = value['BotonArchivar'];
			  
			 	 let alert = this.alerta.create({
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
							text: buttonarchived,
							handler: data => {
								console.log('Archivado!');
							}
						}
					]
				});
				alert.present();
			});
	}
			
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
							}
						}
					]
				});
				alert2.present();
			});
	}

	openEmail(client) {
		this.navCtrl.push(EmailPage, client);
	}
}