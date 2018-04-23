import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {UserAuthService} from "./user-auth.service";

@Injectable()
export class DbApiService {
  currentBook: any = {};
  constructor(private  fb: AngularFireDatabase,
              private userAuth: UserAuthService) {}

  getBooks():Observable<any>{
    return this.fb.list('books').valueChanges();
  }

  getBookData(book_id):Observable<any>{
    return this.fb.object(`books_data/${book_id}`)
      .valueChanges()
      .map(resp => this.currentBook = resp);
  }
  getLists():Observable<any>{
    return this.fb.list(`lists/${this.userAuth.getUserHash()}`)
      .valueChanges();
  }

  addNewList(value: String) {
    let newList = {"name": value};
    this.fb.object(`lists/${this.userAuth.getUserHash()}/${newList.name}`).update(newList);
  }

  pushBookToList(bookList: any, bookData: any, bookId: any) {
    function hasBook(bookList: any, bookId: any) {
      if(bookList.books){
        let res = bookList.books.map((book) => book.id == bookId);
        return !!res.includes(true);
      }
      return false;
    }

    if(hasBook(bookList, bookId))return;
    let index = 0;
    if(bookList.books)index = bookList.books.length;

    let book_data = {
      id: bookId,
      name: bookData.name,
      author: bookData.author,
      genre: bookData.genre,
      publishDate: bookData.publishDate,
      index: index
    };

    this.fb.list(`lists/${this.userAuth.getUserHash()}/${bookList.name}/books/`).set(index.toString(), book_data);
  }

  getBookList(bookList):Observable<any>{
    return this.fb.list(`lists/${this.userAuth.getUserHash()}/${bookList.name}/books`).valueChanges();
  }

  removeBookFromList(bookList, index){
    this.fb.list(`lists/${this.userAuth.getUserHash()}/${bookList.name}/books`).remove(index.toString());
  }

  removeList(bookList){
    this.fb.list(`lists/${this.userAuth.getUserHash()}/${bookList.name}`).remove();
  }
}
