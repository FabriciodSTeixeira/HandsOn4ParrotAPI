import {     MigrationInterface,QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";
import { AppDataSource } from "../database/data-source";

export class CreateUserAndPost1662331509576 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.createTable(new Table({
            name: "user",
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                  },
                  {
                    name:"name",
                    type:"varchar",
                    isNullable:false,
                  },
                  {
                    name:"email",
                    type:"varchar",
                    isNullable:false,
                  },
                  {
                    name:"apartment",
                    type:"int",
                    isNullable:false,
                  },
                  {
                    name:"password",
                    type:"varchar",
                    isNullable:false,
                  },
                  {
                    name:"role",
                    type:"varchar(255)",
                    isNullable:false,
                  },
                  {
                    name:"createdAt",
                    type:"timestamp",
                    default:"now()",
                  },
                  {
                    name:"updatedAt",
                    type:"timestamp",
                    default:"now()",
                  },
                  {
                    name:"post",
                    type:"varchar",
                    isNullable:false,
                  },
        ]
        }), true);

        await queryRunner.createTable(new Table({
            name:"post",
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                  },
                  {
                    name:"content",
                    type:"varchar(300)"
                 },
                  {
                    name:"createdAt",
                    type:"timestamp",
                    default:"now()",
                  },
                  {
                    name:"updatedAt",
                    type:"timestamp",
                    default:"now()",
                  },
            ]
        }), true);

        await queryRunner.addColumn(
            "post",
            new TableColumn({
                name: "user_iduser",
                type:"int",
            })
        );

        await queryRunner.createForeignKey(
            "post",
            new TableForeignKey({
                columnNames: ["user_iduser"],
                referencedColumnNames: ["id"],
                referencedTableName: "user",
                onDelete: "CASCADE",
            }),
        )


        await queryRunner.release();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("post")
        const foreignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("user_iduser") !== -1,
        )
        await queryRunner.dropForeignKey("post", foreignKey)
        await queryRunner.dropColumn("post", "user_iduser")
        await queryRunner.dropTable("post")
        await queryRunner.dropTable("user")
    }

}
