import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

  constructor(private router:Router) { }
  username:string
  ngOnInit(): void {
    this.username = localStorage.getItem("username")
  }

  logOut(){
    localStorage.clear()

    //navigate to login
    this.router.navigateByUrl("/login")
  }
}
