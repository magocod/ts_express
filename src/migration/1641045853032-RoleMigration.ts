import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class RoleMigration1641045853032 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
              name: "role",
              columns: [
                  {
                      name: "id",
                      type: "int",
                      isPrimary: true,
                      isGenerated: true,
                      generationStrategy: "increment",
                  },
                  {
                      name: "name",
                      type: "varchar",
                  },
                  {
                      name: "createdAt",
                      // type: "datetime", // pg error
                      // type: "timestamp",
                      type: "timestamp with time zone", // pg only
                      default: "now()",
                  },
                  {
                      name: "updatedAt",
                      // type: "datetime", // pg error
                      // type: "timestamp",
                      type: "timestamp with time zone", // pg only
                      default: "now()",
                  },
              ],
          }),
          true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("role");
    }

}
