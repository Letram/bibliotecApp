import {Component} from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  IonicPage,
  LoadingController,
  NavController,
  Events,
  ToastController, 

  NavParams
} from 'ionic-angular';
import {DbApiService} from "../../services/db-api.service";
import {ListDetailsPage} from "../list-details/list-details";

import {UserSettingsService} from "../../services/user-settings.service";
import {UserAuthService} from "../../services/user-auth.service";

/**
 * Generated class for the BookDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-book-details',
  templateUrl: 'book-details.html',
})

export class BookDetailsPage {
  selectedBook:any;
  bookData:any;
  bookLists:any;
  favouriteBooks_id:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private dbApi: DbApiService,
              private loader: LoadingController,

              private toaster: ToastController,
              private userSettings: UserSettingsService,
              private events: Events,

              private actionSheetController: ActionSheetController,
              private alertController: AlertController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookDetailsPage');
    this.selectedBook = this.navParams.data;

    let loader = this.loader.create({
      content: "Accediendo a los datos del libro..."
    });

    loader.present().then(()=>{
      this.dbApi.getBookData(this.selectedBook.id).subscribe((bookData) => {
        this.bookData = bookData;
      });
      this.dbApi.getLists().subscribe((lists) =>{
        this.bookLists = lists;
        console.log(this.bookLists);
        loader.dismiss();
      });
    });

this.events.subscribe("favourites:changed", ()=>{
      this.favouriteBooks_id = this.userSettings.getAllFavourites();
    });
    this.favouriteBooks_id = this.userSettings.getAllFavourites();

  }

  openActionSheet() {
    let actionSheetBtns=[];
    for(let i = 0; i < this.bookLists.length; i++){
      actionSheetBtns.push({
        text:this.bookLists[i].name,
        handler: () => {
          console.log("Se ha clickado: " + this.bookLists[i].name);
          this.dbApi.pushBookToList(this.bookLists[i], this.bookData, this.selectedBook.id);
          let alert = this.alertController.create({
            title: 'New book in '+this.bookLists[i].name,
            subTitle: '\"' + this.bookData.name + '\" added to ' + this.bookLists[i].name + "!",
            buttons: ['Ok!']
          });
          alert.present();
        }
      });
    }
    let actionSheet = this.actionSheetController.create({
      title: 'Select a booklist',
      buttons: actionSheetBtns
    });

    actionSheet.present();
  }

  toggleFavouriteBookDetails() {
    let sentence = "";
    if(this.favouriteBooks_id.includes(this.selectedBook.id)){
      this.userSettings.unfavouriteBook(this.selectedBook);
      sentence = "\"" + this.selectedBook.name + "\" removed from your favourites!";
    }else{
      this.dbApi.getBookData(this.selectedBook.id).subscribe((bookData) => {
        this.userSettings.favouriteBook(bookData.name, bookData.author, bookData.genre, bookData.publishDate, this.selectedBook.id);
      });
      sentence = "\"" + this.selectedBook.name + "\" added to your favourites!";
    }
    let toast = this.toaster.create({
      message: sentence,
      duration: 3000,
      position: "bottom"
    });
    toast.present();
    
  };
}
    
