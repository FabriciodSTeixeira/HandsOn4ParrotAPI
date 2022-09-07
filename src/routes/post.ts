import {Router} from "express";
import { PostController } from "../controller/PostController";

const router = Router();

router.get("/", PostController.getAllPosts); 

router.get("/all-posts", PostController.getAllPostsByUserId);

router.post("/new", PostController.newPost);

router.put("/:id([0-9]+)", PostController.editPost);

router.delete("/:id([0-9]+)", PostController.deletePost);

export default router;