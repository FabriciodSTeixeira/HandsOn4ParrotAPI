import { checkIfAdmin } from './../middlewares/checkRole';
import {Router} from "express";
import { UserController } from "../controller/UserController";

const router = Router();

router.get("/", checkIfAdmin, UserController.getAllUsers);  //Tem que ser admin

router.get("/:id([0-9]+)",checkIfAdmin, UserController.getOneUserById);

router.get("/info/", UserController.getUserInfoFromToken);

router.post("/", UserController.newUser);

router.put("/:id([0-9]+)", UserController.editUser);

router.delete("/:id([0-9]+)",checkIfAdmin, UserController.deleteUser); //Tem que ser admin

export default router;