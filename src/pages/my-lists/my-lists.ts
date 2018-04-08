import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DbApiService} from "../../services/db-api.service";

/**
 * Generated class for the MyListsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-lists',
  templateUrl: 'my-lists.html',
})
export class MyListsPage {
  myLists:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private dbApi: DbApiService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyListsPage');
    this.dbApi.getLists().subscribe((myLists) => {
      this.myLists = myLists;
    });
  }

  addList(value: String) {
    if(value != ""){
      this.dbApi.addNewList(value);
    }
  }
}
