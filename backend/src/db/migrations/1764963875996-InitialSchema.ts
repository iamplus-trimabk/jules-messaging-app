import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1764963875996 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create users table
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" varchar PRIMARY KEY NOT NULL,
        "mobileNumber" varchar NOT NULL,
        "otp" varchar,
        "otpExpiresAt" datetime,
        "firstName" varchar,
        "lastName" varchar,
        "avatarUrl" varchar,
        "profileData" text,
        "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
        "updatedAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
        "socketId" varchar,
        CONSTRAINT "UQ_f09702b78174895781d636402aa" UNIQUE ("mobileNumber")
      )
    `);

    // Create conversations table
    await queryRunner.query(`
      CREATE TABLE "conversations" (
        "id" varchar PRIMARY KEY NOT NULL,
        "title" varchar NOT NULL,
        "type" text NOT NULL,
        "tags" text,
        "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
        "updatedAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP)
      )
    `);

    // Create conversation_participants table
    await queryRunner.query(`
      CREATE TABLE "conversation_participants" (
        "id" varchar PRIMARY KEY NOT NULL,
        "userId" varchar NOT NULL,
        "conversationId" varchar NOT NULL,
        "role" text NOT NULL,
        CONSTRAINT "FK_98950ca8cce215b74737a2882e0" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT "FK_e823f1e1bbeb33cf23797c271e8" FOREIGN KEY ("conversationId") REFERENCES "conversations" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
      )
    `);

    // Create messages table
    await queryRunner.query(`
      CREATE TABLE "messages" (
        "id" varchar PRIMARY KEY NOT NULL,
        "senderId" varchar NOT NULL,
        "conversationId" varchar NOT NULL,
        "content" text NOT NULL,
        "files" text,
        "app_type" varchar,
        "message_type" varchar,
        "parentMessageId" varchar,
        "status" text NOT NULL DEFAULT ('sent'),
        "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
        "deliveredAt" datetime,
        "readAt" datetime,
        CONSTRAINT "FK_b94f775d710c6ba1b7e19335f99" FOREIGN KEY ("senderId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT "FK_718f0f0d23f33c82e68403d15a7" FOREIGN KEY ("conversationId") REFERENCES "conversations" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT "FK_1c8e310ab4b998a444a796e6a10" FOREIGN KEY ("parentMessageId") REFERENCES "messages" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
      )
    `);

    // Create tasks table
    await queryRunner.query(`
      CREATE TABLE "tasks" (
        "id" varchar PRIMARY KEY NOT NULL,
        "messageId" varchar NOT NULL,
        "createdById" varchar NOT NULL,
        "assigneeId" varchar,
        "status" text NOT NULL DEFAULT ('todo'),
        "dueDate" datetime,
        CONSTRAINT "REL_a2d6d06095982f1b7ba9a40871" UNIQUE ("messageId"),
        CONSTRAINT "FK_c505b3c3c788225e5927515b6a7" FOREIGN KEY ("messageId") REFERENCES "messages" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,
        CONSTRAINT "FK_971b5695393f6050b1e35a1a1a5" FOREIGN KEY ("createdById") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT "FK_309a1a1e0b5220c324e93c1266e" FOREIGN KEY ("assigneeId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tasks"`);
    await queryRunner.query(`DROP TABLE "messages"`);
    await queryRunner.query(`DROP TABLE "conversation_participants"`);
    await queryRunner.query(`DROP TABLE "conversations"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
