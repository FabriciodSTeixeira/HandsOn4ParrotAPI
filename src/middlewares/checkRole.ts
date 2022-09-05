import {Request, Response, NextFunction} from "express"
import { AppDataSource } from "../data-source"

import {User} from "../entity/User"

export const checkRole = (roles: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        if(!res.locals.jwtPayload.userid){
            return res.status(404).send("User Not Authorized!")
        }
        const id = await res.locals.jwtPayload.userid;
        
        

        const userRepository = AppDataSource.getRepository(User)
        let user: User
        try {
            user = await userRepository.findOneOrFail({where: {id}})
        } catch(error: any) {
            res.status(401).send(error.message)
        }

        if(roles.indexOf(user.role) > -1){
            next();
        } else {
            res.status(401).send()
        }
    }
}