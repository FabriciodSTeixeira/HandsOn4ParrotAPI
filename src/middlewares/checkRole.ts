import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

export const checkIfAdmin = (req:Request,res:Response, next:NextFunction)=>{
        const userAuth = <string>req.headers["auth"];

        let user = {};

        try{
            const jwtPayLoad = <any>jwt.verify(userAuth, config.jwtSecret);
            user = {
                id: jwtPayLoad.id, 
                email: jwtPayLoad.email,
                name: jwtPayLoad.name,
                apartment: jwtPayLoad.apartment,
                role: jwtPayLoad.role
            }
            type ObjectKey = keyof typeof user;
            const role = "role" as ObjectKey;

            if(user[role] == "ADMIN"){
                console.log(user[role])
                next();
            }else{
                res.status(403).send();
            }
        }catch(error){
            return res.status(401).send();
        }

    }

