import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { login, SignUp } from '../data-type';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {

  constructor(private seller:SellerService, private router:Router){}
  showLogIn=false;
  authError:string ='';

  ngOnInit():void{
    this.seller.reloadSeller()
  }
  signUp(data:SignUp): void{
     console.warn(data);
     this.seller.userSignUp(data);
    //this.seller.userSignUp(data).subscribe((result)=> {
      //if(result){
      //this.router.navigate(['seller-home']);
      }
      // console.warn(result);
    //});
  //}
  logIn(data:SignUp):void{
    this.authError="";
    // console.warn(data);
    this.seller.userLogIn(data);
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError="Email or Password is Not Correct..";
      }
    });   
  }

  openLogIn(){
    this.showLogIn=true;
  }
  openSignUp(){
    this.showLogIn=false;
  }
}
