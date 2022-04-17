import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class ProfileMigration1650199457388 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "profile",
      new TableColumn({
        name: "status",
        type: "int",
        default: 0,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("profile", "status");
  }
}
