import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {DbApiService} from "../../services/db-api.service";

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
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private dbApi: DbApiService,
              private loader: LoadingController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookDetailsPage');
    this.selectedBook = this.navParams.data;

    let loader = this.loader.create({
      content: "Accediendo a los datos del libro..."
    });

    loader.present().then(()=>{
      this.dbApi.getBookData(this.selectedBook.id).subscribe((bookData) => {
        this.bookData = bookData;
        loader.dismiss();
      });
    });

  }

}
