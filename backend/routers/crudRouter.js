import express from 'express';
const router = express.Router();

import userRegisterationSchema from '../validationsSchemas/userRegisterationSchema.js'
import validate from '../middlewares/validtionData.js';
import operations from '../Controllers/savingData.js'
import { addFoodItem, uploadMiddleware } from '../controllers/adminAddFoodItem.js';
import deleteFoodItem from '../controllers/deleteFoodItem.js'
import updateFoodItem from '../controllers/updateFoodItem.js';
import createSeat from '../controllers/adminCreateSeats.js'; // Importing the createSeat controller
import deleteSeat from '../controllers/adminDeleteTable.js';
import adminFreeTable from '../controllers/adminFreeTable.js'
import reservationTable from '../controllers/reservationTable.js'
import occupySeat from '../controllers/occupySeat.js'
import deleteReservation from '../controllers/adminDeleteReservation.js';
import cancelReservation from '../controllers/cancelReservation.js';
import saveCartItem from '../controllers/cartItemAdd.js';
import updateCartItem from '../controllers/updateCartItem.js'
import finalOrderData from '../controllers/finalOrderData.js'
import adminUpdateOrderStatus from '../controllers/adminUpdateOrderStatus.js'

router.route('/register').post(validate(userRegisterationSchema), operations.save)
router.route('/book/reservation').post(reservationTable)
router.route('/cancel/reservation/:id').post(cancelReservation)
router.route('/update/cart/item').post(updateCartItem)
router.route('/create/order').post(finalOrderData)
router.post('/occupySeat/:id', occupySeat);
router.post('/cart/item', saveCartItem)

// router.route('/admin/register').post(validate(adminLoginZodSchema), adinRegister)
router.route('/admin/additem/food').post(uploadMiddleware, addFoodItem);
router.route('/admin/deleteitem/food/:id').delete(deleteFoodItem);
router.route('/admin/deleteitem/table/:id').delete(deleteSeat);
router.route('/admin/updateitem/food/:id').put(updateFoodItem);
router.post('/admin/createseat', createSeat);
router.post('/admin/freeSeat/:id', adminFreeTable);
router.route('/admin/delete/reservation/:id').post(deleteReservation)
router.route('/update/order/item/status').put(adminUpdateOrderStatus)


export default router;  