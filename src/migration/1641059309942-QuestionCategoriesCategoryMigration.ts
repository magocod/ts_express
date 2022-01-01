import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class QuestionCategoriesCategoryMigration1641059309942
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "question_categories_category",
        columns: [
          // {
          //     name: "id",
          //     type: "int",
          //     isPrimary: true,
          //     isGenerated: true,
          //     generationStrategy: "increment",
          // },
          {
            name: "questionId",
            type: "int",
          },
          {
            name: "categoryId",
            type: "int",
          },
        ],
      }),
      true
    );

    // clear sqls in memory to avoid removing tables when down queries executed.
    // queryRunner.clearSqlMemory();

    await queryRunner.createForeignKey(
      "question_categories_category",
      new TableForeignKey({
        columnNames: ["questionId"],
        referencedColumnNames: ["id"],
        referencedTableName: "question",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "question_categories_category",
      new TableForeignKey({
        columnNames: ["categoryId"],
        referencedColumnNames: ["id"],
        referencedTableName: "category",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("question_categories_category");
  }
}
