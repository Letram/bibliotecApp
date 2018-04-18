import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage";
import {Events} from "ionic-angular";

@Injectable()
export class UserSettingsService {

  constructor(private storage: Storage,
              private events: Events) {
  }

  favouriteBook(bookName, bookAuthor, bookGenre, bookPublishDate, book_id){
    let book = {
      name: bookName,
      author: bookAuthor,
      genre: bookGenre,
      publishDate: bookPublishDate,
      id: book_id
    };
    this.storage.set(book_id.toString(), JSON.stringify(book)).then(()=>{
      this.events.publish("favourites:changed");
    });
  }

  unfavouriteBook(book){
    this.storage.remove(book.id.toString()).then(()=>{
      this.events.publish("favourites:changed");
    });
  }

  isFavouriteBook(book_id){
    return this.storage.get(book_id.toString()).then(
      value => !!value);
  }

  getAllFavourites(getData=false){
    let books = [];
    this.storage.forEach((value)=>{
      if(!getData)
        books.push(JSON.parse(value).id);
      else
        books.push(JSON.parse(value));
    });
    return books;
  }

}
