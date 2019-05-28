import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifybranchofficePage } from './modifybranchoffice';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ModifybranchofficePage,
  ],
  imports: [
    IonicPageModule.forChild(ModifybranchofficePage),
    TranslateModule
  ],
})
export class ModifybranchofficePageModule {}
