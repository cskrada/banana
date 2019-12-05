import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeesaleorderPage } from './seesaleorder';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SeesaleorderPage,
  ],
  imports: [
    IonicPageModule.forChild(SeesaleorderPage),
    TranslateModule
  ],
})
export class SeesaleorderPageModule {}
