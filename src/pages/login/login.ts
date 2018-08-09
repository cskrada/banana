//importacion de librerias
import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController,Loading, AlertController, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//importacion de paginas
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { ResetpasswordPage } from '../resetpassword/resetpassword';

@IonicPage()
@Component({
selector: 'page-login',
templateUrl: 'login.html',
})
export class LoginPage {

	myForm: FormGroup;
	public loading:Loading;
	public results : string[] = [];

constructor(public navCtrl: NavController,
				public formBuilder:FormBuilder,
				public alertCtrl: AlertController,
				public loadingCtrl: LoadingController,
				public menu: MenuController,
				public http: HttpClient ){
	
	this.myForm = this.formBuilder.group({
		email: ['', Validators.required],
		password: ['', Validators.required]
	});

}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage');
		this.menu.enable(false);
	}


	loginUser2(){
		console.log(this.myForm.value.email);
		console.log(this.myForm.value.password);
		this.postLogin(this.myForm.value.email,this.myForm.value.password);

	}
// 192.168.1.66:8000 conexion globalpc
	postLogin(email: string, password: string){
	  	this.http.post('http://192.168.1.66:8000/api/login',
						{ email, password }, 
						{ headers: new HttpHeaders()
	  						.set('authorization', 'http://localhost:4200')
	  						.set('app', 'BananaCli')
	  	}).subscribe(data => {
	  			this.menu.enable(true, 'authenticated');
				this.results.push(data['user']);
				this.results.push(data['storage']);
				this.results.push(data['storageName']);
				console.log(this.results);
				this.navCtrl.setRoot(HomePage);
			}, error => {
				this.loading.dismiss().then( () => {
				let alert = this.alertCtrl.create({
					message: "el email o la contraseña no es correcta, por favor ingrese de nuevo sus datos",
					buttons: [
					{
						text: "Ok",
						role: 'cancel'
					}
					]
				});
				alert.present();
			});
			console.log(error);
		});// fin de susbcribe
	  	this.loading = this.loadingCtrl.create({
			dismissOnPageChange: true,
		});
		this.loading.present();
	}

	goToSignup(){
		this.navCtrl.push(SignupPage);
	}

	goToResetPassword(){

		this.http.get('https://randomuser.me/api/?results=25').subscribe(
			(data) => { // Success
				
				this.navCtrl.push(ResetpasswordPage);
			}, (error) =>{
				console.error(error);
				this.loading.dismiss().then( () => {
					let alert = this.alertCtrl.create({
						message: "error",
						buttons: [
						{
							text: "Ok",
							role: 'cancel'
						}
						]
					});
					alert.present();
				});
			});
		this.loading = this.loadingCtrl.create({
			dismissOnPageChange: true,
		});
		this.loading.present();
	}

}
	// loginUser(){
	// 	console.log("Email:" + this.myForm.value.email);
	// 	console.log("Password:" + this.myForm.value.password);
	// 	this.afAuth.auth.signInWithEmailAndPassword(this.myForm.value.email, this.myForm.value.password).then(() => {
	// 		console.log("User logging");
	// 		this.navCtrl.setRoot(HomePage);
	// 		}, (err) => {
	// 		this.loading.dismiss().then( () => {
	// 			let alert = this.alertCtrl.create({
	// 				message: err.message,
	// 				buttons: [
	// 				{
	// 					text: "Ok",
	// 					role: 'cancel'
	// 				}
	// 				]
	// 			});
	// 			alert.present();
	// 		});
	// 	});
	// 	this.loading = this.loadingCtrl.create({
	// 		dismissOnPageChange: true,
	// 	});
	// 	this.loading.present();
	// }