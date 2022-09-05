import { checkRole } from './../middlewares/checkRole';
import {Router} from "express";
import { UserController } from "../controller/UserController";

const router = Router();

router.get("/", UserController.getAllUsers);  //Tem que ser admin

router.get("/:id([0-9]+)", UserController.getOneUserById); //Tem que ser Admin

router.post("/", UserController.newUser);

router.put("/:id([0-9]+)", UserController.editUser);

router.delete("/:id([0-9]+)",checkRole(["ADMIN"]), UserController.deleteUser); //Tem que ser admin

export default router;