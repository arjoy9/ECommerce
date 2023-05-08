import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { literalMap } from '@angular/compiler';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productData:undefined | product;
  productQuantity:number=1;
  quantity:number=1;
  removeCart=false;
  constructor(private activeRoute:ActivatedRoute, private ps:ProductService){}
  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    // console.warn(productId);
    productId && this.ps.getProduct(productId).subscribe((result)=>{
      // console.warn(result);
      this.productData=result;

      // for remove cart button
      let cartData = localStorage.getItem('localCart');
      if(productId && cartData){
        let items = JSON.parse(cartData);
        items =items.filter((item:product)=>productId==item.id.toString());
        if(items.length){
          this.removeCart=true;
        }
        else{
          this.removeCart=false;
        }
      }
    })
  }

  handleQuantity(val:string){
    if(this.productQuantity <20 && val==='plus'){
      this.productQuantity+=1
    }
    else if(this.productQuantity >1 && val==='min'){
      this.productQuantity-=1
    }
  }

  AddToCart(){
    if(this.productData){
      this.productData.quantity = this.productQuantity;
      if(!localStorage.getItem('user')){
        //console.warn(this.productData);
        this.ps.localAddToCart(this.productData); 
        this.removeCart=true;  
      }
      else{
        // console.warn("user is logged in...");
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        // console.warn(userId);
        let cartData:cart={
          ...this.productData,
          userId,
          productId:this.productData.id
        }
        delete cartData.id;
        // console.warn(cartData);
        this.ps.addToCart(cartData).subscribe((result)=>{
          // console.warn(result);
          if (result) {
            alert("Product is added in cart.");          
          }
        })       
      }
    }
  }

  removeToCart(productId:number){
    this.ps.removeItemFromCart(productId);
    this.removeCart=false;
  }
}
