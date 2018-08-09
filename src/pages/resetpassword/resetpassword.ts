
// importaciones de librerias
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-resetpassword',
  templateUrl: 'resetpassword.html',
})
export class ResetpasswordPage {

	clients: any[] = [];

	constructor(public navCtrl: NavController, public http: HttpClient) {
		
	}

	ionViewDidLoad() {
		this.getClients().subscribe(
			(data) => { 
			this.clients = data['results'];
			}, (error) =>{
			console.error(error);
			});
	}

	getClients() {
		return this.http.get('https://randomuser.me/api/?results=25');
	}
}