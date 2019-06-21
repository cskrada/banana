import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, LoadingController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { constants } from './../../const/const';
import { TranslateService } from '@ngx-translate/core';
import { ModifybranchofficePage } from './../modifybranchoffice/modifybranchoffice';

@IonicPage()
@Component({
  selector: 'page-seebranchoffice',
  templateUrl: 'seebranchoffice.html',
})
export class SeebranchofficePage {

  branch_office: any;
  branch: any[]= [];
	id_branch: any;
	localization: any []= [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              public translateService: TranslateService,
							public alerta: AlertController,
							public loadingCtrl: LoadingController) {
		this.branch_office= this.navParams.data;
		// this.localization = this.branch_office['localization'];
    this.id_branch = this.navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeebranchofficePage');
  }

  ionViewDidEnter(){
    this.seeBranchOffice();
  }

  seeBranchOffice(){
		this.translateService.get('Por favor espere...').subscribe(
			value => {
				let content = value;
				let loading = this.loadingCtrl.create({
					content: content
				});
			loading.present();
			return this.http.get(constants.apiseebranch+this.id_branch,
				{ headers: new HttpHeaders()
					.set('authorization', 'http://localhost:4200')
					.append('app', 'BananaApp')
					.append('organization', sessionStorage.getItem('organization_id') )
					.append('user', sessionStorage.getItem('user'))
					.append('Access-Control-Allow-Origin', '*')
					.append('token', sessionStorage.getItem('token'))
				}).subscribe ( data=> {
					loading.dismissAll();
					this.branch = data['branch'];
				this.localization = this.branch['localization'];
			}, error => {
				console.log(error);
			});
		});
  }

  // archived(){
	// 	this.translateService.get('Alerta1').subscribe(
	// 		value => {
	// 			let title = value['TituloAlerta'];
	// 			let message = value['MensajeAlerta'];
	// 			let buttoncancel = value['BotonCancelar'];
	// 			let buttonarchived = value['BotonArchivar'];
			  
	// 		 	 let alert = this.alerta.create({
	// 			  title : title,
	// 			  message : message,
	// 			  buttons: [
	// 				  {  
	// 					  text: buttoncancel,
	// 					  handler: data => {
	// 						  console.log('Cancelado!');
	// 						}
	// 					},
	// 					{
	// 						text: buttonarchived,
	// 						handler: data => {
	// 							// console.log('Archivado!');
	// 						}
	// 					}
	// 				]
	// 			});
	// 			alert.present();
	// 		});
	// }

  modified(){
		this.translateService.get('AlertaSeeBranchOffice').subscribe( 
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
								this.modify(this.branch_office);
							}
						}
					]
				});
				alert2.present();
			});
  }

  modify(branch_office){
    this.navCtrl.push(ModifybranchofficePage, branch_office);
  }



}
