import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactsclientPage } from './contactsclient';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ContactsclientPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactsclientPage),
    TranslateModule
  ],
})
export class ContactsclientPageModule {}
