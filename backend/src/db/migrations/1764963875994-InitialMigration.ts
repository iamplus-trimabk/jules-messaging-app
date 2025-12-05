import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1764963875994 implements MigrationInterface {
    name = 'InitialMigration1764963875994'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "mobileNumber" varchar NOT NULL, "otp" varchar, "otpExpiresAt" datetime, "firstName" varchar, "lastName" varchar, "avatarUrl" varchar, "profileData" text, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "socketId" varchar, CONSTRAINT "UQ_61dc14c8c49c187f5d08047c985" UNIQUE ("mobileNumber"))`);
        await queryRunner.query(`CREATE TABLE "conversation_participants" ("id" varchar PRIMARY KEY NOT NULL, "userId" varchar NOT NULL, "conversationId" varchar NOT NULL, "role" varchar CHECK( "role" IN ('ADMIN','MEMBER','SUBSCRIBER','NOTIFIER') ) NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "conversations" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "type" varchar CHECK( "type" IN ('DIRECT_MESSAGE','GROUP_CHAT') ) NOT NULL, "tags" text, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" varchar PRIMARY KEY NOT NULL, "senderId" varchar NOT NULL, "conversationId" varchar NOT NULL, "content" text NOT NULL, "app_type" varchar, "message_type" varchar, "parentMessageId" varchar, "status" varchar CHECK( "status" IN ('SENT','DELIVERED','READ') ) NOT NULL DEFAULT ('SENT'), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "deliveredAt" datetime, "readAt" datetime)`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" varchar PRIMARY KEY NOT NULL, "messageId" varchar NOT NULL, "createdById" varchar NOT NULL, "assigneeId" varchar, "status" varchar CHECK( "status" IN ('TODO','IN_PROGRESS','DONE') ) NOT NULL DEFAULT ('TODO'), "dueDate" datetime, CONSTRAINT "REL_3ce1cc34c5c3b584d6f20c8180" UNIQUE ("messageId"))`);
        await queryRunner.query(`CREATE TABLE "temporary_conversation_participants" ("id" varchar PRIMARY KEY NOT NULL, "userId" varchar NOT NULL, "conversationId" varchar NOT NULL, "role" varchar CHECK( "role" IN ('ADMIN','MEMBER','SUBSCRIBER','NOTIFIER') ) NOT NULL, CONSTRAINT "FK_18c4ba3b127461649e5f5039dbf" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_4453e20858b14ab765a09ad728c" FOREIGN KEY ("conversationId") REFERENCES "conversations" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_conversation_participants"("id", "userId", "conversationId", "role") SELECT "id", "userId", "conversationId", "role" FROM "conversation_participants"`);
        await queryRunner.query(`DROP TABLE "conversation_participants"`);
        await queryRunner.query(`ALTER TABLE "temporary_conversation_participants" RENAME TO "conversation_participants"`);
        await queryRunner.query(`CREATE TABLE "temporary_messages" ("id" varchar PRIMARY KEY NOT NULL, "senderId" varchar NOT NULL, "conversationId" varchar NOT NULL, "content" text NOT NULL, "app_type" varchar, "message_type" varchar, "parentMessageId" varchar, "status" varchar CHECK( "status" IN ('SENT','DELIVERED','READ') ) NOT NULL DEFAULT ('SENT'), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "deliveredAt" datetime, "readAt" datetime, CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce" FOREIGN KEY ("senderId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_e5663ce0c730b2de83445e2fd19" FOREIGN KEY ("conversationId") REFERENCES "conversations" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_379d3b2679ddf515e5a90de0153" FOREIGN KEY ("parentMessageId") REFERENCES "messages" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_messages"("id", "senderId", "conversationId", "content", "app_type", "message_type", "parentMessageId", "status", "createdAt", "deliveredAt", "readAt") SELECT "id", "senderId", "conversationId", "content", "app_type", "message_type", "parentMessageId", "status", "createdAt", "deliveredAt", "readAt" FROM "messages"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`ALTER TABLE "temporary_messages" RENAME TO "messages"`);
        await queryRunner.query(`CREATE TABLE "temporary_tasks" ("id" varchar PRIMARY KEY NOT NULL, "messageId" varchar NOT NULL, "createdById" varchar NOT NULL, "assigneeId" varchar, "status" varchar CHECK( "status" IN ('TODO','IN_PROGRESS','DONE') ) NOT NULL DEFAULT ('TODO'), "dueDate" datetime, CONSTRAINT "REL_3ce1cc34c5c3b584d6f20c8180" UNIQUE ("messageId"), CONSTRAINT "FK_3ce1cc34c5c3b584d6f20c8180d" FOREIGN KEY ("messageId") REFERENCES "messages" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_660898d912c6e71107e9ef8f38d" FOREIGN KEY ("createdById") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_9a16d2c86252529f622fa53f1e3" FOREIGN KEY ("assigneeId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_tasks"("id", "messageId", "createdById", "assigneeId", "status", "dueDate") SELECT "id", "messageId", "createdById", "assigneeId", "status", "dueDate" FROM "tasks"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`ALTER TABLE "temporary_tasks" RENAME TO "tasks"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" RENAME TO "temporary_tasks"`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" varchar PRIMARY KEY NOT NULL, "messageId" varchar NOT NULL, "createdById" varchar NOT NULL, "assigneeId" varchar, "status" varchar CHECK( "status" IN ('TODO','IN_PROGRESS','DONE') ) NOT NULL DEFAULT ('TODO'), "dueDate" datetime, CONSTRAINT "REL_3ce1cc34c5c3b584d6f20c8180" UNIQUE ("messageId"))`);
        await queryRunner.query(`INSERT INTO "tasks"("id", "messageId", "createdById", "assigneeId", "status", "dueDate") SELECT "id", "messageId", "createdById", "assigneeId", "status", "dueDate" FROM "temporary_tasks"`);
        await queryRunner.query(`DROP TABLE "temporary_tasks"`);
        await queryRunner.query(`ALTER TABLE "messages" RENAME TO "temporary_messages"`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" varchar PRIMARY KEY NOT NULL, "senderId" varchar NOT NULL, "conversationId" varchar NOT NULL, "content" text NOT NULL, "app_type" varchar, "message_type" varchar, "parentMessageId" varchar, "status" varchar CHECK( "status" IN ('SENT','DELIVERED','READ') ) NOT NULL DEFAULT ('SENT'), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "deliveredAt" datetime, "readAt" datetime)`);
        await queryRunner.query(`INSERT INTO "messages"("id", "senderId", "conversationId", "content", "app_type", "message_type", "parentMessageId", "status", "createdAt", "deliveredAt", "readAt") SELECT "id", "senderId", "conversationId", "content", "app_type", "message_type", "parentMessageId", "status", "createdAt", "deliveredAt", "readAt" FROM "temporary_messages"`);
        await queryRunner.query(`DROP TABLE "temporary_messages"`);
        await queryRunner.query(`ALTER TABLE "conversation_participants" RENAME TO "temporary_conversation_participants"`);
        await queryRunner.query(`CREATE TABLE "conversation_participants" ("id" varchar PRIMARY KEY NOT NULL, "userId" varchar NOT NULL, "conversationId" varchar NOT NULL, "role" varchar CHECK( "role" IN ('ADMIN','MEMBER','SUBSCRIBER','NOTIFIER') ) NOT NULL)`);
        await queryRunner.query(`INSERT INTO "conversation_participants"("id", "userId", "conversationId", "role") SELECT "id", "userId", "conversationId", "role" FROM "temporary_conversation_participants"`);
        await queryRunner.query(`DROP TABLE "temporary_conversation_participants"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "conversations"`);
        await queryRunner.query(`DROP TABLE "conversation_participants"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
