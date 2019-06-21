import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController} from 'ionic-angular';
import { constants } from './../../const/const';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { AddbranchofficePage } from './../addbranchoffice/addbranchoffice';
import { SeebranchofficePage } from './../seebranchoffice/seebranchoffice';

@IonicPage()
@Component({
  selector: 'page-branchofficesclients',
  templateUrl: 'branchofficesclients.html',
})
export class BranchofficesclientsPage {
  public client: any[] = [];
  public id: string;
  public branchOffice: any;
  message: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              public translateService: TranslateService,
              public loadingCtrl: LoadingController) {
    this.client = this.navParams.data;
    this.id = this.navParams.get('id');

    
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad BranchofficesclientsPage');
  }

  ionViewDidEnter(){
		this.getBranchOffices();
	}

  getBranchOffices(){
    this.translateService.get('Por favor espere...').subscribe(
      value => {
        let content = value;
        let loading = this.loadingCtrl.create({
          content: content
          });
        loading.present();
        return this.http.get(constants.apibranchoffices+this.id,
          { headers: new HttpHeaders()
            .set('authorization', 'http://localhost:4200')
            .append('app', 'BananaApp')
            .append('organization', sessionStorage.getItem('organization_id') )
            .append('user', sessionStorage.getItem('user'))
            .append('Access-Control-Allow-Origin', '*')
            .append('token', sessionStorage.getItem('token'))
          }).subscribe ( data=> {
            loading.dismissAll();
            this.branchOffice = data;
            if (this.branchOffice.length === 0){
              this.message= 'No se encuentra ninguna sucursal asociado a este prospecto';
            }
          }, error => {
            console.log(error);
        });
      });
  }

  addBranchOffice(client){
    this.navCtrl.push(AddbranchofficePage, client);
  }

  seeBranchOffice(c){
    this.navCtrl.push(SeebranchofficePage, c);
  }

}
