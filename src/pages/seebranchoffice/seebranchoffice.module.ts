import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeebranchofficePage } from './seebranchoffice';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SeebranchofficePage,
  ],
  imports: [
    IonicPageModule.forChild(SeebranchofficePage),
    TranslateModule
  ],
})
export class SeebranchofficePageModule {}
