import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class UserMigration1626048567179 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
          name: "user",
          columns: [
              {
                  name: "id",
                  type: "int",
                  isPrimary: true
              },
              {
                  name: "firstName",
                  type: "varchar",
              },
              {
                  name: "lastName",
                  type: "varchar",
              }
          ]
      }), true)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("user");
  }
}
