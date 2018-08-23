//importacion de librerias
import { Component } from '@angular/core';
// import { FormControl } from '@angular/forms';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

// importacion de provider y el medidor de tiempo
// import { ClientsProvider } from '../../providers/data/clients';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/debounceTime';

//importacion de paginas
import { SeeclientPage } from '../seeclient/seeclient';
import { AddclientPage } from '../addclient/addclient';

@Component({
  selector: 'page-clients',
  templateUrl: 'clients.html',
})
export class ClientsPage {


	public id : any ;
	clients: any[] = [];

	constructor(public navCtrl: NavController, public http: HttpClient, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
		this.id = sessionStorage.getItem('user');
		console.log("ID de usuario", this.id);
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
		this.presentLoadingDefault();
		return this.http.get('http://vbanana.tk/laravel-banana/public/api/thirds/customers/'+this.id,
			{ headers: new HttpHeaders()
				.set('authorization', 'http://localhost:4200')
				.append('app', 'BananaApp')
				.append('user', sessionStorage.getItem('user'))
				.append('Access-Control-Allow-Origin', '*')
				.append('token', sessionStorage.getItem('token'))
			}).subscribe ( data=> {
				console.log('data ', data);
				this.clients = data['clients'];
				console.log('get clients ', this.clients);
				
			}, error => {
			console.log(error);
			this.presentLoadingDefault();
		});
	}

	presentLoadingDefault() {
		let loading = this.loadingCtrl.create({
		  content: 'Por favor espere...'
		});
	  
		loading.present();
	  
		setTimeout(() => {
		  loading.dismiss();
		}, 3000);
	}
}