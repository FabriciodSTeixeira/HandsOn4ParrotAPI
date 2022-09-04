import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"
import {Length, IsNotEmpty} from "class-validator";
import { User } from "./User";

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Length(1,300)
    content : string

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(()=> User, (user) => user.post)
    user:User

};