import {Router , Request , Response} from "express";
import {userRegister , userLogin ,getAll ,  adminRegister} from "../controller/authcontroller";
import { sampleMiddleware } from "../middlewares/sampleMiddleWare";


const router = Router()

router.post("/register" , sampleMiddleware, userRegister )
router.post("/login", sampleMiddleware , userLogin )
router.get("/me" , sampleMiddleware, getAll )
router.post("/admin/register" , sampleMiddleware, adminRegister )

export default router
