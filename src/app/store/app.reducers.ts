import * as fromShoppingList from '../shopping-list/store/shopping-list.reducers';
import {shoppingListReducer} from '../shopping-list/store/shopping-list.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import {authReducer} from '../auth/store/auth.reducers';
import {ActionReducerMap} from '@ngrx/store';


export interface AppState {
  shoppingList: fromShoppingList.State,
  auth: fromAuth.State,
}

export const reducers: ActionReducerMap<AppState> = {
  shoppingList: shoppingListReducer,
  auth: authReducer,
};
