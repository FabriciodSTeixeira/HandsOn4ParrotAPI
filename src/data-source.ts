import "reflect-metadata"
import { DataSource } from "typeorm"
import { Post } from "./entity/Post"
import { User } from "./entity/User"
import {CreateUser1662331509576} from "./migration/1662331509576-CreateUser";


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
    migrations: [CreateUser1662331509576],
    subscribers: [],
})
