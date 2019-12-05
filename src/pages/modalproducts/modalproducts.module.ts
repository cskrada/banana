// import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalproductsPage } from './modalproducts';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ModalproductsPage,
    // ProductsearchPipe
  ],
  imports: [
    IonicPageModule.forChild(ModalproductsPage),
    // PipesModule,
    // ProductsearchPipe,
    TranslateModule
  ],
})
export class ModalproductsPageModule {}
