import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {RecipeFeatureState, State} from '../store/recipe.reducers';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipeState: Observable<State>;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<RecipeFeatureState>) {

  }

  ngOnInit(): void {
    this.recipeState = this.store.select('recipes');

  }


  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
