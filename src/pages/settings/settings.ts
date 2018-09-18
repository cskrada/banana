import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  idioms: any[] = [];
  defaultLanguage: string = this.translateService.getDefaultLang();

  constructor(public navCtrl: NavController, public navParams: NavParams, public translateService: TranslateService) {
     this.idioms = [
       {
         value: 'es',
         label: 'Español'
       },
       {
        value: 'en',
        label: 'Inglés'
      }
     ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  changeLanguage(language){
    this.translateService.use(language);
    this.translateService.setDefaultLang(language);
    console.log(this.translateService.getDefaultLang());
  }

}
