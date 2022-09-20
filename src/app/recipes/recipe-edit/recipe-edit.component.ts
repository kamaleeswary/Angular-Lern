import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/service/data-storage.service';
import { RecipeService } from '../service/recipe.service';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipeId: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, 
              private recipeService: RecipeService,
              private router: Router,
              private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.recipeId = param['id'];
      this.editMode = param['id'] != null;
      this.inItForm();
    })
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onSubmit() {
    const newRecipe = this.recipeForm.value;
    if(this.editMode) {
      this.recipeService.updateRecipe(this.recipeId, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
    this.dataStorageService.toSaveData();
    this.onCancel();
  }

  onAddIngredients() {
    (this.recipeForm.get('ingrediants') as FormArray).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onDeleteIngredients(index: number){
    (this.recipeForm.get('ingrediants') as FormArray).removeAt(index);
  }

  private inItForm() {
    let recipeName = '';
    let imagePath = '';
    let description = '';
    let recipeIngrediants = new FormArray([]);

    if(this.editMode) {
      const recipe = this.recipeService.getRecipe(this.recipeId);
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;

        if (recipe['ingrediants']) {
          for (let ingredient of recipe.ingrediants) {
            recipeIngrediants.push(
              new FormGroup({
                'name': new FormControl(ingredient.name, Validators.required),
                'amount': new FormControl(ingredient.amount, [Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)])
              })
            );
          }
       }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingrediants': recipeIngrediants
    });
  }

  get controls(){
    return (this.recipeForm.get('ingrediants') as FormArray).controls;
  }

}
