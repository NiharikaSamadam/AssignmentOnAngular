import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor( private hs:HttpClient) { }

  //create new user
  createuser(user):Observable<any>{
    return this.hs.post("/user/createuser",user)
  }

  //authentication of user
  loginuser(credObj):Observable<any>{
    return this.hs.post("/user/loginuser",credObj)
  }

  //get user details
  getUserbyUsername(username):Observable<any>{
    return this.hs.get(`/user/getuser/${username}`)
  }

  //authentication of admin login
  adminLogin(credObj):Observable<any>{
    return this.hs.post("/admin/adminlogin",credObj)
  }

  //add products to database
  addProduct(product):Observable<any>{
    return this.hs.post("/product/addproduct",product)
  }

  //get all products from database
  getAllProducts():Observable<any>{
    return this.hs.get("/product/getproducts")
  }

  //get product by id
  getProductById(id):Observable<any>{
    return this.hs.get(`/product/getproductbyid/${id}`)
  }

  //add products to cart with username
  addProducttoCart(product):Observable<any>{
    return this.hs.post("/cart/addtocart",product)
  }

 //delete cart item with username
  deleteCartItem(cartObj):Observable<any>{
     return this.hs.post(`/cart/deleteproduct`,cartObj)
  }

  //get cart items with username
  getCartItems(username):Observable<any>{
    return this.hs.get(`/cart/getproducts/${username}`)
  }
}
