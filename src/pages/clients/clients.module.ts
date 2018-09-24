import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientsPage } from './clients';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ClientsPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientsPage),
    TranslateModule
  ],
})
export class ClientsPageModule {}
