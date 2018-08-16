//importacion de librerias
import { Component } from '@angular/core';
// import { FormControl } from '@angular/forms';
import { NavController } from 'ionic-angular';

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

	clients: any[] = [];
	
	// errorMessage: string;
	// descending: boolean = false;
	// order: number;
	// column: string = 'name';

	constructor(public navCtrl: NavController, public http: HttpClient) {

	}// fin de constructor
	openPage(item) {
		this.navCtrl.push(SeeclientPage, item);
	}

	// redirecciona la pagina para AgregarCliente
	addClient(){
		this.navCtrl.push(AddclientPage);
	}

	ionViewDidLoad() {
		this.getClients().subscribe(data =>{
			this.clients = data['customers'];
			console.log(this.clients);
			console.log('ionViewDidLoad HomePage');
		}, error =>{
			console.log(error);
		});
	}

	getClients(){
		return this.http.get('http://bananaservertest.herokuapp.com/api/thirds/customers/7',
			{ headers: new HttpHeaders()
				.set('authorization', 'http://localhost:4200')
				.append('app', 'BananaCli')
				.append('user', sessionStorage.getItem('user'))
				.append('Access-Control-Allow-Origin', '*')
				.append('token', sessionStorage.getItem('token'))
			});	
	}

	// getClients() {
	// 	this.rest.getClients()
	// 	   .subscribe(
	// 		clients => this.clients = clients,
	// 		error =>  this.errorMessage = <any>error);
	// }

	// sort(){
	// 	this.descending = !this.descending;
	// 	this.order = this.descending ? 1 : -1;
	// }
}