import { validate } from "class-validator";
import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { User } from "../entity/User";
import { AppDataSource } from "../database/data-source";
import config from "../config/config";

const userRepository = AppDataSource.getRepository(User);

export class UserController {

    static newUser = async (req:Request,res:Response)=>{
        let {name, email, apartment, password} = req.body;

        let user : User = new User();

        
        user.name = name;
        user.email = email;
        user.apartment = apartment;
        user.password = password;
        user.role = "MORADOR";

        user.hashPassword();

        const validationErrors = await validate(user)
        if(validationErrors.length >0){
            return res.status(400).send(validationErrors);
        };

        try{
            await userRepository.save(user);
        }catch(error){
            return res.status(400).send(error);
        };

        return res.status(201).send("User Created");

    };

    static getOneUserById = async (req:Request,res:Response)=>{
        const id:any = req.params.id;

        let user:User;
        try{
            user = await userRepository.findOneOrFail({where:{id}});
        }catch(error){
            return res.status(404).send("user not found");
        }

        return res.status(200).send(user);
    };

    static editUser = async (req:Request, res:Response)=>{
        const id:any = req.params.id;

        const {name, apartment, email} = req.body;

        let user:User;

        try{
            user = await userRepository.findOneOrFail({where:{id}});
        }catch(error){
            return res.status(404).send("User not found")
        };

        if(name){
            user.name = name;
        };
        if(email){
            user.email = email;
        };
        if(apartment){
            user.apartment = apartment;
        };
        
        const validationErrors = await validate(user)
        if(validationErrors.length >0){
            return res.status(400).send(validationErrors);
        };
        try {
            await userRepository.save(user)
        } catch(error) {
            return res.status(409).send("E-mail already in use")
        }

        return res.status(200).send(user)
    
    };

    //Gets info from the authenticated user.
    static getUserInfoFromToken = async(req:Request, res:Response) =>{
        const userAuth = <string>req.headers["auth"];

        let user = {};

        try{
            const jwtPayLoad = <any>jwt.verify(userAuth, config.jwtSecret);
            user = {
                userId: parseInt(jwtPayLoad.id), 
                email: jwtPayLoad.email,
                name: jwtPayLoad.name,
                apartment: jwtPayLoad.apartment
            }
        }catch(error){
            return res.status(401).send();
        }

        console.log(user);
        return res.status(200).send(user);
    };

    //Admin get all users to network adm.
    static getAllUsers = async (req:Request, res:Response)=>{
        const users = await userRepository.find();
    
        return res.status(200).send(users);
    
    };

    //Admin only route to network adm.
    static deleteUser = async (req:Request, res:Response)=>{
        const id:any = req.params.id;
        
        let user:User;

        try{
            user = await userRepository.findOneOrFail({where:{id}});
        }catch(error){
            return res.status(404).send("User not found")
        };

        userRepository.delete(id);

        return res.status(204).send()
    };
};