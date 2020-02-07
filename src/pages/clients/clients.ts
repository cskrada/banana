// import { FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/debounceTime';
import { constants } from './../../const/const';

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
	director: any = {};
	on: any;

	constructor(public navCtrl: NavController,
				public http: HttpClient,
				public loadingCtrl: LoadingController,
				public alertCtrl: AlertController,
				public translateService: TranslateService) {
		this.id = sessionStorage.getItem('user');
		// console.log("ID de usuario", this.id);
	}
	openPage(c) {
		this.navCtrl.push(SeeclientPage, c.id);
	}

	addClient(){
		this.navCtrl.push(AddclientPage);
	}

	ionViewDidEnter(){
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

			return this.http.get(constants.apiclients+this.id,
				{ headers: new HttpHeaders()
					.set('authorization', sessionStorage.getItem('dns'))
					.append('app', 'BananaApp')
					.append('organization', sessionStorage.getItem('organization_id') )
					.append('user', sessionStorage.getItem('user'))
					.append('Access-Control-Allow-Origin', '*')
					.append('token', sessionStorage.getItem('token'))
				}).subscribe ( data=> {
					loading.dismissAll();
					// this.clients = data['clients'];
					console.log(this.clients);
					this.director = data['clients'];
					console.log(this.director);

					if( this.director == -1 ){
						console.log('this.director -1', this.director);
						this.on = 1;
					}else if( this.director == -2){
						this.on = 2;
						console.log('this.director -2', this.director)
					}else if( this.director != -1 && this.director != -2){
						this.on = 0;
						this.clients = data['clients'];
					}
				}, error => {
					console.log(error);
					if(error.error == 'Usted. Se ha Logeado desde otro dispositivo esta sesion fue cerrada'){
						console.log('la sesion ha sido cerrada');
					}
			});
		});
	}

	settings(){
		this.navCtrl.push(SettingsPage);
	}
}