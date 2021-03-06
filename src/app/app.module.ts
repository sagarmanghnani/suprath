import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {HttpModule} from '@angular/http';
import { LoginPage } from '../pages/login/login';
import { CreateTicketPage } from '../pages/create-ticket/create-ticket';
import {ShowTicketPage} from '../pages/show-ticket/show-ticket';
import { UpdateTicketsPage } from '../pages/update-tickets/update-tickets';
import { IonicStorageModule } from '@ionic/storage';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CreateTicketPage,
    ShowTicketPage,
    UpdateTicketsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CreateTicketPage,
    ShowTicketPage,
    UpdateTicketsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
