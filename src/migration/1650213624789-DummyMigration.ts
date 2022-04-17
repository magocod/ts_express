import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class DummyMigration1650213624789 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "dummies",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "user",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("dummies");
    if (table !== undefined) {
      const foreignKey = table.foreignKeys.find(
        (fk) => fk.columnNames.indexOf("user_id") !== -1
      );
      await queryRunner.dropForeignKey(
        "dummies",
        foreignKey as TableForeignKey
      );
    } else {
      console.warn("DummyMigration1650213624789, down failed");
    }
  }
}
