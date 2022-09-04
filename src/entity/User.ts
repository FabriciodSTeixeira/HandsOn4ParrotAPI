import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import {Length, IsNotEmpty} from "class-validator";
import { Post } from "./Post";
import * as bcrypt from "bcryptjs";

@Entity()
@Unique(["email"])
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Length(1,70)
    name: string

    @Column()
    @Length(1,70)
    email: string

    @Column()
    @IsNotEmpty()
    apartment: number

    @Column()
    @Length(6,120)
    password: string

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date
    
    @OneToMany(() => Post, (post) => post.user)
    post: Post[]

    hashPassword(){
        this.password = bcrypt.hashSync(this.password, 8)
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);

    }

}
