import { MigrationInterface, QueryRunner } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export class CreateUser1662331509576 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        let userAdmin = new User();
        userAdmin.name = "Admin";
        userAdmin.email = "admin@admin.com"
        userAdmin.password = "admin";
        userAdmin.role = "ADM";
        userAdmin.apartment = 0;
        const userRepository = AppDataSource.getRepository(User);
        await userRepository.save(userAdmin);
        

        let userTest1 = new User();
        userTest1.name = "João";
        userTest1.email = "joão@joão.com.br";
        userTest1.apartment = 1;
        userTest1.role = "MORADOR";

        userRepository.save(userTest1);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
