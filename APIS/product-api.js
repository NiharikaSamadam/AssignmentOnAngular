//mini express
const exp = require("express")
productApiObj = exp.Router()

//import express-async-handler
const errorHandler = require("express-async-handler")
const Product = require("../models/Product")

//import payload
productApiObj.use(exp.json())

//import verifyToken
const validateToken = require("./middlewares/verifyToken")

//imports
const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const multer = require("multer")

//configure cloudinary
cloudinary.config({
    cloud_name:'drudeeylj',
    api_key:'381539586774675',
    api_secret: 'loiOEfGtH_edKpA1WU3LOoo7u6E' 
 });

//cofigure cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:async (req, file) => {
    return {
    folder: 'ecommerce', 
    public_id: file.fieldname + '-' + Date.now()
    }},
   });

//configure multer
var upload = multer({ storage: storage })

//create a product
//http://localhost:3000/product/addproduct
productApiObj.post("/addproduct",upload.single('image'),validateToken,errorHandler(async(req,res)=>{

    //the req.body.userObj is in JSON,so convert to object
   req.body=JSON.parse(req.body.productObj)
   req.body.image=req.file.path;
   

    //search for product in db with productId
    let productObjFromDb = await Product.findOne({productId:req.body.productId})

    //if product doesn't exists
    if(productObjFromDb == null){

        //create a new object
        let newProductObj = new Product({
            productId : req.body.productId,
            pname : req.body.pname,
            price : req.body.price,
            brand : req.body.brand,
            image : req.body.image
        })

        //save it 
        await newProductObj.save()
        res.send({message : "Product added"})
    }
    else{
        res.send({message:"product already exists"})
    }

}))


//get all products
//http://localhost:3000/product/getproducts
productApiObj.get("/getproducts",errorHandler(async(req,res)=>{

    //get all products from db
    let productsArray = await Product.find()

    res.send({message:productsArray})
}))


//get Product by id
//http://localhost:3000/product/getproductbyid/<id>
productApiObj.get("/getproductbyid/:productId",errorHandler(async(req,res)=>{

    //get product by id from db
    let productObj = await Product.findOne({productId:req.params.productId})

    res.send({message:productObj})
}))


//export
module.exports=productApiObj;