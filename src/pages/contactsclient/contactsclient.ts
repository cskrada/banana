import { Component } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number';
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
  public on: any;
  phone: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              public loadingCtrl: LoadingController,
              public translateService: TranslateService,
              private callNumber: CallNumber) {
    this.id= this.navParams.data; //ID de tercero
    console.log('ID DE TERCEROS',this.id)
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
          .set('authorization', sessionStorage.getItem('dns'))
          .append('app', 'BananaApp')
          .append('organization', sessionStorage.getItem('organization_id') )
          .append('user', sessionStorage.getItem('user'))
          .append('Access-Control-Allow-Origin', '*')
          .append('token', sessionStorage.getItem('token'))
        }).subscribe ( data=> {
          loading.dismissAll();
          this.contacts = data;
          console.log('get contacts DATA', this.contacts);

          if( this.contacts.length == 0){
            this.on = 0;
            console.log('no tiene contactos');
          }else{
            this.on = 1;
          }
          

        }, error => {
          console.log(error);
      });
    });
  }

  call(phone){
    this.callNumber.callNumber(phone, true)
		.then(res => console.log('Launched dialer!', res))
		.catch(err => console.log('Error launching dialer', err));
  }

  addContactClient(){
    this.navCtrl.push(AddcontactclientPage, this.id);
  }

  seeContactClient(c){
    this.navCtrl.push(SeecontactclientPage, {c,id:this.id});
  }

}
