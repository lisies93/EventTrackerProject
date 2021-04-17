import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Expense } from '../models/expense';


@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

private baseUrl = 'http://localhost:8084/';
private url = this.baseUrl + 'api/expenses';
private url2 = this.baseUrl + 'api/active/expenses';

  constructor(private http : HttpClient){}

  index() : Observable<Expense[]>{

    return this.http.get<Expense[]>(this.url2)
    .pipe(
      catchError((err: any) => {
        console.error("ExpenseService.index(): error retrieving list of expenses: "+ err);
      return throwError(err);
      })
    );


};

show(expId) : Observable<Expense>{

  return this.http.get<Expense>(this.url + '/' + expId)
  .pipe(
    catchError((err: any) => {
      console.error("ExpenseService.show(): error showing expense: "+ err);
      return throwError(err);
    })
  );


};

create(exp: Expense) : Observable<Expense>{

  return this.http.post<Expense>(this.url,exp).pipe(
    catchError((err: any)=> {
      console.error("ExpenseService.create(): error creating expense: "+ err);
      return throwError(err);

    })
    );

};

update(id: number, exp: Expense) : Observable<Expense>{

  return this.http.put<Expense>(this.url +'/'+ id, exp).pipe(
    catchError((err: any)=> {
      console.error("ExpenseService.update(): error updating expense: "+ err);
      return throwError(err);

    })
  );

};

destroy(id: number){

  return this.http.delete<Expense>(this.url +'/'+ id).pipe(
    catchError((err: any)=> {
      console.log("ExpenseService.destroy(): error deleting expense: "+ err);
      return throwError(err);

    })
  );

};


}
