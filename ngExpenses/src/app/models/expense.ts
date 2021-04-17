import { CategoryService } from "../services/category.service";
import { Category } from "./category";
import { PaymentMethod } from "./payment-method";

export class Expense {

  id: number;
  name : string;
  description : string;
  amount : number;
  createdDate : string;
  active : boolean;
  category : Category;
  paymentMethod : PaymentMethod;




  constructor(name?:string, id?: number,
    description ?: string,
    amount ?: number,
    createdDate ?: string,
    active ?: boolean,
    category ?: Category,
    paymentMethod ?: PaymentMethod

    ){
   this.name = name;
   this.id = id;
   this.description = description;
   this.amount = amount;
   this.createdDate = createdDate;
   this.active = active;
   this.category = category;
   this.paymentMethod = paymentMethod;
  }


}
