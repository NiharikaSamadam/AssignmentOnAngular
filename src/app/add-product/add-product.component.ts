import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private us:UserserviceService,private router:Router) { }

  ngOnInit(): void {
    
  }

  file:File;
  incomingfile(event){

   this.file = event.target.files[0]
  
  }

 formData = new FormData()

  addProduct(ref){

    let productObj = ref.value
    
    this.formData.append("image",this.file,this.file.name)
    this.formData.append("productObj",JSON.stringify(productObj))

    this.us.addProduct(this.formData).subscribe(
      res=>{
        if(res['message'] == "failed"){
          alert(res['reason'])

          //navigate to loin
          this.router.navigateByUrl("/login")
        }
        else{
          
        if(res['message'] == 'Product added'){
          alert(res['message'])
        }
        else{
          alert(res['message'])
        }
      }
      },
      err=>{
        alert("Something went wrong")
        console.log(err)
      }
    )
  }
}
