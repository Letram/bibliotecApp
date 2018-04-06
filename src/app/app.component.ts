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

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  public bookDetailsPage = BookDetailsPage;

  pages: Array<{title: string, component: any}>;
  books:any=[];
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              private userSettings: UserSettingsService,
              private events: Events) {
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
      this.books = this.userSettings.getAllFavourites(true);
    });
    this.books = this.userSettings.getAllFavourites(true);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  openBookDetails(book){
    this.nav.push(BookDetailsPage, book);
  }
}
