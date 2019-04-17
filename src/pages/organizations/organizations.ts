import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { constants } from './../../const/const';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HomePage } from './../home/home';

@IonicPage()
@Component({
  selector: 'page-organizations',
  templateUrl: 'organizations.html',
})
export class OrganizationsPage {

  public user_id : any;
  public organizations = [[]] ;
  public org: any;
  // public resources : any []= [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    this.user_id = sessionStorage.getItem('user');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrganizationsPage');
    this.getOrganizations();
  }
  getOrganizations(){
    return this.http.get(constants.apiorganization,
      { headers: new HttpHeaders()
      .set('authorization', 'http://localhost:4200')
      .append('app', 'BananaApp')
      .append('user', sessionStorage.getItem('user'))
      .append('Access-Control-Allow-Origin', '*')
      .append('token', sessionStorage.getItem('token'))
    }).subscribe ( data=> {
      this.organizations = data['organizations'];
      console.log('organizations', this.organizations);
    }, error => {
      console.log(error);
  });
  }
  home(org){
     sessionStorage.setItem('organization_id', org.id)
    // console.log('session',org.id);
    // console.log('session getItem organization_id',sessionStorage.getItem('organization_id'));
		this.navCtrl.setRoot(HomePage, org);
	}

}
