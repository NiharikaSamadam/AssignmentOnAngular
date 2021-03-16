import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RegisterComponent } from './register/register.component';
import { SpecificationComponent } from './specification/specification.component';
import { UsercartComponent } from './usercart/usercart.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { UserprofileComponent } from './userprofile/userprofile.component';

const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"userdashboard",component:UserdashboardComponent,children:[
    {path:"userprofile",component:UserprofileComponent},
  ]},
  {path:"usercart",component:UsercartComponent},
  {path:"admindashboard",component:AdmindashboardComponent,children:[
    {path:"addproduct",component:AddProductComponent},
  ]},
  {path:"specification/:id",component:SpecificationComponent},
  {path:"",redirectTo:"/home",pathMatch:"full"},
  {path:"**",component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
