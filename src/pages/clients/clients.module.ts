import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientsPage } from './clients';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from './../../pipes/pipes.module';

@NgModule({
  declarations: [
    ClientsPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientsPage),
    PipesModule,
    TranslateModule
  ],
})
export class ClientsPageModule {}
