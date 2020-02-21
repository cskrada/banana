//importacion de librerias
import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController,Loading, AlertController, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Md5 } from 'ts-md5/dist/md5';
import { constants } from './../../const/const';

//importacion de paginas
// import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { ResetpasswordPage } from '../resetpassword/resetpassword';
import { SeeproductPage } from './../seeproduct/seeproduct';
import { ProductsPage } from './../products/products';
import { OrganizationsPage } from './../organizations/organizations';

@IonicPage()
@Component({
selector: 'page-login',
templateUrl: 'login.html',
})
export class LoginPage {

	public id : string;
	public token : string;
	myForm: FormGroup;
	public loading:Loading;
	public results : string[] = [];
	passwordType: string = 'password';
	passwordIcon: string = 'eye-off';
	email: string;
	mail: any;
	checkbox: any;
	dns : string = '';
	dns_remember: any = '';
	check : any;
	password: string;

constructor(public navCtrl: NavController,
			public formBuilder:FormBuilder,
			public alertCtrl: AlertController,
			public loadingCtrl: LoadingController,
			public menu: MenuController,
			public http: HttpClient,
			public translateService: TranslateService){
	this.myForm = this.formBuilder.group({
		email: [this.email, Validators.required],
		password: [this.password, Validators.required]
	});	
}

	hideShowPassword() {
		this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
		this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
	}

	ionViewDidLoad() {
		this.menu.enable(false);
		this.checkbox = localStorage.check;
		this.check = localStorage.check;

		if( this.check == 'true' ){
			this.email = localStorage.email;
			this.password = localStorage.password;
			this.dns = localStorage.dns;
		}
		if( this.check == 'false' ){
			this.email = '';
			this.password = '';
			this.dns = '';
			localStorage.removeItem('email');
			localStorage.removeItem('password');
			localStorage.removeItem('dns');
		}
	}

	remember(){
		if (this.checkbox == true){
			this.check = true;
			localStorage.check = this.check;
		}
		if (this.checkbox == false){
			this.check = false;
			localStorage.check = this.check;
			this.email = '';
			this.password = '';
			this.dns = '';
		}
	}

	loginUser2(){
		const md5 = new Md5();
		this.password = this.myForm.value.password;
		let e = md5.appendStr(this.myForm.value.password).end();
		this.postLogin(this.myForm.value.email,e);
	}
	
	postLogin(email: string, password: any){
		this.dns_remember = this.dns;

		function saveSettingsInLocal (settings: any) {
			Object.keys(settings).forEach(function (key) {
			  if ( settings[key] != null && settings[key] !== undefined )
			  localStorage.setItem('settings_'+key, JSON.stringify(settings[key]));
			//   console.log('FUNCION',localStorage.getItem('settings_'+key));
			});
		}		

		const new_dns = constants.dns.replace('$$$__$$$', this.dns_remember);
	  	this.http.post(constants.apilogin,
					{ email, password }, 
					{ headers: new HttpHeaders()
					.set('authorization', new_dns)
					.append('app', 'BananaApp')
					.append('Access-Control-Allow-Origin', '*')
	  		}).subscribe(data => {
				const settings: any = data['user'].settings;
				
	  			this.menu.enable(true, 'authenticated');
				this.results.push(data['user']);
				this.results.push(data['storage']);
				this.results.push(data['storageName']);
				this.id = data['user'].user[0].id;
				this.token = data['user'].user[0].remember_token;
				sessionStorage.setItem('user', data['user'].user[0].id);
				sessionStorage.setItem('token', data['user'].user[0].remember_token);
				sessionStorage.setItem('name', data['user'].user[0].contact.name);
				sessionStorage.setItem('email', data['user'].user[0].email);
				sessionStorage.setItem('dns', new_dns);
				sessionStorage.setItem('sale_represent_id', data['user'].sale_represent_id);

				localStorage.email = email;
				localStorage.password = this.password;
				localStorage.dns = this.dns;
				this.navCtrl.setRoot(OrganizationsPage, this.results);
				console.log(this.results);

				// console.log(settings);

				saveSettingsInLocal(settings);

				// console.log(localStorage.getItem('settings_sale'));
				// console.log(localStorage.getItem('settings_configuration'));

			}, error => {
				if (error.status === 406) {
					console.log("contrase;a incorrecta");
					this.translateService.get('Alerta3').subscribe(
						value => {
							let message = value['MensajeAlerta'];
							let text = value['TextAlerta'];
							this.loading.dismiss().then( () => {
								let alert = this.alertCtrl.create({
									message: message,
									buttons: [
									{
										text: text,
										role: 'cancel'
									}
									]	
								});
							alert.present();
							});
						});
                } else if (error.status === 500 ){
					console.log("email incorrecto");
					this.translateService.get('Alerta4').subscribe(
						value => {
							let message = value['MensajeAlerta'];
							let text = value['TextAlerta'];
							this.loading.dismiss().then( () => {
								let alert = this.alertCtrl.create({
									message: message,
									buttons: [
										{
											text: text,
											role: 'cancel'
										}
									]	
								});
							alert.present();
							});
						});
				} else if (error.status === 0){
					console.log("falla de conexion a internet");
					this.translateService.get('Alerta5').subscribe(
						value => {
							let message = value['MensajeAlerta'];
							let text = value['TextAlerta'];
							this.loading.dismiss().then( () =>{
								let alert = this.alertCtrl.create({
									message: message,

									buttons: [
										{
											text: text,
											role: 'cancel'
										}
									]
								});
							alert.present();
							});
						});
				}
				console.log("mensaje de error", error);
			});// fin de susbcribe
	  	this.loading = this.loadingCtrl.create({
			dismissOnPageChange: true,
		});
		this.loading.present();
	}// fin de metodo

	goToSignup(){
		this.navCtrl.push(SignupPage);
	}

	goToResetPassword(){		
		this.navCtrl.push(ResetpasswordPage);
	}
	
	products(){
		this.navCtrl.push(ProductsPage);
	}
	
	products1(){
		this.navCtrl.push(SeeproductPage);
	}
}