import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, NavParams } from 'ionic-angular';
import {UserAuthService} from "../../services/user-auth.service";
import {User} from "../../shared/models/User";
import {HomePage} from "../home/home";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user={} as User;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public menuCtrl: MenuController, 
              private userAuth: UserAuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  
  ionViewDidEnter(){
      this.menuCtrl.swipeEnable(false, "sidebar");
  }

  ionViewWillLeave(){
    this.menuCtrl.swipeEnable(true, "sidebar");
  }

  
  login(){
    this.userAuth.signOut();
    this.userAuth.setUser(this.user);
    this.userAuth.signUpWithEmailAndPassword().then((data) => {
      console.log(data);
      this.userAuth.setUserUID(data.user.uid);
      this.navCtrl.setRoot(HomePage);
      this.navCtrl.popToRoot();
    });
  }

  register(){
    this.userAuth.signOut();
    this.userAuth.setUser(this.user);
    this.userAuth.createUserWithEmailAndPassword().then((data) => {
      console.log(data);
      this.userAuth.setUserUID(data.uid);
      this.navCtrl.setRoot(HomePage);
      this.navCtrl.popToRoot();
    });
  }
}
