import { InAppBrowser } from '@ionic-native/in-app-browser';
import { CallNumber } from '@ionic-native/call-number';
import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';

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
				private iab: InAppBrowser) {
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

	openUrl(){
		this.url = this.navParams.get('url');
		this.iab.create(this.url, "_blank");
	}

	ionViewDidLoad() {
	console.log('ionViewDidLoad SeeclientPage');
	}

	archived(){
		let alert = this.alerta.create({
			title : 'Archivar Cliente',
			message : '¿Esta seguro que desea archivar este cliente?',
			buttons: [
				{  
					text: 'Cancelar',
					handler: data => {
						console.log('Cancelado!');
					}
				},
				{
					text: 'Archivar',
					handler: data => {
						console.log('Archivado!');
					}
				}
			]
		});
	alert.present();
	}

	modified(){
		let alert2 = this.alerta.create({
			title : 'Modificar Cliente',
			message : '¿Esta seguro que desea modificar este cliente?',
			buttons: [
				{  
					text: 'Cancelar',
					handler: data => {
						console.log('Cancelado!');
					}
				},
				{
					text: 'Modificar',
					handler: data => {
						console.log('Modificado!');
					}
				}
			]
		});
		alert2.present();
	}

	openEmail(client) {
		this.navCtrl.push(EmailPage, client);
	}
}