import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import 'rxjs/add/operator/map';
import {Recipe} from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService) {
  }

  storeRecipes() {
    return this.http.put('https://ng-recipe-book-nm.firebaseio.com/data.json', this.recipeService.getRecipes());
  }


  getRecipes() {
    return this.http.get('https://ng-recipe-book-nm.firebaseio.com/data.json').map(
      value => {
        const recipes: Recipe[] = <any[]> value;
        for (let recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
            // console.log(recipe);
          }
        }
        return recipes;
      }
    ).subscribe(recipes => this.recipeService.updateRecipes(recipes));
  }
}
