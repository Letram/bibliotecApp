import { Component, ViewChild } from '@angular/core';
import {Events, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {ListDetailsPage} from "../pages/list-details/list-details";
import {BookDetailsPage} from "../pages/book-details/book-details";
import {MyListsPage} from "../pages/my-lists/my-lists";
import {UserSettingsService} from "../services/user-settings.service";
import {DbApiService} from "../services/db-api.service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;

  favouriteBooks:any=[];
  myLists:any=[];
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              private userSettings: UserSettingsService,
              private events: Events,
              private dbApi: DbApiService) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'List-Details', component: ListDetailsPage},
      { title: 'Book-Details', component: BookDetailsPage},
      { title: 'My-Lists', component: MyListsPage}
    ];

    this.events.subscribe("favourites:changed", ()=>{
      this.favouriteBooks = this.userSettings.getAllFavourites(true);
    });
    this.favouriteBooks = this.userSettings.getAllFavourites(true);
    this.dbApi.getLists().subscribe((lists) => {
      this.myLists = lists;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
  }

  //******************************************************************************************//
  openBookDetails(book){
    this.nav.push(BookDetailsPage, book);
  }
  openListsPage(){
    this.nav.push(MyListsPage);
  }
}
