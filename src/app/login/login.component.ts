import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private us:UserserviceService,private router:Router) { }

  username:string;
  @Input() user:string

  ngOnInit(): void {
  
    if(localStorage.getItem("username") == null){
      this.router.navigateByUrl("/login")
      
    }
    else{
      if(localStorage.getItem("usertype") == "user"){
        this.router.navigateByUrl(`/userdashboard/${localStorage.getItem("username")}`)
      }
      else{
        this.router.navigateByUrl("/admindashboard/admin")
      }
    }
    
  }

  submitForm(ref){
    let credObj = ref.value;
    localStorage.setItem("usertype",credObj.usertype)
    if(credObj.usertype == "user"){
      delete credObj.usertype
      
      this.us.loginuser(credObj).subscribe(
        res=>{
          if(res['message'] == "Login Success"){
            this.username = res['username']
            localStorage.setItem("token",res['token'])
            localStorage.setItem("username",res['username'])
            sessionStorage.setItem("username",this.username)
            //navigate to user dashboard
            this.router.navigateByUrl(`/userdashboard/${this.username}`)
          }
          else{
            alert(res['reason'])
          }
        },
        err=>{
          alert("something went wrong")
          console.log(err)
        }
      )
    }

    if(credObj.usertype == "admin"){
      delete credObj.usertype

      this.us.adminLogin(credObj).subscribe(
        res =>{
          if(res['message'] == "Login Success"){
            localStorage.setItem("token",res['token'])
            localStorage.setItem("username",res['username'])
            
            //navigate to user dashboard
            this.router.navigateByUrl("/admindashboard/admin")
          }
          else{
            alert(res['reason'])
          }
        },
        err =>{
          alert("Something went wrong")
          console.log(err)
        }
      )
    }
  }

}
