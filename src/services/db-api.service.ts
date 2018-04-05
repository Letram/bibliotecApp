import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {Observable} from "rxjs/Observable";

@Injectable()
export class DbApiService {
  currentBook: any = {};
  constructor(private  fb: AngularFireDatabase) {}

  getBooks():Observable<any>{
    return this.fb.list('books').valueChanges();
  }
  getBookData(book_id):Observable<any>{
    return this.fb.object(`books_data/${book_id}`)
      .valueChanges()
      .map(resp => this.currentBook = resp);
  }
  getCurrentBook(){
    return this.currentBook;
  }
}
