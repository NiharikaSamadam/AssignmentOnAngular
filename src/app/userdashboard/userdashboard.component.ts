import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {

  constructor(private router:Router) { }
  
  username:string;

  ngOnInit(): void {
 
    this.username = localStorage.getItem("username")

  }

  logOut(){
    localStorage.clear()
    //navigate to login page
   this.router.navigateByUrl("/login")

  }
}
