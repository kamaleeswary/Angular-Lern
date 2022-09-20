import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/service/shopping-list.service';
import { Recipes } from '../recipe.model';
import { RecipeService } from '../service/recipe.service';

@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.component.html',
  styleUrls: ['./recipes-details.component.css']
})
export class RecipesDetailsComponent implements OnInit {
  recipe: Recipes;
  index: number;

  constructor(private recipeService: RecipeService, private shoppingListService: ShoppingListService,
              private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.index = params['id'];
      this.recipe = this.recipeService.getRecipe(this.index)
    })
  }
  
  addIngToShopList() {
    this.shoppingListService.addIngrediantsfromRecipes(this.recipe.ingrediants);
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.index);
    this.router.navigate(['/recipes']);
  }
}
