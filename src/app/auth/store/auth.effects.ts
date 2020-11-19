import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import {from} from 'rxjs';
import firebase from 'firebase';
import {map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class AuthEffects {
  @Effect({dispatch: false})
  authSignup = this.actions$.pipe(ofType(AuthActions.TRY_SIGNUP))
    .pipe(map((action: AuthActions.TrySignup) => {
      return action.payload;
    })).pipe(switchMap((authData: { username: string, password: string }) => {
        return from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
      })
    ).pipe(switchMap(() => {
        return from(firebase.auth().currentUser.getIdToken());
      })
    ).pipe(mergeMap(token => {
        this.router.navigate(['/']);
        return [
          {type: AuthActions.SIGNUP},
          {
            type: AuthActions.SET_TOKEN,
            payload: token,
          }
        ];
      }
    ));

  @Effect()
  authSignin = this.actions$.pipe(ofType(AuthActions.TRY_SIGNIN)
  ).pipe(map(
    (action: AuthActions.TrySignin) => {
      return action.payload;
    }
  )).pipe(switchMap(
    (authData: { username: string, password: string }) => {
      return from(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
    }
  )).pipe(switchMap(() => {
      return from(firebase.auth().currentUser.getIdToken());
    })
  ).pipe(mergeMap((token) => {
      this.router.navigate(['/']);
      return [
        {type: AuthActions.SIGNIN},
        {
          type: AuthActions.SET_TOKEN,
          payload: token,
        }
      ];
    })
  );

  @Effect({dispatch: false})
  authLogout = this.actions$.pipe(ofType(AuthActions.LOGOUT)).pipe(tap(() => {
      this.router.navigate(['/']);
    }
    )
  );

  constructor(private actions$: Actions, private router: Router) {
  }
}
