import { validate } from "class-validator";
import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { Post } from "../entity/Post";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import config from "../config/config";

const postRepository = AppDataSource.getRepository(Post);
const userRepository = AppDataSource.getRepository(User);

export class PostController{

    static getAllPosts = async (req:Request, res:Response)=>{
        const posts = await postRepository.find({
            relations: {user : true},
            select: {user :{
                id: true,
                name : true,
                apartment: true,
            }}
        });

        return res.status(200).send(posts);
    }

    static getAllPostsByUserId = async (req:Request, res:Response) =>{
        const idUser : any = req.params.id
        const user = userRepository.findOneOrFail({where:{id:idUser}})

        if (!user){
            return res.status(404).send("User Not Found");
        }

        let posts : any;
        try{
            let posts = await postRepository.find({
                where:{
                    user:{
                        id:idUser
                    }
                }
            })
            return res.status(200).send(posts);
        }catch(error){
            return res.status(404).send("Id Not Found");
        }

        return res.status(200).send(posts);
    }

    static newPost = async (req:Request, res:Response) =>{
        const userAuth = <string>req.headers["auth"];

        let userId

        try{
            const jwtPayLoad = <any>jwt.verify(userAuth, config.jwtSecret);
            userId = jwtPayLoad.id
        }catch(error){
            return res.status(401).send();
        }

        const user = await userRepository.findOneBy(userId);

        const { content } = req.body;

        if (!user) {
            return res.status(404).json({message:"User not found."})
        };

        const newPost = postRepository.create({
            content,
            user
        });

        await postRepository.save(newPost);

        return res.status(201).send("Post Created");
        };

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