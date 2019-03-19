import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddclientPage } from './addclient';
// import { Select2Component } from 'angular-select2-component';

@NgModule({
  declarations: [
    AddclientPage,
    // Select2Component
  ],
  imports: [
    IonicPageModule.forChild(AddclientPage),
    TranslateModule
  ],
})
export class AddclientPageModule {}
