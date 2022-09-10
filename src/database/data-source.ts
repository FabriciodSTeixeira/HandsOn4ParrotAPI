import "reflect-metadata"
import * as dotenv from "dotenv";
import { DataSource, DataSourceOptions } from 'typeorm'
import { SeederOptions } from 'typeorm-extension'
import { Post } from "../entity/Post"
import { User } from "../entity/User";
import {CreateUserAndPost1662331509576} from "../migration/1662331509576-CreateUserAndPost";

dotenv.config();

const options: DataSourceOptions & SeederOptions = {
    type: "mysql",
    host: process.env.HOST,
    port : parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_KEY,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User,Post],
    migrations: [CreateUserAndPost1662331509576],
    subscribers: [],

    
    seeds: ['src/database/seeds/**/*{.ts,.js}']
}
export const AppDataSource = new DataSource(options);