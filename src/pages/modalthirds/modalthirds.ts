import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,LoadingController, AlertController } from 'ionic-angular';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { constants } from './../../const/const';
import { TranslateService } from '@ngx-translate/core';
import 'rxjs/add/operator/debounceTime';


@IonicPage()
@Component({
  selector: 'page-modalthirds',
  templateUrl: 'modalthirds.html',
})
export class ModalthirdsPage {

  clients: any;
  id: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              public viewCtrl: ViewController,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public translateService: TranslateService
              ) {
    this.id = sessionStorage.getItem('user');
  }

  ionViewDidLoad() {
    this.getClients();
  }

  getClients(){
    this.translateService.get('Por favor espere...').subscribe(
      value => {
        let content = value;
        let loading = this.loadingCtrl.create({
          content: content
          });
        loading.present();
  
      return this.http.get(constants.apiclients+this.id,
        { headers: new HttpHeaders()
        .set('authorization', sessionStorage.getItem('dns'))
        .append('app', 'BananaApp')
        .append('organization', sessionStorage.getItem('organization_id') )
        .append('user', sessionStorage.getItem('user'))
        .append('Access-Control-Allow-Origin', '*')
        .append('token', sessionStorage.getItem('token'))
      }).subscribe ( data=> {
        loading.dismissAll();
        this.clients = data['clients'];
      }, error => {
        console.log(error);
      });
    });
  }

  buscar(event){
    let search = event.target.value;
    this.translateService.get('Por favor espere...').subscribe(
      value => {
        let content = value;
        let loading = this.loadingCtrl.create({
          content: content
          });
        loading.present();

      return this.http.get(constants.apisearchclient+this.id,
        { headers: new HttpHeaders()
          .set('authorization', sessionStorage.getItem('dns'))
          .append('app', 'BananaApp')
          .append('organization', sessionStorage.getItem('organization_id') )
          .append('user', sessionStorage.getItem('user'))
          .append('Access-Control-Allow-Origin', '*')
          .append('token', sessionStorage.getItem('token')),
          params: new HttpParams()
            .set('search', search)
        }).subscribe ( data=> {
          loading.dismissAll();
          this.clients = data['clients'];
          // console.log(this.clients);
        }, error => {
          console.log(error);
      });
    });
  }
         
  selectClient(c){
    console.log('CLIENTE SELECCIONADO DESDE EL SELECT',c);
  }

  close(c){
    this.viewCtrl.dismiss(c);
    console.log(c);
  }

  // cerrar(){
  //   let d = null;
  //   this.viewCtrl.dismiss(d);
  //   console.log('cerro sin datos');
  // }
}
