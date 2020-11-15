import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import 'rxjs/add/operator/map';
import {Recipe} from '../recipes/recipe.model';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipes() {
    const token = this.authService.getToken();

    return this.http.put('https://ng-recipe-book-nm.firebaseio.com/data.json?auth=' + token, this.recipeService.getRecipes());
  }


  getRecipes() {
    const token = this.authService.getToken();
    return this.http.get('https://ng-recipe-book-nm.firebaseio.com/data.json?auth='+ token).map(
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
