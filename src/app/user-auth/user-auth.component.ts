import { Component, OnInit } from '@angular/core';
import { SignUp, cart, login, product } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showLogin=false;
  authError:string="";
  constructor(private user:UserService, private ps:ProductService){}
  ngOnInit(): void {
    this.user.userAuthReload();
  }

  signUp(data:SignUp){
    // console.warn(data);
    this.user.userSignUp(data); 
  }

  login(data:login){
    // console.warn(data);
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result)=>{
      // console.warn("AR",result);
      if(result){
        this.authError="Please enter valid user details";
      }
      else{
        this.localCartToRemoteCart();
      }
    })
  }

  openSignUp(){
    this.showLogin=false;
  }

  openLogin(){
    this.showLogin=true;
  }

  localCartToRemoteCart(){
    let data = localStorage.getItem('localCart');
    let user =localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList:product[] = JSON.parse(data); 
      cartDataList.forEach((product:product,index)=>{
        let cartData:cart ={
          ...product,
          productId:product.id,
          userId,
        };
        delete cartData.id;
        setTimeout(() => {
          this.ps.addToCart(cartData).subscribe((res)=>{
            if (res) {
              console.warn("Item Stored in DB");            
            }
          })
          if (cartDataList.length===index+1) {
            localStorage.removeItem('localCart');           
          }
        }, 5000);
      })
    }
    this.ps.getCartList(userId);
  }
}


