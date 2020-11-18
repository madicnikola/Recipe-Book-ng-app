import {Component, OnInit} from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';
import {AuthService} from '../../auth/auth.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducers';
import {Observable} from 'rxjs';
import * as fromAuth from '../../auth/store/auth.reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;
  // @Output() featureSelected = new EventEmitter<string>();

  // onSelect(feature: string): void {
  //   this.featureSelected.emit(feature);
  // }

  constructor(private dataStorageService: DataStorageService,
              public authService: AuthService,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.authState = this.store.select('auth');
  }

  onSaveData() {
    this.dataStorageService.storeRecipes().subscribe(
      response => console.log(response),
      error => console.log(error)
    );
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  logout() {
    this.authService.logout();
  }

}
