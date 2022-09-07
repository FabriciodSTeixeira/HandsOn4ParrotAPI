import "reflect-metadata"
import { DataSource } from "typeorm"
import { Post } from "./entity/Post"
import { User } from "./entity/User";
import {CreateUserAndPost1662331509576} from "./migration/1662331509576-CreateUserAndPost";
import { CreateAdmints1662563015067 } from "./migration/1662563015067-CreateAdmin.ts";


// Fazer o dot env


export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: "root",
    password: "root",
    database: "parrotapi",
    synchronize: true,
    logging: false,
    entities: [User,Post],
    migrations: [CreateUserAndPost1662331509576, CreateAdmints1662563015067],
    subscribers: [],
})
