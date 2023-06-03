const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser");

// const dotenv = require("dotenv");
const path = require("path");

const errorMiddleware = require("./middleware/error")

//config
if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({ path: "backend/config/config.env" })
}
// dotenv.config({path:"backend/config/config.env"});

app.use(cors({
    origin:true,
    credentials:true,
}))
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
// Route Imports 

const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");

app.use("/api", order);
app.use("/api", user)



app.use(express.static(path.join(__dirname,"../frontend/build")))

app.get("*",(req,res)=>{
    app.use(express.static(path.resolve(__dirname,"../frontend/build")))
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
})


//Middleware of Errors 
app.use(errorMiddleware);

module.exports = app