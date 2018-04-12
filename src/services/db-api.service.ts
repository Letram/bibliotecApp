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
    let newList = {"name": value};
    this.fb.object(`my-lists/${newList.name}`).update(newList);
  }

  pushBookToList(bookList: any, bookData: any, bookId: any) {
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

    this.fb.list(`my-lists/${bookList.name}/books/`).set(index.toString(), book_data);
  }

  getBookList(bookList):Observable<any>{
    return this.fb.list(`my-lists/${bookList.name}/books`).valueChanges();
  }

  removeBookFromList(bookList, index){
    this.fb.list(`my-lists/${bookList.name}/books`).remove(index.toString());
  }

  removeList(bookList){
    this.fb.list(`my-lists/${bookList.name}`).remove();
  }
}
