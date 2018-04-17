import {Injectable} from '@angular/core';
import {User} from "../shared/models/User";
import {AngularFireAuth} from "angularfire2/auth";
@Injectable()
export class UserAuthService {
  currentUser = {} as User;
  constructor(private fAuth:AngularFireAuth) {}

  signUpWithEmailAndPassword():Promise<any>{
    return this.fAuth.auth.signInAndRetrieveDataWithEmailAndPassword(this.currentUser.email, this.currentUser.password)
  }
  createUserWithEmailAndPassword():Promise<any>{
    return this.fAuth.auth.createUserWithEmailAndPassword(this.currentUser.email, this.currentUser.password);
  }
  setUser(user){
    this.currentUser = user;
  }

  setUserUID(uid){
    this.currentUser.uid = uid;
  }

  getUserHash(){
    return this.currentUser.uid;
  }

  signOut():Promise<any>{
    return this.fAuth.auth.signOut();
  }
}
