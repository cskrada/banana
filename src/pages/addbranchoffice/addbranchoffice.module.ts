import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddbranchofficePage } from './addbranchoffice';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AddbranchofficePage,
  ],
  imports: [
    IonicPageModule.forChild(AddbranchofficePage),
    TranslateModule
  ],
})
export class AddbranchofficePageModule {}
