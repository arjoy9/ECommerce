import { Component, OnInit } from '@angular/core';
import { SignUp, login } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showLogin=false;
  authError:string="";
  constructor(private user:UserService){}
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
      console.warn("AR",result);
      if(result){
        this.authError="Please enter valid user details";
      }
    })
  }

  openSignUp(){
    this.showLogin=false;
  }

  openLogin(){
    this.showLogin=true;
  }
}


