import {Ingredient} from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list-actions';
import {AddIngredient, AddIngredients, StartEdit, UpdateIngredient} from './shopping-list-actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1,
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

      const ingredient = state[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...updateAction.payload.ingredient
      };
      const ingredients = [...state.ingredients];
      ingredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: ingredients,
        editedIngredient: null,
        editedIngredientIndex: -1,
      };
      // state.ingredients[updateAction.index] = updateAction.payload;
    }
    case ShoppingListActions.DELETE_INGREDIENT: {
      // const deleteAction = <DeleteIngredient> action;
      const ingredients = [...state.ingredients];
      ingredients.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        ingredients: ingredients,
        editedIngredient: null,
        editedIngredientIndex: -1,
      };
    }
    case ShoppingListActions.START_EDIT: {
      const startEditAction = <StartEdit> action;
      const editedIngredient = {...state.ingredients[startEditAction.payload]};
      return {
        ...state,
        editedIngredient: editedIngredient,
        editedIngredientIndex: startEditAction.payload,
      };
    }
    case ShoppingListActions.STOP_EDIT: {
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1,
      };
    }
    default:
      return state;
  }
}
