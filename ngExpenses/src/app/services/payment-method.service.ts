import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PaymentMethod } from '../models/payment-method';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {
  private baseUrl = 'http://localhost:8084/';
  private url = this.baseUrl + 'api/payments';

    constructor(private http : HttpClient){}

    getPayments() : Observable<PaymentMethod[]>{

      return this.http.get<PaymentMethod[]>(this.url)
      .pipe(
        catchError((err: any) => {
          console.error("PaymentMethodService.getPayments: error retrieving list of payments: "+ err);
        return throwError(err);
        })
      );


  };
}
