import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducers';
import * as fromAuth from './store/auth.reducers';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<AppState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select('auth').map((authState: fromAuth.State) => {
      return authState.authenticated;
    });
  }

}
