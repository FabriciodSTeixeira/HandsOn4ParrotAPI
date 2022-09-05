import "reflect-metadata"
import { DataSource } from "typeorm"
import { Post } from "./entity/Post"
import { User } from "./entity/User"
import {CreateUser1662331509576} from "./migration/1662331509576-CreateUser";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
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
