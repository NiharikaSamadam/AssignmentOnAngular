const exp = require("express")
cartApiObj = exp.Router()

//import express-async-handler
const errorHandler = require("express-async-handler")
const Cart = require("../models/Cart")

//import payload
cartApiObj.use(exp.json())

//import verifyToken
const validateToken = require("./middlewares/verifyToken")

//add product to cart
//http://localhost:3000/cart/addtocart
cartApiObj.post("/addtocart",validateToken,errorHandler(async(req,res)=>{

    //search for product in db with id
    let cartObjFromDb = await Cart.findOne({$and:[{username:req.body.username},{productId:req.body.productId}]})

    //if product already exists in cart
    if(cartObjFromDb == null){
        let newCartObj = new Cart({
            username : req.body.username,
            productId : req.body.productId,
            pname : req.body.pname,
            price : req.body.price,
            brand : req.body.brand,
            image : req.body.image
    })

        await newCartObj.save()
        res.send({message:"product added to cart"})
        
    }
    //if product doesn't exists in the cart
    else{
        res.send({message:"product already exists in cart"})
    }
}))

//delete product from cart
//http://localhost:3000/cart/deleteproduct/<username>
cartApiObj.post("/deleteproduct",validateToken,errorHandler(async(req,res)=>{
 
    //delete product whose username is given in the path
    let result = await Cart.deleteOne({$and:[{username:req.body.username},{productId:req.body.productId}]})
    res.send({message:"deleted successfully"})
  
}))

//get products from cart with username
//http://localhost:3000/cart/getproducts/<username>
cartApiObj.get("/getproducts/:username",validateToken,errorHandler(async(req,res)=>{

    let productsArrayfromCart = await Cart.find({username:req.params.username})
    
    res.send({message:productsArrayfromCart})
}))



//export
module.exports = cartApiObj