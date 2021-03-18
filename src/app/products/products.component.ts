import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private us:UserserviceService,private router : Router) { }
 
  productsArray = [];
  username:string;
  
  ngOnInit(): void {
    this.username = localStorage.getItem("username")
    this.us.getAllProducts().subscribe(
      res=>{
        this.productsArray = res['message']
      },
      err =>{
        alert("Something went wrong")
        console.log(err)
      }
    )
  }


  specifications(id){
    //navigate to specifications
    this.router.navigateByUrl(`/specification/${id}`)
  }

  addtocart(product){
    this.us.addProducttoCart(product).subscribe(
         res=>{
           if(res["message"] == "failed"){
             alert(res["reason"])
             //navigate to login
             this.router.navigateByUrl("/login")
           }
           else{
            if(res['message'] == "product added to cart"){
              alert(res['message'])
            }
            else{
              alert(res['message'])
            }
           }
         },
         err=>{
           console.log(err)
           alert("something went wrong")
         }
    )
  }
  

}
