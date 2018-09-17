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

	public id : string;
	public tokencsk : string;
	myForm: FormGroup;
	public loading:Loading;
	public results : string[] = [];

constructor(public navCtrl: NavController,
			public formBuilder:FormBuilder,
			public alertCtrl: AlertController,
			public loadingCtrl: LoadingController,
			public menu: MenuController,
			public http: HttpClient){
	
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
	
// http://bananaservertest.herokuapp.com/api/login

	postLogin(email: string, password: string){
	  	this.http.post('http://vbanana.tk/laravel-banana/public/api/login',
						{ email, password }, 
						{ headers: new HttpHeaders()
	  						.set('authorization', 'http://localhost:4200')
							  .append('app', 'BananaApp')
							  .append('Access-Control-Allow-Origin', '*')
	  		}).subscribe(data => {
	  			this.menu.enable(true, 'authenticated');
				this.results.push(data['user']);
				this.results.push(data['storage']);
				this.results.push(data['storageName']);
				this.id = data['user'].user[0].id;
				this.tokencsk = data['user'].user[0].remember_token;
				sessionStorage.setItem('user', data['user'].user[0].id);
				sessionStorage.setItem('token', data['user'].user[0].remember_token);
				sessionStorage.setItem('name', data['user'].user[0].contact_id.name);
				sessionStorage.setItem('email', data['user'].user[0].email);
				// console.log("this.id",this.id);
				// console.log("this.tokencsk",this.tokencsk);
				this.navCtrl.setRoot(HomePage);
				console.log(this.results);
				// console.log('id: ', data['user'].user[0].id);
				// console.log('token: ', data['user'].user[0].remember_token);
				// console.log('name: ', data['user'].user[0].name);

			}, error => {
				// console.log(this.tokencsk);
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
		this.navCtrl.push(ResetpasswordPage);

	}

}