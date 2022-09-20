import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/authGuard/auth.guard";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesDetailsComponent } from "./recipes-details/recipes-details.component";
import { RecipesComponent } from "./recipes.component";
import { RecipeResolver } from "./service/resolver/recipe.resolver";

const routes: Routes = [
    {path: '', component: RecipesComponent, canActivate: [AuthGuard], children: [
        {path: '', component: RecipeStartComponent},
        {path: 'new', component: RecipeEditComponent},
        {path: ':id', component: RecipesDetailsComponent, resolve: [RecipeResolver]},
        {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolver]}
      ]}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

export class RecipeRoutingModule {}