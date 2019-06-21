import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import { constants } from './../../const/const';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AddcontactclientPage } from './../addcontactclient/addcontactclient';
import { SeecontactclientPage } from './../seecontactclient/seecontactclient';


@IonicPage()
@Component({
  selector: 'page-contactsclient',
  templateUrl: 'contactsclient.html',
})
export class ContactsclientPage {
  public client: any[]=[];
  public contacts: any;
  public id : string;
  public message: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              public loadingCtrl: LoadingController,
              public translateService: TranslateService) {
    this.client= this.navParams.data;
    this.id = this.navParams.get('id');

    // console.log('contacts client',this.client);
    // console.log('contacts ID client',this.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactsclientPage');
  }

  ionViewDidEnter(){
		this.getContacts();
	}

  getContacts(){
    this.translateService.get('Por favor espere...').subscribe(
      value => {
        let content = value;
        let loading = this.loadingCtrl.create({
          content: content
          });
        loading.present();

      return this.http.get(constants.apicontactsclient+this.id,
        { headers: new HttpHeaders()
          .set('authorization', 'http://localhost:4200')
          .append('app', 'BananaApp')
          .append('organization', sessionStorage.getItem('organization_id') )
          .append('user', sessionStorage.getItem('user'))
          .append('Access-Control-Allow-Origin', '*')
          .append('token', sessionStorage.getItem('token'))
        }).subscribe ( data=> {
          loading.dismissAll();
          this.contacts = data;
          console.log('get contacts DATA', this.contacts);
          

        }, error => {
          console.log(error);
      });
    });
  }

  addContactClient(client){
    this.navCtrl.push(AddcontactclientPage, client);
  }

  seeContactClient(c,client){
    this.navCtrl.push(SeecontactclientPage, {c,client});
  }

}
