import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class UserMigration1641045853029 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true,
            isNullable: false,
          },
          {
            name: "firstName",
            type: "varchar",
          },
          {
            name: "lastName",
            type: "varchar",
          },
          {
            name: "profileId",
            type: "int",
          },
          {
            name: "password",
            type: "varchar",
            isNullable: false,
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

    // clear sqls in memory to avoid removing tables when down queries executed.
    // queryRunner.clearSqlMemory();

    await queryRunner.createForeignKey(
      "user",
      new TableForeignKey({
        columnNames: ["profileId"],
        referencedColumnNames: ["id"],
        referencedTableName: "profile",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user");
  }
}
