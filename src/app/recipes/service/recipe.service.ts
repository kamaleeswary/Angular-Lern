import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipes } from '../recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeChanged = new Subject<Recipes[]>();
  private recipe: Recipes[] = [];

  constructor() { }

  setRecipe(recipes: Recipes[]) {
    this.recipe = recipes;
    this.recipeChanged.next(this.recipe.slice());
  }

  getRecipes() {
    return this.recipe.slice();
  }
  
  getRecipe(index: number) {
    return this.recipe[index];
  }

  addRecipe(newRecipe: Recipes) {
    this.recipe.push(newRecipe);
    this.recipeChanged.next(this.recipe.slice());
  }

  updateRecipe(index: number, newRecipe: Recipes) {
    this.recipe[index] = newRecipe;  
    this.recipeChanged.next(this.recipe.slice());
  }

  deleteRecipe(index: number) {
    this.recipe.splice(index, 1);
    this.recipeChanged.next(this.recipe.slice());
  }
}
