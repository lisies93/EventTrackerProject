import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Expense } from 'src/app/models/expense';
import { PaymentMethod } from 'src/app/models/payment-method';
import { CategoryService } from 'src/app/services/category.service';
import { ExpenseService } from 'src/app/services/expense.service';
import { PaymentMethodService } from 'src/app/services/payment-method.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {

 expenses : Expense[] = [];

 title : String = 'Expenses';
  selected = null;

  newExpense : Expense = new Expense();

  editExpense : Expense = null;

  categories : Category[] = [];

  payments : PaymentMethod[] = [];

  catId: number =0;

  constructor(private expService : ExpenseService,
    private route: ActivatedRoute,
    private router : Router,
    private catService : CategoryService,
    private payServive : PaymentMethodService  ) { }

  ngOnInit(): void {

    let expId = this.route.snapshot.paramMap.get('id');
    if(expId){
      this.expService.show(expId).subscribe(
        exp => {
          this.selected = exp;
        },
        fail => {
         console.error('ExpenseListComponet.ngOnInit() : expense Retrieve failed');
          console.error(fail);
          this.router.navigateByUrl('notFound');
        }
      );
    }

    this.loadExpenses();

  }

  loadExpenses(): void{

    this.expService.index().subscribe(
      data =>{
        this.expenses = data;
        this.loadCategories();
        this.loadPayments();
      },
      fail => {
        console.error('ExpenseListComponent.loadExpeneses() failed.');
        console.error(fail);

      }
    );
  }


loadCategories() : void{

    this.catService.getCategories().subscribe(
    data =>{
      this.categories = data;
    },
    fail => {
      console.error('ExpenseListComponent.loadCategories() failed.');
      console.error(fail);

    }
  );


}

loadPayments() : void{

    this.payServive.getPayments().subscribe(
    data =>{
      this.payments = data;
    },
    fail => {
      console.error('ExpenseListComponent.loadPayments() failed.');
      console.error(fail);

    }
  );


}


  getNumberOfExpenses() : number{
    return this.expenses.length;
  }

  displayExpense(exp) : void{
    this.selected = exp;
  }

  displayTable() : void{
    this.selected = null;
  }

  addExpense(): void{

    console.log(this.newExpense.category);

    this.expService.create(this.newExpense).subscribe(
      data => {
        this.loadExpenses();
        this.newExpense = new Expense();
      },
      err => {console.error('Observer got an error: ' + err)}
    );

}

setEditExpense(): void{
  this.editExpense = Object.assign({}, this.selected);

}

updateExpense(editExpense : Expense , displayExpense = true) : void{

  this.expService.update(editExpense.id,editExpense).subscribe(
    data => {
      if(displayExpense){
        this.selected = data;
      }
      this.loadExpenses();
        this.editExpense = null;

    },
    err => {console.error('Observer got an error: ' + err)}
  );

}

deleteExpense(id: number): void{

  this.expService.destroy(id).subscribe(
    data =>{
      console.log('Expense deleted');
      this.loadExpenses();
    },
    err => {console.error('Expense.component deleteExpense(): ' + err)}

  );
}



}
