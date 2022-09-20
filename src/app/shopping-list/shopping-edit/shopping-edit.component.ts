import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingrediants } from 'src/app/shared/ingrediant.model';
import { ShoppingListService } from '../service/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') slForm: NgForm;
  editedIndex: number;
  editedItem: Ingrediants;
  editMode = false;

  constructor(private shoppinglistService: ShoppingListService) { }

  ngOnInit(): void {
    this.shoppinglistService.startedEditing.subscribe((index: number) => {
      this.editMode = true;
      this.editedIndex = index;
      this.editedItem = this.shoppinglistService.getIngrediant(index);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    })
  }

  onSubmit(form: NgForm, mode: boolean) {
    const value = form.value;
    const newIngrediant = new Ingrediants(value.name, value.amount);
    if(this.editMode) {
      this.shoppinglistService.updateIngrediant(newIngrediant, this.editedIndex);
    } else {
      this.shoppinglistService.addIngrediant(newIngrediant);
    }
    this.editMode = false;
    form.reset();
  }
  
  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppinglistService.deleteIngrediant(this.editedIndex);
    this.onClear();
  }
}
