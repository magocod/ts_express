import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class RolePermissionsPermissionMigration1641045853034
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "role_permissions_permission",
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
            name: "permissionId",
            type: "int",
          },
        ],
      }),
      true
    );

    // clear sqls in memory to avoid removing tables when down queries executed.
    // queryRunner.clearSqlMemory();

    await queryRunner.createForeignKey(
      "role_permissions_permission",
      new TableForeignKey({
        columnNames: ["roleId"],
        referencedColumnNames: ["id"],
        referencedTableName: "role",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "role_permissions_permission",
      new TableForeignKey({
        columnNames: ["permissionId"],
        referencedColumnNames: ["id"],
        referencedTableName: "permission",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("role_permissions_permission");
  }
}
