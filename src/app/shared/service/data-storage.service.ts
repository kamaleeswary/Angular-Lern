import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Recipes } from 'src/app/recipes/recipe.model';
import { RecipeService } from 'src/app/recipes/service/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: HttpClient, 
    private recipeService: RecipeService,
    private authService: AuthService) { }

  toSaveData() {
    const recipes = this.recipeService.getRecipes();
    return this.http.put('https://recipe-book-4befb-default-rtdb.firebaseio.com/recipe.json', recipes).subscribe((response: Recipes) => {
      console.log(response);
    })
  }

  toFetchdata() {
    return this.http.get<Recipes[]>('https://recipe-book-4befb-default-rtdb.firebaseio.com/recipe.json')
    .pipe(map(recipes => {
      return recipes.map(recipe => {
          return {
            ...recipe, ingrediants: recipe.ingrediants ? recipe.ingrediants : []
          }
       })
    }),
    tap(recipe => {
      this.recipeService.setRecipe(recipe);
    })
    )
  }
}
