import { Component,ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { HomePage } from '../pages/home/home';
import { ClientsPage } from '../pages/clients/clients';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = LoginPage;
  pages: Array<{title: string, component: any}>;

  email : string;
  password : string;
  public session: boolean;
  public results : string[] = [];
  

// --------------------------------------------------------------------------------------------
  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public menu: MenuController, 
              public http: HttpClient){
   this.postLogin(this.email, this.password);

    

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Clients', component: ClientsPage }
    ];
  }//------------------------------------fin de constructor-----------------------------------
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
      }, error => {
        console.log('no');
      });
  }
  
  openPage(page) {
    this.nav.setRoot(page.component);
  }

  logOut() {
    this.menu.enable(false); 
    this.nav.setRoot(LoginPage);
  }

}

  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     this.statusBar.styleDefault();
  //     this.splashScreen.hide();
  //   });
  // }