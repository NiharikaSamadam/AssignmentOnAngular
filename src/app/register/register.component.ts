import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private us:UserserviceService,private router:Router) { }

  ngOnInit(): void {
  }

  file:File;
  incomingfile(event){
    
    this.file = event.target.files[0]
   
  }

  formData = new FormData()

  submitForm(ref){
    let userObj = ref.value;
     
    this.formData.append("image",this.file,this.file.name)
    this.formData.append("userObj",JSON.stringify(userObj))
    
    this.us.createuser(this.formData).subscribe(
      res=>{
        if(res['message'] == "User created"){
         
          alert(res['message'])
          //navigate to login page
          this.router.navigateByUrl("/login")

        }
        else{
          alert("user already exists... Please choose another one")
        }
      },
      err =>{
        alert("Something went wrong")
        console.log(err)
      }
    )
  }
}
