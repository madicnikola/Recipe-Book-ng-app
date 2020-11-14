import firebase from 'firebase';
import {log} from 'util';

export class AuthService {
  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(
      email, password
    ).catch(
      error => console.log(error)
    );
  }
}
