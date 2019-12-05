import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalthirdsPage } from './modalthirds';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ModalthirdsPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalthirdsPage),
    TranslateModule
  ],
})
export class ModalthirdsPageModule {}
