import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalPrice:number | undefined

  constructor(private ps:ProductService, private router:Router){}
 
  ngOnInit(): void {
    this.ps.currentCart().subscribe((result)=>{
      let price=0;
      result.forEach((item)=>{
        if (item.quantity) {
          price = price + (+item.price* + item.quantity);
        }
      });
      this.totalPrice=price+(price/10)+100 - (price/10);
    })
  }

  orderNow(data:order)
  {
   let user =localStorage.getItem('user');
   let userId = user && JSON.parse(user).id;
  if (this.totalPrice) 
  {
    let orderData:order ={
      ...data,
      totalPrice:this.totalPrice,
      userId
    }
    this.ps.orderNow(orderData).subscribe((result)=>{
      if (result) {
        alert("Order added successfully..");
        this.router.navigate(['/my-orders']);
      }
    })
  }
  }
}
