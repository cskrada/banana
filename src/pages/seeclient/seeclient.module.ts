import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeeclientPage } from './seeclient';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SeeclientPage,
  ],
  imports: [
    IonicPageModule.forChild(SeeclientPage),
    TranslateModule
  ],
})
export class SeeclientPageModule {}
