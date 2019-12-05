import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddordersalePage } from './addordersale';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AddordersalePage,
  ],
  imports: [
    IonicPageModule.forChild(AddordersalePage),
    TranslateModule
  ],
})
export class AddordersalePageModule {}
