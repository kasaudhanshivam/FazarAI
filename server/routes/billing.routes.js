import express from 'express'
import { createOrder, verifyBilling } from '../controllers/billing.controller.js';
import { isAuth } from '../middlewares/isAuth.js';


const billingRouter = express.Router();


billingRouter.post("/pay", isAuth, createOrder)
billingRouter.post("/verify", isAuth, verifyBilling)



export default billingRouter;