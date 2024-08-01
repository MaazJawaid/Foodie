import express from 'express';
const router = express.Router();
import getFoodItem from '../controllers/getFoodItem.js'
import adminGetTableData from '../controllers/adminGetTableData.js'
import getAllReservations from '../controllers/getReservationData.js';
import getDataByEmail from '../controllers/getReservationEmailData.js';
import findCartItemById from '../controllers/findCartItem.js';
import findAllCartItemByEmail from '../controllers/findCartAll.js';
import getOrderDetailsAdmin from '../controllers/getOrderDetailsAdmin.js'
import getOrderDetails from '../controllers/getOrderDetails.js'

router.route('/all/cart/item').get(findAllCartItemByEmail)
router.route('/cart/item').get(findCartItemById)
router.route('/food/items/all').get(getFoodItem)
router.route('/table/items/all').get(adminGetTableData)
router.route('/reservations/item/:id').get(getAllReservations)
router.route('/user/reservations/data').get(getDataByEmail)
router.route('/order/details/admin').get(getOrderDetailsAdmin)
router.route('/order/details/user').get(getOrderDetails)

export default router;