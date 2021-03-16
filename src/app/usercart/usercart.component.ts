import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-usercart',
  templateUrl: './usercart.component.html',
  styleUrls: ['./usercart.component.css']
})
export class UsercartComponent implements OnInit {

  constructor(private us : UserserviceService,private router:Router) { }
 productsArray = [];
  ngOnInit(): void {
    this.us.getProductsfromCart().subscribe(
      res => {
        if(res['message'] == "failed"){
          alert(res['reason'])

          //navigate to login
          this.router.navigateByUrl("/login")
        }
        else{
          this.productsArray = res['message']
        }
       
      },
      err =>{
        console.log(err)
        alert("Something went wrong")
        
      }
    )
  }

  deleteitem(id){
    
    this.us.deleteProductFromCart(id).subscribe(
      res=>{
        if(res['message'] == "failed"){
          alert(res['reason'])
          //navigate to login
          this.router.navigateByUrl("/login")
        }
        else{
          alert(res['message'])
          //navigate to home
          this.router.navigateByUrl("/home")
        }
      },
      err=>{
        alert("something went wrong")
        console.log(err)
      }
    )
  }
  logout(){
    localStorage.clear()
    this.router.navigateByUrl("/login")
  }

}
