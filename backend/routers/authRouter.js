import express from 'express';
const router = express.Router();

import userLoginSchema from '../validationsSchemas/userLoginSchema.js'
import validate from '../middlewares/validtionData.js';
import operations from '../controllers/authLoginData.js'
import logout from '../controllers/authLogoutData.js';
import validateJWToken from '../middlewares/validateJWToken.js'
import adminLoginZodSchema from '../validationsSchemas/adminLoginZodSchema.js'
import adminLogin from '../controllers/authLoginAdmin.js'
import decodeToken from '../middlewares/decodeJWToken.js'


router.route('/login').post(validate(userLoginSchema), operations.login)
router.route('/logout').post(validateJWToken, logout)
router.route('/admin/login').post(validate(adminLoginZodSchema), adminLogin)
router.route('/decode').post(decodeToken)

export default router;