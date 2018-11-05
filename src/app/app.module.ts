import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { EmailComposer } from '@ionic-native/email-composer';
import { CallNumber } from '@ionic-native/call-number';
import { Md5 } from 'ts-md5/dist/md5';

import { HttpModule } from '@angular/http'; 
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { InputTextModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ClientsPage } from '../pages/clients/clients';
import { SeeclientPage } from '../pages/seeclient/seeclient';
import { AddclientPage } from '../pages/addclient/addclient';
import { SignupPage } from '../pages/signup/signup';
import { ResetpasswordPage } from '../pages/resetpassword/resetpassword';
import { EmailPage } from '../pages/email/email';
import { SettingsPage } from '../pages/settings/settings';
import { ProfilePage } from '../pages/profile/profile';
import { OrdersPage } from './../pages/orders/orders';

import { ChartsModule } from 'ng2-charts';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Providers
import { DataProvider } from '../providers/data/data';
import { ClientProvider } from '../providers/data/client';
import { ResetProvider } from '../providers/data/reset';
import { ClientsProvider } from '../providers/data/clients';

// Pipes
import { SearchPipe } from '../pipes/search/search';
import { SortPipe } from '../pipes/sort/sort';

export function setTranslateLoader( http: HttpClient) {
  return new TranslateHttpLoader( http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ClientsPage,
    SeeclientPage,
    AddclientPage,
    SignupPage,
    ResetpasswordPage,
    EmailPage,
    SettingsPage,
    ProfilePage,
    OrdersPage,
    SearchPipe,
    SortPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
      TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (setTranslateLoader),
        deps: [HttpClient]
        }
      }),
    ChartsModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ClientsPage,
    SeeclientPage,
    AddclientPage,
    SignupPage,
    ResetpasswordPage,
    EmailPage,
    SettingsPage,
    ProfilePage,
    OrdersPage
  ],
  providers: [
    InAppBrowser,
    StatusBar,
    SplashScreen,
    EmailComposer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    ClientProvider,
    ResetProvider,
    Md5,
    ClientsProvider,
    CallNumber
  ]
})
export class AppModule {}