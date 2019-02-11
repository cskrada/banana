import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeeproductPage } from './seeproduct';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SeeproductPage,
  ],
  imports: [
    IonicPageModule.forChild(SeeproductPage),
    TranslateModule
  ],
})
export class SeeproductPageModule {}
