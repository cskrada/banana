import { Component } from '@angular/core';
// import { FormControl } from '@angular/forms';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/debounceTime';

//importacion de paginas
import { SeeclientPage } from '../seeclient/seeclient';
import { AddclientPage } from '../addclient/addclient';
import { SettingsPage } from './../settings/settings';

@Component({
  selector: 'page-clients',
  templateUrl: 'clients.html',
})
export class ClientsPage {

	public id : any ;
	clients: any[] = [];

	constructor(public navCtrl: NavController,
				public http: HttpClient,
				public loadingCtrl: LoadingController,
				public alertCtrl: AlertController,
				public translateService: TranslateService) {
		this.id = sessionStorage.getItem('user');
		// console.log("ID de usuario", this.id);
	}
	openPage(c) {
		this.navCtrl.push(SeeclientPage, c);
	}

	addClient(){
		this.navCtrl.push(AddclientPage);
	}

	ionViewDidLoad() {
		this.getClients();
	}

	getClients(){
	this.translateService.get('Por favor espere...').subscribe(
		value => {
			let content = value;
			let loading = this.loadingCtrl.create({
				content: content
				});
			loading.present();

			// http://vbanana.tk/laravel-banana/public/api/thirds/customers/
			return this.http.get('http://192.168.1.3:8000/api/thirds/customers/'+this.id,
				{ headers: new HttpHeaders()
					.set('authorization', 'http://localhost:4200')
					.append('app', 'BananaApp')
					.append('user', sessionStorage.getItem('user'))
					.append('Access-Control-Allow-Origin', '*')
					.append('token', sessionStorage.getItem('token'))
				}).subscribe ( data=> {
					loading.dismissAll();
					this.clients = data['clients'];
					console.log('get clients ', this.clients);
				}, error => {
					console.log(error);
			});
		});
	}

	settings(){
		this.navCtrl.push(SettingsPage);
	}
}