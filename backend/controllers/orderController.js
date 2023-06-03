const Order = require("../models/orderModel")
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures= require("../utils/apifeatures")

//create new order 
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {to,from,quantity,transporter } = req.body;

    const order = await Order.create({
        to,from,quantity,transporter,manufacturer:req.user._id
    });

    res.status(201).json({
        success: true,
        order
    })
})


// get single order 
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    console.log(req.query);
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHander("Order not found with this id ", 404));

    }

    res.status(200).json({
        success: true,
        order,
    })
});

// get loggen in user orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    console.log(req.user.role);
    var orders;
    var apiFeature;
    if(req.user.role==="manufacturer"){
        apiFeature= new ApiFeatures(Order.find({ manufacturer: req.user._id }),req.query).search();
        orders = await apiFeature.query.clone();

    }else{
        apiFeature= new ApiFeatures(Order.find({ transporter: req.user._id }),req.query).search();
        orders = await apiFeature.query.clone();
    }

    // const apiFeature= new ApiFeatures(orders,req.query).search().filter();
    // let filteredorders = await apiFeature.query.clone();

    // const orders = await Order.find({ transporter: req.user._id });


    res.status(200).json({
        success: true,
        orders
    })
});


// get all orders --admin
// exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
//     const orders = await Order.find();

//     let totalAmount = 0;
//     orders.forEach(order => {
//         totalAmount += order.totalPrice;
//     })

//     res.status(200).json({
//         success: true,
//         totalAmount,
//         orders,
//     })
// });

// update Order Status --admin
exports.setOrderPrice = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(req.user.role!=="transporter"){
        return next(new ErrorHander("Only transporter can set the price of this order"));
    }
    if (!order) {
        return next(new ErrorHander("Order not found with this Id"));
    }
    if(!(req.user._id.toString()===order.transporter.toString() )){// this return false if both the ids have doesn't have the same location being pointed
        return next(new ErrorHander("Access Denied.You can only set price of your orders"));
    }

    order.orderStatus = "Accepted";
    order.itemsPrice = req.body.price;

    await order.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
        order
    })


});

// async function updateStock(id, quantity) {
//     const product = await Product.findById(id);
//     product.Stock -= quantity;
//     await product.save({
//         validateBeforeSave: false
//     })
// }

// delete order --admin
// exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
//     const order = await Order.findById(req.params.id);

//     if (!order) {
//         return next(new ErrorHander("Order not found with this Id"));
//     }

//     await order.remove();

//     res.status(200).json({
//         success: true,

//     })
// });