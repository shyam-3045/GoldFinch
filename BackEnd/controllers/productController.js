const Product=require("../models/Product")

exports.createProduct=async (req,res)=>
{
    try {
        const newProduct=await  Product.create(req.body)
        res.status(200).json({sucess:true , newProduct})
        
    } catch (error) {
        res.status(501).json({sucess:false , msg:error.message})
        
    }
}

exports.getAllProducts=async (req,res)=>
{
    try {
        const products= await Product.find()
        res.status(200).json({products})
    } catch (error) {
        res.status(200).json({success:false ,msg:error.message})

    }
}

exports.getProductById=async(req,res)=>
{
    try {
        const id=req.params.id
        const product=await Product.findById(id)
        if(!product)
        {
            return res.status(404).json({ message: "Product not found" })
        }
        res.status(200).json({sucess:true,product})
    } catch (error) {
        res.status(500).json({sucess:false,msg:error.message})

    }

}


exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id; 

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    await product.deleteOne(); 

    res.status(200).json({ success:true,msg: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success:false,msg:error.message });
  }
};

exports.updateproductById=async (req,res)=>
{
    try {
        const id=req.params.id
        const product=await Product.findById(id)

        if(!product)
        {
            res.status(404).json({msg:"Product Not Found"})
         }
        const updatedproduct=await Product.findByIdAndUpdate(id,req.body,{
            new:true,
            runValidaters:true,
            useFindAndModify:false
        })
        res.status(200).json({success:true,updatedproduct})
        
        } catch (error) {
            res.status(500).json({success:false,msg:error.message})

        }
}