const express=require("express")
const app=express()
const dotenv=require("dotenv").config()
const cors=require("cors")
const connectDB=require("./config/connectionDB")

const PORT=process.env.PORT ||3000;

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

connectDB();

app.use("/",require("./routes/User"))
app.use("/api",require("./routes/product"))
app.use("/api",require("./routes/review"))
app.use("/api",require("./routes/profile"))
app.use("/cart",require("./routes/cart"))
app.use("/favorites",require("./routes/favorites"))

app.listen(PORT,()=>
{
    console.log(`Server is Running At http://localhost:${PORT}`)
})