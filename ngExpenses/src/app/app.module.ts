import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExpenseService } from './services/expense.service';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { FormsModule } from '@angular/forms';
import { CategoryService } from './services/category.service';
import { PaymentMethodService } from './services/payment-method.service';
import { FilterByPipe } from './pipes/filter-by.pipe';




@NgModule({
  declarations: [
    AppComponent,
    ExpenseListComponent,
    FilterByPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    ExpenseService,
    CategoryService,
    PaymentMethodService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
