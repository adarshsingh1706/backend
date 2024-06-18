import { Router } from "express";
const router = Router()
import {handleRegisterUser} from "../controllers/user.controller.js"

router.route("/register").post(handleRegisterUser);


export default router