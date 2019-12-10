import { SignaturePadModule } from 'angular2-signaturepad';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalsignaturePage } from './modalsignature';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ModalsignaturePage,
  ],
  imports: [
    IonicPageModule.forChild(ModalsignaturePage),
    SignaturePadModule,
    TranslateModule
  ],
})
export class ModalsignaturePageModule {}
