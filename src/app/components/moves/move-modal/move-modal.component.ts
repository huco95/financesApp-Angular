import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Category } from 'src/app/models/category/category';
import { Move } from 'src/app/models/moves/move';
import { CategoryService } from 'src/app/services/moves/category.service';
import { MovesService } from 'src/app/services/moves/moves.service';

@Component({
  selector: 'app-move-modal',
  templateUrl: './move-modal.component.html',
  styleUrls: ['./move-modal.component.css']
})
export class MoveModalComponent implements OnInit {
  moveId: string;

  moveForm: FormGroup;
  isLoading: boolean = false;

  incomeCategories: Array<Category>;
  expenseCategories: Array<Category>;
  selectedCategories: Array<Category>;

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private moveService: MovesService,
    private categoryService: CategoryService) {
      this.moveForm = this.formBuilder.group({
        type: ['', [Validators.required]],
        amount:  ['', [Validators.required]],
        category: ['', [Validators.required]],
        description: [''],
        date: ['', [Validators.required]],
      });
  }

  // Form getters
  get type() { return this.moveForm.get('type'); }
  get amount() { return this.moveForm.get('amount'); }
  get category() { return this.moveForm.get('category'); }
  get description() { return this.moveForm.get('description'); }
  get date() { return this.moveForm.get('date'); }

  ngOnInit(): void {
    this.initializeForm();
  }

  async initializeForm() {
    await this.categoryService.getCategoriesByType('income').toPromise()
    .then(categories => { this.incomeCategories = categories; })
    .catch();

    await this.categoryService.getCategoriesByType('expense').toPromise()
    .then(categories => { this.expenseCategories = categories; })
    .catch();

    this.moveId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.moveId) {
      this.moveService.getMove(this.moveId).subscribe(
        move => {
          this.populateForm(move);
          this.updateCategory(move.type);
        }
      );

    } else {
      this.type.setValue('income');
      this.updateCategory('income');
    }
  }

  populateForm(move: Move) {
    this.amount.setValue(move.amount);
    this.type.setValue(move.type);
    this.category.setValue(move.category);
    this.description.setValue(move.description);    
    this.date.setValue(this.datePipe.transform(new Date(move.date), 'yyyy-MM-dd'));
  }

  updateCategory(type: string) {
    if (type === 'income') {
      this.selectedCategories = this.incomeCategories;
    } else if (type === 'expense') {
      this.selectedCategories = this.expenseCategories;
    }
  }

  onSubmit(moveData: any) {
    if (this.moveForm.valid) {
      this.isLoading = true;
      let move: Move = new Move();
      move.amount = moveData.amount;
      move.type = moveData.type;
      move.category = moveData.category;
      move.description = moveData.description;
      move.date = moveData.date;
  
      if (this.moveId) { move._id = this.moveId; }
  
      this.moveService.saveMove(move).subscribe(
        res => {
          this.isLoading = false;
          this.route.navigate(['home']);
        },
        err => {
          console.log(err);
          this.isLoading = false;
        }
      );
    } else {
      this.showFormErrors();
    }
  }

  /**
   * Mark all form controls as touched to show form errors.
   */
  private showFormErrors() {
    Object.keys(this.moveForm.controls).forEach(field => {
      this.moveForm.get(field).markAsTouched({ onlySelf: true });
    });
  }

  onDelete() {
    this.moveService.delteMove(this.moveId).subscribe(
      res => {
        this.route.navigate(['home']);
      },
      err => {
        console.log(err);
      }
    );
  }
}
