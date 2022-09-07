import { User } from './../entity/User';
import { MigrationInterface, QueryRunner } from "typeorm"
import { AppDataSource } from "../database/data-source";

export class CreateAdmints1662563015067 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        let userRepository = AppDataSource.getRepository(User);
        
        await userRepository
        .createQueryBuilder()
        .insert()
        .into("user")
        .values([
            {name: "admin", email:"admin@admin.com.br", apartment:0, password:"admin", role:"ADMIN"}
        ])
        .execute();
    
    
    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
