import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor( private hs:HttpClient) { }

  createuser(user):Observable<any>{
    return this.hs.post("/user/createuser",user)
  }

  loginuser(credObj):Observable<any>{
    return this.hs.post("/user/loginuser",credObj)
  }

  getUserbyUsername(username):Observable<any>{
    return this.hs.get(`/user/getuser/${username}`)
  }

  adminLogin(credObj):Observable<any>{
    return this.hs.post("/admin/adminlogin",credObj)
  }

  addProduct(product):Observable<any>{
    return this.hs.post("/product/addproduct",product)
  }

  getAllProducts():Observable<any>{
    return this.hs.get("/product/getproducts")
  }

  getProductById(id):Observable<any>{
    return this.hs.get(`/product/getproductbyid/${id}`)
  }

  addProducttoCart(product):Observable<any>{
    return this.hs.post("/cart/addtocart",product)
  }

  getProductsfromCart():Observable<any>{
    return this.hs.get("/cart/getproductsfromcart")
  }

  deleteProductFromCart(id):Observable<any>{
    return this.hs.delete(`/cart/deleteproduct/${id}`)
  }
}
