import {Request, Response} from "express";
import * as jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";

import { User } from "../entity/User";
import config from "../config/config";
import { validate } from "class-validator";

const userRepository = AppDataSource.getRepository(User);

class AuthController {

    static login = async (req: Request, res: Response) => {
        let {name, password} = req.body

        if(!(name && password)) {
            return res.status(404).send()
        }

        let user: User

        try {
            user = await userRepository.findOneOrFail({where: {name}})
        } catch (error) {
            return res.status(401).send("User not found!")
        }

        if(!user.checkIfUnencryptedPasswordIsValid(password)) {
            return res.status(401).send("Password or user not found")
        }

        const token = jwt.sign(
            {userid: user.id, username: user.name},
            config.jwtSecret,
            {expiresIn: "1h"}
        )

        return res.send(token)
    }

    static changePassword = async (req: Request, res: Response) => {
        const id = res.locals.jwtPayload.userId

        let {oldPassword, newPassword} = req.body
        if(!(oldPassword && newPassword)) {
            return res.status(400).send()
        }

        let user: User

        try {
            user = await userRepository.findOneOrFail({where: id})
        } catch (error) {
            return res.status(401).send("User not found")
        }

        if(!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
            return res.status(401).send("Old password not match")
        }

        const errors = await validate(user)
        if(errors.length > 0) {
            return res.status(400).send(errors)
        }

        newPassword = user.hashPassword()
        
        user.password = newPassword
        
        userRepository.save(user)

        return res.status(204).send("Password changed!")
    }

};

export default AuthController;

