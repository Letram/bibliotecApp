import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BookDetailsPage} from "../book-details/book-details";
import {DbApiService} from "../../services/db-api.service";

/**
 * Generated class for the ListDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-details',
  templateUrl: 'list-details.html',
})
export class ListDetailsPage {
  bookList:any=[];
  currentList:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private dbApi: DbApiService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListDetailsPage');
    this.currentList = this.navParams.data;
    this.dbApi.getBookList(this.currentList).subscribe((books =>{
      this.bookList = books;
    }));
  }
  openBookDetails(book){
    this.navCtrl.push(BookDetailsPage, book);
  }

  removeBook(index: any) {
    this.dbApi.removeBookFromList(this.currentList, index);
  }
}
