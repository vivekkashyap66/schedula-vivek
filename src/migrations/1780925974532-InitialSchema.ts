import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1780925974532 implements MigrationInterface {
    name = 'InitialSchema1780925974532'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`doctors\` (\`id\` varchar(36) NOT NULL, \`userId\` varchar(255) NOT NULL, \`fullName\` varchar(255) NOT NULL, \`specialization\` varchar(255) NOT NULL, \`experience\` int NOT NULL, \`qualification\` varchar(255) NOT NULL, \`consultationFee\` decimal NOT NULL, \`availability\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_55651e05e46413d510215535ed\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`patients\` (\`id\` varchar(36) NOT NULL, \`userId\` varchar(255) NOT NULL, \`fullName\` varchar(255) NOT NULL, \`age\` int NOT NULL, \`gender\` varchar(255) NOT NULL, \`contactDetails\` varchar(255) NOT NULL, \`basicHealthInfo\` varchar(255) NULL, UNIQUE INDEX \`IDX_2c24c3490a26d04b0d70f92057\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_2c24c3490a26d04b0d70f92057\` ON \`patients\``);
        await queryRunner.query(`DROP TABLE \`patients\``);
        await queryRunner.query(`DROP INDEX \`IDX_55651e05e46413d510215535ed\` ON \`doctors\``);
        await queryRunner.query(`DROP TABLE \`doctors\``);
    }

}
