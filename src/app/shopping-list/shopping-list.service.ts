import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  constructor() {
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }



  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(editedItemIndex: number) {
    this.ingredients.splice(editedItemIndex, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  // AddIngredients(newIngredients: Ingredient[]) {
  //   // newIngredients.forEach(
  //   //   (ingredient: Ingredient) => {
  //   //     this.addIngredient(ingredient);
  //   //   }
  //   // );
  //   this.ingredients.push(...newIngredients);
  //   this.ingredientsChanged.next(this.ingredients.slice());
  // }
}
