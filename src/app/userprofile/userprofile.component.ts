import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  constructor(private us:UserserviceService,private router:Router) { }
 
  userObj:any;

  ngOnInit(): void {
   
    let username = localStorage.getItem("username");

    this.us.getUserbyUsername(username).subscribe(
      res=>{

        if(res['message'] == "failed"){
          alert(res['reason'])
          localStorage.clear()
          //navigate to loin
          this.router.navigateByUrl("/login")
        }
        else{
        this.userObj = res['message']
        }
      },
      err=>{
        alert("something went wrong")
        console.log(err)
      }
    )


  }

}
