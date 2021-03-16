import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private us:UserserviceService,private router:Router) { }

  ngOnInit(): void {
    localStorage.clear()
  }

  submitForm(ref){
    let credObj = ref.value;
    
    if(credObj.usertype == "user"){
      delete credObj.usertype
      
      this.us.loginuser(credObj).subscribe(
        res=>{
          if(res['message'] == "Login Success"){
            localStorage.setItem("token",res['token'])
            localStorage.setItem("username",res['username'])
            
            //navigate to user dashboard
            this.router.navigateByUrl("/userdashboard")
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
            this.router.navigateByUrl("/admindashboard")
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
