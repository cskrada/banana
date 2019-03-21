import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CombinationproductPage } from './combinationproduct';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    CombinationproductPage,
  ],
  imports: [
    IonicPageModule.forChild(CombinationproductPage),
    TranslateModule
  ],
})
export class CombinationproductPageModule {}
