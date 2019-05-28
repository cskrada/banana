import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifycontactclientPage } from './modifycontactclient';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ModifycontactclientPage,
  ],
  imports: [
    IonicPageModule.forChild(ModifycontactclientPage),
    TranslateModule
  ],
})
export class ModifycontactclientPageModule {}
