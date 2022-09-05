import { validate } from "class-validator";
import { Request, Response } from "express";
import { Post } from "../entity/Post";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";

const postRepository = AppDataSource.getRepository(Post);
const userRepository = AppDataSource.getRepository(User);

export class PostController{

    static getAllPosts = async (req:Request, res:Response)=>{
        const posts = await postRepository.find({
            select:["user"]
        });

        return res.status(200).send(posts);
    }

    static getPostById = async (req:Request, res:Response) =>{
        const id : any = req.params.id

        let post : Post;
        try{
            post = await postRepository.findOneOrFail({where:id})
        }catch(error){
            return res.status(404).send("Id Not Found");
        }

        return res.status(200).send(post);
    }

    static newPost = async (req:Request, res:Response) =>{
        let {content, user} = req.body;

        let post : Post = new Post();

        post.content = content;
        post.user = user;

        const validationErrors = await validate(post)
        if(validationErrors.length >0){
            return res.status(400).send(validationErrors);
        };

        try{
            await postRepository.save(post);
        }catch(error){
            return res.status(400).send(error)
        };

        return res.status(201).send("Post Created");
    }

    static editPost = async (req:Request, res:Response) =>{
        const id :any = req.params.id;

        const {content} = req.body;

        let post: Post;
        try {
            post = await postRepository.findOneOrFail({where: id})
        } catch (error) {
            return res.status(404).send("User not found")
        };
        
        if(content) {
            post.content = content
        };

        const validationErrors = await validate(post)
        if(validationErrors.length >0){
            return res.status(400).send(validationErrors);
        };

        try{
            await postRepository.save(post);
        }catch(error){
            return res.status(400).send(error)
        };

        return res.status(200).send("Post updated");
    }

    static deletePost = async (req: Request, res: Response) => {
        const id:any = req.params.id;

        let post: Post;

        try {
            post = await postRepository.findOneOrFail({where: id})
        } catch(error) {
            return res.status(404).send("Post not found")
        };

        postRepository.delete(id);

        return res.status(204).send();
    };
};