import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login, SignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
 isSellerLoggedIn = new BehaviorSubject<boolean>(false)
 isLoginError = new EventEmitter<boolean>(false);

  constructor(private http:HttpClient, private router:Router) { }

  userSignUp(data:SignUp){
     this.http.post('http://localhost:3000/seller', data, {observe:'response'})
    .subscribe((result)=>{
      this.isSellerLoggedIn.next(true);
      localStorage.setItem('seller',JSON.stringify(result.body));
      this.router.navigate(['seller-home']);
      // console.warn("result", result);
    });
    // return false;
  }
  
  reloadSeller():void{
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

 userLogIn(data:login){
  // console.warn(data);
  this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
  {observe: "response"}) // observe not working
  .subscribe((result:any)=>{ 

  // this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`)
  // .subscribe((result:any)=>{

  //  console.warn(result);
   if(result && result.body && result.body.length===1) // result.body.length not working
  // if(result)
  {
    //  console.warn("user logged in");
    this.isLoginError.emit(false);
    localStorage.setItem('seller',JSON.stringify(result.body));
    this.router.navigate(['seller-home']);
  }
  else
  {
    console.warn("user logged failed");
    this.isLoginError.emit(true);
  }
   });
 } 
}
