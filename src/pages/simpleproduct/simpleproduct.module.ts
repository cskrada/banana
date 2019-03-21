import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SimpleproductPage } from './simpleproduct';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    SimpleproductPage,
  ],
  imports: [
    IonicPageModule.forChild(SimpleproductPage),
    TranslateModule
  ],
})
export class SimpleproductPageModule {}
