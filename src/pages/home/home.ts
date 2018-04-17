import { Component } from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {DbApiService} from "../../services/db-api.service";
import {BookDetailsPage} from "../book-details/book-details";
import {UserSettingsService} from "../../services/user-settings.service";
import {UserAuthService} from "../../services/user-auth.service";
import {LoginPage} from "../login/login";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  books:any;
  favouriteBooks_id:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private dbApi:DbApiService,
              private loader:LoadingController,
              private toaster: ToastController,
              private userSettings: UserSettingsService,
              private userAuth: UserAuthService,
              private events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');

    let loader = this.loader.create({
      content: 'Accediendo a los datos ...',
      spinner: 'dots'
    });
    loader.present().then(()=>{
      this.dbApi.getBooks().subscribe(
        (data) => {this.books = data;
          loader.dismiss();
        }
      );
    });

    this.events.subscribe("favourites:changed", ()=>{
      this.favouriteBooks_id = this.userSettings.getAllFavourites();
    });
    this.favouriteBooks_id = this.userSettings.getAllFavourites();
  }

  bookSelected(book) {
    this.navCtrl.push(BookDetailsPage, book);
  }

  toggleFavourite(book) {
    let sentence = "";
    if(this.favouriteBooks_id.includes(book.id)){
      this.userSettings.unfavouriteBook(book);
      sentence = "\"" + book.name + "\" removed from your favourites!";
    }else{
      this.dbApi.getBookData(book.id).subscribe((book_data) => {
        this.userSettings.favouriteBook(book_data.name, book_data.author, book_data.genre, book_data.publishDate, book.id);
      });
      sentence = "\"" + book.name + "\" added to your favourites!";
    }
    let toast = this.toaster.create({
      message: sentence,
      duration: 3000,
      position: "bottom"
    });
    toast.present();
  }

  logout(){
    this.userAuth.signOut().then(()=>{
      this.navCtrl.setRoot(LoginPage).then(()=>{
        this.navCtrl.popToRoot();
      });
    });
  }
}
