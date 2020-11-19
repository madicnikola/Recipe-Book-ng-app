import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducers';
import {Observable} from 'rxjs';
import {State} from '../../auth/store/auth.reducers';
import {FetchRecipes, StoreRecipes} from '../../recipes/store/recipe.actions';
import {Logout} from '../../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  authState: Observable<State>;
  // @Output() featureSelected = new EventEmitter<string>();

  // onSelect(feature: string): void {
  //   this.featureSelected.emit(feature);
  // }

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.authState = this.store.select('auth');
  }

  onSaveData() {
    this.store.dispatch(new StoreRecipes());

  }

  onFetchData() {
    this.store.dispatch(new FetchRecipes());

  }

  logout() {
    this.store.dispatch(new Logout());

    // this.authService.logout();
  }

}
