
// importaciones de librerias
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';

import { ResetProvider } from '../../providers/data/reset';

@Component({
  selector: 'page-resetpassword',
  templateUrl: 'resetpassword.html',
})
export class ResetpasswordPage {

	clients: any[] = [];
	searchTerm: string = '';
	searchControl: FormControl;
	items: any;
	searching: any = false;

	countries: string[];
	errorMessage: string;

	constructor(public navCtrl: NavController, public http: HttpClient, public rest: ResetProvider) {
		this.searchControl = new FormControl();
	}

	ionViewDidLoad() {
		this.getClients();
	}

	getClients() {
		this.rest.getClients()
		   .subscribe(
			 clients => this.clients = clients,
			 error =>  this.errorMessage = <any>error);
			 console.log(this.clients);
	  }
}