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

  getLists():Observable<any>{
    return this.fb.list('my-lists')
      .valueChanges();
  }

  addNewList(value: String) {
    let lists_ref = this.fb.list("my-lists");
    let newList = {"name": value, "books": []};

    lists_ref.push(newList).then(()=>console.log("Nueva lista: " + newList));
  }
}
