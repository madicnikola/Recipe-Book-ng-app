import {Component, OnInit} from '@angular/core';
import firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string;

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyDCB42Rc28kFnMy9ziizoRgaOeB-shGelU',
      authDomain: 'ng-recipe-book-nm.firebaseapp.com',
    });
  }

  // title;
  // loadedFeature = 'recipe';

  // onNavigate(feature: string): void {
  //   this.loadedFeature = feature;
  // }


}
