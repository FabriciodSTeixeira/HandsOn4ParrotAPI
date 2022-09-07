import {Request, Response, NextFunction} from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";


export const checkJwt = (req:Request, res:Response, next:NextFunction) =>{
    const token = <any>req.headers["auth"]
    let jwtPayLoad

    try{
        jwtPayLoad = <any>jwt.verify(token, config.jwtSecret)
        res.locals.jwtPayload = jwtPayLoad
    }catch(error:any){
        return res.status(401).send()
    };

    
    const {id, email} = jwtPayLoad;
    const newToken = jwt.sign({id, email}, config.jwtSecret, {
        expiresIn: "1h"
    })

     res.setHeader("token", newToken)

    next()
}
