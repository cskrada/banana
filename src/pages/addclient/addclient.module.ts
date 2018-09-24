import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddclientPage } from './addclient';

@NgModule({
  declarations: [
    AddclientPage,
  ],
  imports: [
    IonicPageModule.forChild(AddclientPage),
    TranslateModule
  ],
})
export class AddclientPageModule {}
