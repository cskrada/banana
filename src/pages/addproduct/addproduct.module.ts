import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddproductPage } from './addproduct';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AddproductPage,
  ],
  imports: [
    IonicPageModule.forChild(AddproductPage),
    TranslateModule
  ],
})
export class AddproductPageModule {}
