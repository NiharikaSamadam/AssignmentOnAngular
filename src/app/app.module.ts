import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { FormsModule } from '@angular/forms';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { UsercartComponent } from './usercart/usercart.component';
import { AddProductComponent } from './add-product/add-product.component';
import {  HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthorisationService } from './authorisation.service';
import { SpecificationComponent } from './specification/specification.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ProductsComponent } from './products/products.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    PagenotfoundComponent,
    UserdashboardComponent,
    AdmindashboardComponent,
    UserprofileComponent,
    UsercartComponent,
    AddProductComponent,
    SpecificationComponent,
    CarouselComponent,
    ProductsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthorisationService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
