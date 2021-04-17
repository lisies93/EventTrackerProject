import { Pipe, PipeTransform } from '@angular/core';
import { Expense } from '../models/expense';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  transform(expenses : Expense[], filter ?: string , value ?: string, start ?: string, end? : string ): Expense[] {
   let results = [];

    if(filter === 'all'){
      results = expenses;
    } else if(filter === 'payment'){

      expenses.forEach(exp => {
        if(value === exp.paymentMethod.name){
          results.push(exp)
        }
      });


    } else if (filter === 'category'){
      expenses.forEach(exp => {
        if(value === exp.category.name){
          results.push(exp)
        }
      });
    } else if (filter === 'date'){
      expenses.forEach(exp => {
        if(exp.createdDate >= start && exp.createdDate <= end){
          results.push(exp)
        }
      });
    }

return results;

  }

}
