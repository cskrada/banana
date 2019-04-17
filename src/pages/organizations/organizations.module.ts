import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrganizationsPage } from './organizations';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    OrganizationsPage,
  ],
  imports: [
    IonicPageModule.forChild(OrganizationsPage),
    TranslateModule
  ],
})
export class OrganizationsPageModule {}
