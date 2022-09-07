import { Router } from "express"
import AuthController from "../controller/AuthController"
import { checkJwt } from "../middlewares/checkJwt";

const router = Router()
router.post("/login", AuthController.login)

router.put("/change-password", [checkJwt], AuthController.changePassword)

export default router;