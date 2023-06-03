const express = require("express");
const { newOrder, getSingleOrder, myOrders, getAllOrders, deleteOrder, setOrderPrice } = require("../controllers/orderController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth")


router.route("/order/new").post(isAuthenticatedUser,authorizeRoles("manufacturer"), newOrder)

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder).put(isAuthenticatedUser, setOrderPrice);

router.route("/orders/me").get(isAuthenticatedUser, myOrders)

// router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders)

// router.route("/admin/order/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder).delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);
module.exports = router;