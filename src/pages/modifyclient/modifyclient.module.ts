import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifyclientPage } from './modifyclient';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ModifyclientPage,
  ],
  imports: [
    IonicPageModule.forChild(ModifyclientPage),
    TranslateModule
  ],
})
export class ModifyclientPageModule {}
