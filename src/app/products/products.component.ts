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
    this.username = localStorage.getItem("username")
    let productObj = {"username":this.username,"productId":product.productId,"pname":product.pname,"price":product.price,"brand":product.brand,"image":product.image}
    this.us.addProducttoCart(productObj).subscribe(
         res=>{
           if(res["message"] == "failed"){
             alert(res["reason"])
             //navigate to login
             localStorage.clear()
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
