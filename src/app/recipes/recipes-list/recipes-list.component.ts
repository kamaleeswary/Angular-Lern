import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipes } from '../recipe.model';
import { RecipeService } from '../service/recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {
  recipes: Recipes[];
  recipeObj: Subscription;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeObj = this.recipeService.recipeChanged.subscribe((recipe: Recipes[]) => {
      this.recipes = recipe
    })
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy() {
    this.recipeObj.unsubscribe();
  }

}
