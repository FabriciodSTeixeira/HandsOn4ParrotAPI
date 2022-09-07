import {Router} from "express";
import { PostController } from "../controller/PostController";

const router = Router();

router.get("/", PostController.getAllPosts); 

router.get("/:id([0-9]+)", PostController.getAllPostsByUserId);

router.post("/:id([0-9]+)", PostController.newPost);

router.put("/:id([0-9]+)", PostController.editPost);

router.delete("/:id([0-9]+)", PostController.deletePost);

export default router;