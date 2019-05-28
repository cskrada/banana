import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BranchofficesclientsPage } from './branchofficesclients';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    BranchofficesclientsPage,
  ],
  imports: [
    IonicPageModule.forChild(BranchofficesclientsPage),
    TranslateModule
  ],
})
export class BranchofficesclientsPageModule {}
