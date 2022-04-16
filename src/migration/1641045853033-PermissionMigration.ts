import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class PermissionMigration1641045853033 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
              name: "permission",
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
                      type: "timestamp",
                      default: "now()",
                  },
                  {
                      name: "updatedAt",
                      // type: "datetime", // pg error
                      type: "timestamp",
                      default: "now()",
                  },
              ],
          }),
          true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("permission");
    }

}
