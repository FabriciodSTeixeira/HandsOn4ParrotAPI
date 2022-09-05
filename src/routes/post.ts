import { checkRole } from './../middlewares/checkRole';
import {Router} from "express";
import { PostController } from "../controller/PostController";

const router = Router();

router.get("/", PostController.getAllPosts); 

router.get("/:id([0-9]+)", PostController.getPostById); //Tem que ser Admin

router.post("/", PostController.newPost);

router.put("/:id([0-9]+)", PostController.editPost);

router.delete("/:id([0-9]+)",checkRole(["ADMIN"]), PostController.deletePost); //Tem que ser do usuario logado

export default router;