//importacion de librerias
import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController,Loading, AlertController, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Md5 } from 'ts-md5/dist/md5';

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
	public cadena : string;

constructor(public navCtrl: NavController,
			public formBuilder:FormBuilder,
			public alertCtrl: AlertController,
			public loadingCtrl: LoadingController,
			public menu: MenuController,
			public http: HttpClient,
			public translateService: TranslateService){
	
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
		const md5 = new Md5();
		console.log(this.myForm.value.email);
		let e = md5.appendStr(this.myForm.value.password).end();
		console.log(e);
		this.postLogin(this.myForm.value.email,e);
	}
	
	// http://bananaservertest.herokuapp.com/api/login
	postLogin(email: string, password: any){
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
				this.navCtrl.setRoot(HomePage);
				console.log(this.results);

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


	// statusHttp(){
	// 	return this.http.request(new Request(this.requestoptions))
    //         .map((res: Response) => {
    //             if (res) {
    //                 if (res.status === 201) {
    //                     return [{ status: res.status, json: res }]
    //                 }
    //                 else if (res.status === 200) {
    //                     return [{ status: res.status, json: res }]
    //                 }
    //             }
    //         }).catch((error: any) => {
    //             if (error.status === 500) {
    //                 return Observable.throw(new Error(error.status));
    //             }
    //             else if (error.status === 400) {
    //                 return Observable.throw(new Error(error.status));
    //             }
    //             else if (error.status === 409) {
    //                 return Observable.throw(new Error(error.status));
    //             }
    //             else if (error.status === 406) {
    //                 return Observable.throw(new Error(error.status));
    //             }
    //         });
    // }
	
}