import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';

// importacion de DataProvider
import { ClientsProvider } from '../../providers/data/clients';

@IonicPage()
@Component({
  selector: 'page-email',
  templateUrl: 'email.html',
})
export class EmailPage {

   items: any;
   subject= '';
   body='';
   to='';

   constructor(public navCtrl: NavController, 
   			  public navParams: NavParams,
   			  public dataService: ClientsProvider, 
   			  public emailComposer: EmailComposer) {
      this.items = this.navParams.data;
   }

   ionViewDidLoad() {
      console.log('ionViewDidLoad EmailPage');
   }

   send(){
      let email = {
         to : this.to,
         cc: [],
         bcc: [],
         attachament: [],
         subject: this.subject,
         body: this.body,
         isHtml: false,
         app: "Gmail"
      }
      this.emailComposer.open(email);
   }
}