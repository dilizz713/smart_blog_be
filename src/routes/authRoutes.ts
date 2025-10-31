import {Router , Request , Response} from "express";
import {userRegister , userLogin ,getAll ,  adminRegister} from "../controller/authcontroller";


const router = Router()

router.post("/register" , userRegister )
router.post("/login" , userLogin )
router.get("/me" , getAll )
router.post("/admin/register" , adminRegister )

export default router
