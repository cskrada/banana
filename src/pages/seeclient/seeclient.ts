import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';

// importacion de DataProvider
import { ClientProvider } from '../../providers/data/client';


// importacion de paginas
import { EmailPage } from '../email/email';


@IonicPage()
@Component({
  selector: 'page-seeclient',
  templateUrl: 'seeclient.html',
})
export class SeeclientPage {

items: any;

constructor(public navCtrl: NavController,
				public alerta: AlertController, 
				public navParams: NavParams, 
				public dataService: ClientProvider,
				public emailComposer: EmailComposer) {
	this.items = this.navParams.data;
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

	openEmail(items) {
		this.navCtrl.push(EmailPage, items);
	}

}