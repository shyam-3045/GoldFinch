const express=require("express")
const app=express()
const cors=require("cors")
const connectDB=require("./config/connectionDB")
require("dotenv").config()

const PORT=process.env.PORT ||3000;

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

connectDB();

app.use('/razorpay/webhook', express.raw({ type: 'application/json' }));

const webhookRoute = require('./controllers/webhook');
app.use('/', webhookRoute);

app.use("/",require("./routes/User"))
app.use("/api",require("./routes/product"))
app.use("/api",require("./routes/review"))
app.use("/api",require("./routes/profile"))
app.use("/cart",require("./routes/cart"))
app.use("/favorites",require("./routes/favorites"))
app.use("/api",require("./routes/payment"))
app.use("/api",require("./routes/otpMailer"))
app.use("/api",require("./routes/order"))

app.listen(PORT,()=>
{
    console.log(`Server is Running At http://localhost:${PORT}`)
})