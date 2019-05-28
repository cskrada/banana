import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeecontactclientPage } from './seecontactclient';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SeecontactclientPage,
  ],
  imports: [
    IonicPageModule.forChild(SeecontactclientPage),
    TranslateModule
  ],
})
export class SeecontactclientPageModule {}
