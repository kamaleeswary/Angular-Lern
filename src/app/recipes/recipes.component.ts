import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/service/data-storage.service';
import { RecipeService } from './service/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  constructor(private recipeService: RecipeService, private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
      this.dataStorageService.toFetchdata().subscribe();
  }

}
