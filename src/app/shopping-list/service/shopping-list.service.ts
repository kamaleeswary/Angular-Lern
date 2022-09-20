import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingrediants } from 'src/app/shared/ingrediant.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  startedEditing = new Subject<number>();
  newIngrediants = new Subject<Ingrediants[]>();
  private ingrediants: Ingrediants[] = [
    new Ingrediants('Apples', 5),
    new Ingrediants('carrot', 10)
  ]
  constructor() { }

  getIngrediants() {
    return this.ingrediants.slice();
  }

  getIngrediant(index: number) {
    return this.ingrediants[index];
  }

  addIngrediant(newIngrediant: Ingrediants) {
    this.ingrediants.push(newIngrediant);
    this.newIngrediants.next(this.ingrediants.slice());
  }

  addIngrediantsfromRecipes(ingrediant: Ingrediants[]) {
    this.ingrediants.push(...ingrediant);
    this.newIngrediants.next(this.ingrediants.slice());
  }

  updateIngrediant(newIngrediant: Ingrediants, index: number) {
    this.ingrediants[index] = newIngrediant;
    this.newIngrediants.next(this.ingrediants.slice());
  }

  deleteIngrediant(index: number) {
    this.ingrediants.splice(index, 1);
    this.newIngrediants.next(this.ingrediants.slice());
  } 

  ngOnDestroy() {
    this.startedEditing.unsubscribe();
    this.newIngrediants.unsubscribe();
  }
}
