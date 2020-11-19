import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list-actions';
import {RecipeFeatureState, State} from '../store/recipe.reducers';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {DeleteRecipe} from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeState: Observable<State>;
  id: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<RecipeFeatureState>) {
  }

  ngOnInit(): void {
    // const id = this.route.snapshot.params['id'];
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipeState = this.store.select('recipes');
      }
    );
  }

  onAddToShoppingList() {
    // this.shoppingListService.AddtoShoppingList(this.recipe.ingredients);
    // this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    this.store.select('recipes')
      .pipe(take(1))
      .subscribe((recipeState: State) => {
        this.store.dispatch(new ShoppingListActions.AddIngredients(
          recipeState.recipes[this.id].ingredients)
        );
      });
  }


  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route}); same just for practice
  }

  onDeleteRecipe() {
    this.store.dispatch(new DeleteRecipe(this.id));
    this.router.navigate(['../'], {relativeTo: this.route});

  }
}
