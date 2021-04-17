import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'http://localhost:8084/';
  private url = this.baseUrl + 'api/categories';

    constructor(private http : HttpClient){}

    getCategories() : Observable<Category[]>{

      return this.http.get<Category[]>(this.url)
      .pipe(
        catchError((err: any) => {
          console.error("CategoryService.getCategories: error retrieving list of categories: "+ err);
        return throwError(err);
        })
      );


  };

}
