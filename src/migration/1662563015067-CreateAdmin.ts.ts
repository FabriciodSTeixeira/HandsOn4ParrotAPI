import { User } from './../entity/User';
import { MigrationInterface, QueryRunner } from "typeorm"
import { AppDataSource } from "../data-source";

export class CreateAdmints1662563015067 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner = AppDataSource.createQueryRunner();
        let queryBuilder = AppDataSource.createQueryBuilder();
        
        await queryBuilder.insert()
        .into(User)
        .values([{name:"Admin", email:"admin@admin.com",apartment:0, password:"admin", role:"ADMIN"}])
        .execute();  
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
