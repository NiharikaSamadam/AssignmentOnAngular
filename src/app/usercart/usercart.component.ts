import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-usercart',
  templateUrl: './usercart.component.html',
  styleUrls: ['./usercart.component.css']
})
export class UsercartComponent implements OnInit {

  username:string;
  constructor(private us : UserserviceService,private router:Router) { }
 productsArray = [];
  ngOnInit(): void {
    this.username = localStorage.getItem("username")
    
    this.us.getCartItems(this.username).subscribe(
      res => {
            if(res['message'] == "failed"){
              alert(res['reason'])
              localStorage.clear()
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

  deleteitem(product){
    let id = product.productId
    let cartObj = {"username":this.username,"productId":id}
    this.us.deleteCartItem(cartObj).subscribe(
      res=>{    
          if(res['message'] == "failed"){
            alert(res['reason'])
            localStorage.clear()
            //navigate to login
            this.router.navigateByUrl("/login")
          }
          else{
            alert(res['message'])
            this.productsArray.splice(product,1)
           
          }
        },
        err=>{
          alert("something went wrong")
          console.log(err)
        }
    )}

  logout(){
    localStorage.clear()
    this.router.navigateByUrl("/login")
  }

}
