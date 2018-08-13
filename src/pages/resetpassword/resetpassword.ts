// importaciones de librerias
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ResetProvider } from '../../providers/data/reset';

@Component({
  selector: 'page-resetpassword',
  templateUrl: 'resetpassword.html',
})
export class ResetpasswordPage {

	clients: string[];
	errorMessage: string;
	descending: boolean = false;
	order: number;
	column: string = 'name';

	constructor(public navCtrl: NavController, public rest: ResetProvider) {

	}

	ionViewDidLoad() {
		this.getClients();
	}

	getClients() {
		this.rest.getClients()
		   .subscribe(
			clients => this.clients = clients,
			error =>  this.errorMessage = <any>error);
			
	}

	sort(){
		this.descending = !this.descending;
		this.order = this.descending ? 1 : -1;
	}
}