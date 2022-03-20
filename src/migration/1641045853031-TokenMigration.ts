import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class TokenMigration1647782366863 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "token",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "token",
            type: "varchar",
            isUnique: true,
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
      "token",
      new TableForeignKey({
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "user",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("token");
  }
}
