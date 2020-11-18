import {Ingredient} from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list-actions';
import {AddIngredient, AddIngredients, DeleteIngredient, UpdateIngredient} from './shopping-list-actions';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT: {
      const addAction = <AddIngredient> action;
      return {
        ...state,
        ingredients: [...state.ingredients, addAction.payload]
      };
    }
    case ShoppingListActions.ADD_INGREDIENTS:
      const addsAction = <AddIngredients> action;

      return {
        ...state,
        ingredients: [...state.ingredients, ...addsAction.payload]
      };
    case ShoppingListActions.UPDATE_INGREDIENT: {
      const updateAction = <UpdateIngredient> action;

      const ingredient = state[updateAction.payload.index];
      const updatedIngredient = {
        ...ingredient,
        ...updateAction.payload.ingredient
      };
      const ingredients = [...state.ingredients];
      ingredients[updateAction.payload.index] = updatedIngredient;
      return {
        ...state,
        ingredients: ingredients
      };
      // state.ingredients[updateAction.index] = updateAction.payload;
    }
    case
    ShoppingListActions.DELETE_INGREDIENT: {
      const deleteAction = <DeleteIngredient> action;
      const ingredients = [...state.ingredients];
      ingredients.splice(deleteAction.payload, 1);
      return {
        ...state,
          ingredients: ingredients
      };
    }
    default:
      return state;
  }
}
