import { Component,ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, Loading, LoadingController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

import { HomePage } from '../pages/home/home';
import { ClientsPage } from '../pages/clients/clients';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = LoginPage;
  pages: Array<{title: string, component: any, icon: string}>;

  loading : Loading;
  email : string;
  password : string;
  public session: boolean;
  public results : string[] = [];
  public icon : string;

// --------------------------------------------------------------------------------------------
  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public menu: MenuController, 
              public http: HttpClient,
              public loadingCtrl: LoadingController,
              public translate: TranslateService){

    this.platform.ready().then(() => {
      // Language
      this.translate.setDefaultLang('es');
      this.translate.use('es');
          this.statusBar.styleDefault();
          this.splashScreen.hide();
    });

    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('name');
  
    this.postLogin(this.email, this.password);

    

    this.pages = [
      { title: 'Escritorio', component: HomePage, icon: "home" },
      { title: 'Clientes', component: ClientsPage, icon: "people" }
    ];
  }//------------------------------------fin de constructor-----------------------------------
  postLogin(email: string, password: string){
      this.http.post('http://vbanana.tk/laravel-banana/public/api/login',
            { email, password }, 
            { headers: new HttpHeaders()
                .set('authorization', 'http://localhost:4200')
                .set('app', 'BananaApp')
      }).subscribe(data => {
        this.menu.enable(true, 'authenticated');
        this.results.push(data['user']);
        this.results.push(data['storage']);
        this.results.push(data['storageName']);
        console.log(this.results);
      }, error => {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('name');
        console.log('no');
      });
  }
  
  openPage(page) {
    this.nav.setRoot(page.component);
  }

  logOut() {

    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
      duration: 3000,
		});
    this.loading.present();

    this.menu.enable(false); 
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('email');
    this.nav.setRoot(LoginPage);
  }

}

  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     this.statusBar.styleDefault();
  //     this.splashScreen.hide();
  //   });
  // }