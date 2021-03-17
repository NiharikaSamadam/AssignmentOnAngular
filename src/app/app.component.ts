import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 
  username:string
  title = 'ecommerceapp';
  constructor(private router : Router){}
  ngOnInit(): void {
    this.username = localStorage.getItem("username")
  }

  logout(){
    localStorage.clear()
    this.router.navigateByUrl("/login")
  }
}
