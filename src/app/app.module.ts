import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {MyListsPage} from "../pages/my-lists/my-lists";
import {BookDetailsPage} from "../pages/book-details/book-details";
import {ListDetailsPage} from "../pages/list-details/list-details";

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {DbApiService} from "../services/db-api.service";
import {IonicStorageModule} from "@ionic/storage";
import {UserSettingsService} from "../services/user-settings.service";

export const firebaseConfig = {
  apiKey: "AIzaSyAHdOnwueJd0P6QXsYX7kPH8Lu0Q2pDX0o",
  authDomain: "bibliotecapp-957bc.firebaseapp.com",
  databaseURL: "https://bibliotecapp-957bc.firebaseio.com",
  projectId: "bibliotecapp-957bc",
  storageBucket: "bibliotecapp-957bc.appspot.com",
  messagingSenderId: "242210099480"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MyListsPage,
    BookDetailsPage,
    ListDetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MyListsPage,
    BookDetailsPage,
    ListDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireDatabase,
    DbApiService,
    UserSettingsService
  ]
})
export class AppModule {}
