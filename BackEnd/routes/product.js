const express=require("express")
const router=express.Router()
const {createProduct,getAllProducts,getProductById,updateproductById,deleteProduct}=require("../controllers/productController")

router.get("/products",getAllProducts)
router.post("/product",createProduct)
router.get("/product/:id",getProductById)
router.put("/product/:id",updateproductById)
router.delete("/product/:id",deleteProduct)

module.exports=router