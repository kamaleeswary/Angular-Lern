import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes.component';
import { RecipesDetailsComponent } from './recipes-details/recipes-details.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipeItemComponent } from './recipes-list/recipe-item/recipe-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RecipeRoutingModule } from './recipe.routing.module';
import { RouterModule } from '@angular/router';
import { DropDownDirective } from '../shared/drop-down.directive';
import { SharedModule } from '../shared/shared.module';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';



@NgModule({
  declarations: [
    RecipesComponent,
    RecipesDetailsComponent,
    RecipesListComponent,
    RecipeItemComponent,
    RecipeEditComponent,
    RecipeStartComponent
  ],
  imports: [
    RouterModule,
    HttpClientModule,
    RecipeRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class RecipeModule { }
