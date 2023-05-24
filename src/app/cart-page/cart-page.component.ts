import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartData:cart[] | undefined;
  priceSummary: priceSummary ={
    price:0,
    discount:0,
    tax:0,
    delivery:0,
    total:0
  }
  constructor(private ps:ProductService, private router:Router){}

  ngOnInit(): void {  
    this.loadDetails();
  }

  loadDetails(){
    this.ps.currentCart().subscribe((result)=>{
      this.cartData=result;
      let price =0;
      result.forEach((item)=>{
        if (item.quantity) {
          price = price + (+item.price* + item.quantity);
        }       
      });
      // console.warn(price);
        this.priceSummary.price = price;
        this.priceSummary.discount = price/10;
        this.priceSummary.tax = price/10;
        this.priceSummary.delivery = 100;
        this.priceSummary.total = price+(price/10)+100 - (price/10);
        console.warn(this.priceSummary);
        
      if (!this.cartData.length) {
        this.router.navigate(['/']);
      }
    }) 
  }
  removeToCart(cartId:number | undefined){
      // let user = localStorage.getItem('user');
      // let userId = user && JSON.parse(user).id;      
      // console.warn(this.cartData);
      cartId &&   this.cartData && this.ps.removeToCart(cartId)
       .subscribe((result)=>{       
        if (result) {
          this.loadDetails();
          // console.warn(result);         
           //this.ps.getCartList(userId);           
        }
      })
  }
  checkout(){
    this.router.navigate(['/checkout']);
  } 
}
