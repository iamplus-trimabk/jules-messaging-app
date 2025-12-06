import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1765011928648 implements MigrationInterface {
    name = 'InitialSchema1765011928648'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create all tables with their final schemas directly
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "mobileNumber" varchar NOT NULL, "otp" varchar, "otpExpiresAt" datetime, "firstName" varchar, "lastName" varchar, "avatarUrl" varchar, "profileData" text, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "socketId" varchar, CONSTRAINT "UQ_61dc14c8c49c187f5d08047c985" UNIQUE ("mobileNumber"))`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "description" text, "status" varchar CHECK( "status" IN ('todo','in-progress','done') ) NOT NULL DEFAULT ('todo'), "dueDate" datetime, "assigneeId" varchar, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_9a16d2c86252529f622fa53f1e3" FOREIGN KEY ("assigneeId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`CREATE TABLE "conversations" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "type" varchar CHECK( "type" IN ('DIRECT_MESSAGE','GROUP_CHAT') ) NOT NULL, "tags" text, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "conversation_participants" ("id" varchar PRIMARY KEY NOT NULL, "userId" varchar NOT NULL, "conversationId" varchar NOT NULL, "role" varchar CHECK( "role" IN ('ADMIN','MEMBER','SUBSCRIBER','NOTIFIER') ) NOT NULL, CONSTRAINT "FK_18c4ba3b127461649e5f5039dbf" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_4453e20858b14ab765a09ad728c" FOREIGN KEY ("conversationId") REFERENCES "conversations" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" varchar PRIMARY KEY NOT NULL, "senderId" varchar NOT NULL, "conversationId" varchar NOT NULL, "content" text NOT NULL, "app_type" varchar, "message_type" varchar, "parentMessageId" varchar, "taskId" varchar, "status" varchar CHECK( "status" IN ('SENT','DELIVERED','READ') ) NOT NULL DEFAULT ('SENT'), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "deliveredAt" datetime, "readAt" datetime, CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce" FOREIGN KEY ("senderId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_e5663ce0c730b2de83445e2fd19" FOREIGN KEY ("conversationId") REFERENCES "conversations" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_379d3b2679ddf515e5a90de0153" FOREIGN KEY ("parentMessageId") REFERENCES "messages" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_fd2c4496fbb610e44408e279537" FOREIGN KEY ("taskId") REFERENCES "tasks" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop tables in the reverse order of creation to respect foreign key constraints
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "conversation_participants"`);
        await queryRunner.query(`DROP TABLE "conversations"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
