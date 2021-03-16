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
    let cartObjFromDb = await Cart.findOne({productId:req.body.productId})

    //if product already exists in cart
    if(cartObjFromDb == null){
        let newCartObj = new Cart({
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

//get products from cart
//http://localhost:3000/cart/getproductsfromcart
cartApiObj.get("/getproductsfromcart",validateToken,errorHandler(async(req,res)=>{

    //get products from cart
    let productsArray = await Cart.find()

    res.send({message : productsArray})
}))

//delete product from cart
//http://localhost:3000/cart/deleteproduct/<productId>
cartApiObj.delete("/deleteproduct/:productId",validateToken,errorHandler(async(req,res)=>{

    //delete product
    let result = await Cart.deleteOne({productId : req.params.productId})

    res.send({message:"deleted successfully"})
}))

//export
module.exports = cartApiObj