import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { constants } from './../../const/const';

@IonicPage()
@Component({
  selector: 'page-seesaleorder',
  templateUrl: 'seesaleorder.html',
})
export class SeesaleorderPage {

  ordersale: any;
  document_resource: any;
  reference: any;
  body_documents: any;
  currencies: any;
  document: any;
  footer: any[]=[];
  status: any;
  color: any;
  

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public translateService: TranslateService) {
    this.ordersale= this.navParams.data;
    this.reference= this.navParams.get('reference');

    console.log('ordersale',this.ordersale);
    // console.log('reference  order sale',this.reference);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeesaleorderPage');
    this.getResources();
  }

  getResources(){
    this.translateService.get('Por favor espere...').subscribe(
      value => {
        let content = value;
        let loading = this.loadingCtrl.create({
          content: content
        });
        loading.present();

        return this.http.get(constants.apidocument+this.reference,
        { headers: new HttpHeaders()
          .set('authorization', sessionStorage.getItem('dns'))
          .append('app', 'BananaApp')
          .append('organization', sessionStorage.getItem('organization_id') )
          .append('user', sessionStorage.getItem('user'))
          .append('Access-Control-Allow-Origin', '*')
          .append('token', sessionStorage.getItem('token'))
          ,
          params: new HttpParams()
            .set('type_document_id', '2')
        }).subscribe ( data=> {
          loading.dismissAll();
          this.document_resource = data;
          this.body_documents = data['body_documents'];
          this.currencies = data['currencies'];
          this.document = data['document'];
          this.footer = data['footer_document'];
          this.status = data['status']; 

          for (let a of this.status){
            // console.log('a',a);

            if ( a.text == this.ordersale.status_name && a.id == 0){
              this.color = 'bananadan';
            }
            if ( a.text == this.ordersale.status_name && a.id == 1){
              this.color = 'bananadan';
            }
            if ( a.text == this.ordersale.status_name && a.id == 2){
              this.color = 'bananaps';
            }
            if ( a.text == this.ordersale.status_name && a.id == 3){
              this.color = 'bananadanger';
            }
            if ( a.text == this.ordersale.status_name && a.id == 4){
              this.color = 'light';
            }
            if ( a.text == this.ordersale.status_name && a.id == 5){
              this.color = 'bananasecondary';
            }
          }

// 0: {id: 3, text: "ANULADO", next_status_id: null, next_status_name: null}
// 1: {id: 0, text: "PENDIENTE POR ENVIAR", next_status_id: 1, next_status_name: "PENDIENTE POR VALIDAR"}
// 2: {id: 1, text: "PENDIENTE POR VALIDAR", next_status_id: 2, next_status_name: "VALIDADO"}
// 3: {id: 5, text: "PROCESADO", next_status_id: null, next_status_name: null}
// 4: {id: 4, text: "PROCESADO PARCIALMENTE", next_status_id: 5, next_status_name: "PROCESADO"}
// 5: {id: 2, text: "VALIDADO", next_status_id: 3, next_status_name: "ANULADO"}

          console.log('status', this.status);
          // console.log('documentTODO', this.document_resource);
          // console.log('body documents', this.body_documents);
          // console.log('currencies', this.currencies);
          // console.log('document', this.document);
          // console.log('footer document', this.footer);
        }, error => {
          console.log(error);
        });
    });
  }

  seeProduct(b){
    this.translateService.get('AlertaSeeSaleOrder').subscribe( 
			value=>{
				let ref = value['MensajeAlerta'];
				let message = value['botonMensaje'];

				const alert = this.alertCtrl.create({
					title: b.name,
          subTitle: b.description_product,
          message: ref+ b.reference,
          buttons: [message]
				});
				alert.present();
			});

    // const alert = this.alertCtrl.create({
    //   title: b.name,
    //   subTitle: b.description_product,
    //   message: 'Referencia: '+ b.reference,
    //   buttons: ['OK']
    // });
    // alert.present();

  }

}
