import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-addclient',
  templateUrl: 'addclient.html',
})
export class AddclientPage {
	
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
  }

	ionViewDidLoad() {
		console.log('ionViewDidLoad AddclientPage');
	}
	
	close(){
		this.viewCtrl.dismiss();
	}

}