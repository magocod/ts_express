import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ProfileMigration1641045853028 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "profile",
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
            name: "created_at",
            // type: "datetime", // pg error
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
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
    await queryRunner.dropTable("profile");
  }
}
