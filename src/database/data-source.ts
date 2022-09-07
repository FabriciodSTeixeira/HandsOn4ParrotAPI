import "reflect-metadata"
import * as dotenv from "dotenv";
import { DataSource } from "typeorm"
import { Post } from "../entity/Post"
import { User } from "../entity/User";
import {CreateUserAndPost1662331509576} from "../migration/1662331509576-CreateUserAndPost";
import { CreateAdmints1662563015067 } from "../migration/1662563015067-CreateAdmin.ts";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port : 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_KEY,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User,Post],
    migrations: [CreateUserAndPost1662331509576, CreateAdmints1662563015067],
    subscribers: [],
})
