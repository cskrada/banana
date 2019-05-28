import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddcontactclientPage } from './addcontactclient';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AddcontactclientPage,
  ],
  imports: [
    IonicPageModule.forChild(AddcontactclientPage),
    TranslateModule,
  ],
})
export class AddcontactclientPageModule {}
