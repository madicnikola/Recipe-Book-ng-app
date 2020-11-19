import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {Recipe} from '../recipe.model';
import {RecipeFeatureState} from './recipe.reducers';
import {FETCH_RECIPES, FetchRecipes, SET_RECIPES, STORE_RECIPES} from './recipe.actions';

@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions$.pipe(ofType(FETCH_RECIPES)
    , switchMap((action: FetchRecipes) => {
      return this.httpClient.get<Recipe[]>('https://ng-recipe-book-3adbb.firebaseio.com/recipes.json', {
        observe: 'body',
        responseType: 'json'
      });
    }), map(
      (recipes: Recipe[]) => {
        console.log(recipes);
        for (let recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return {
          type: SET_RECIPES,
          payload: recipes
        };
      }
    ));

  @Effect({dispatch: false})
  recipeStore = this.actions$.pipe(ofType(STORE_RECIPES)
    , withLatestFrom(this.store.select('recipes')),
    switchMap(([action, state]) => {
      const req = new HttpRequest('PUT', 'https://ng-recipe-book-3adbb.firebaseio.com/recipes.json', state.recipes, {reportProgress: true});
      return this.httpClient.request(req);
    }));

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<RecipeFeatureState>) {
  }
}
