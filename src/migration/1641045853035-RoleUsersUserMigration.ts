import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class RoleUsersUserMigration1641045853035 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "role_users_user",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "roleId",
            type: "int",
          },
          {
            name: "userId",
            type: "int",
          },
        ],
      }),
      true
    );

    // clear sqls in memory to avoid removing tables when down queries executed.
    // queryRunner.clearSqlMemory();

    await queryRunner.createForeignKey(
      "role_users_user",
      new TableForeignKey({
        columnNames: ["roleId"],
        referencedColumnNames: ["id"],
        referencedTableName: "role",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "role_users_user",
      new TableForeignKey({
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "user",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("role_users_user");
  }
}
