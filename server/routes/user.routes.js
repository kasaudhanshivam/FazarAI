import express from "express"
import { getCurrUser, saveAssistant  } from "../controllers/user.controller.js"
import {isAuth} from "../middlewares/isAuth.js"

const userRouter = express.Router()

userRouter.get("/me", isAuth, getCurrUser)
userRouter.post("/assistant", isAuth, saveAssistant)


export default userRouter;