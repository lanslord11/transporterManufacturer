const mongoose = require("mongoose");



const orderSchema = new mongoose.Schema({
    to:{
        type:String,
        required:true
    }, 
    from:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    transporter: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    manufacturer: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Processing"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})


module.exports = mongoose.model("Order", orderSchema);