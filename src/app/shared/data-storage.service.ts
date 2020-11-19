import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {map} from 'rxjs/operators';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService) {
  }

  storeRecipes() {
    // return this.httpClient.put('https://ng-recipe-book-nm.firebaseio.com/data.json?auth=' + token, this.recipeService.getRecipes());
    // return this.httpClient
    //   .put('https://ng-recipe-book-nm.firebaseio.com/data.json?auth=' + token,
    //     this.recipeService.getRecipes());

    const req = new HttpRequest('PUT', 'https://ng-recipe-book-nm.firebaseio.com/data.json',
      this.recipeService.getRecipes(),); // {reportProgress: true, params: new HttpParams().set('auth', token)}
    return this.httpClient.request(req);
  }


  getRecipes() {
    return this.httpClient.get<Recipe[]>('https://ng-recipe-book-nm.firebaseio.com/data.json')
      .pipe(map(
        recipes => {
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
              // console.log(recipe);
            }
          }
          return recipes;
        }
      )).subscribe(recipes => this.recipeService.updateRecipes(recipes));
  }
}
