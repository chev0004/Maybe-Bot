CREATE TYPE "public"."channel_type" AS ENUM('text', 'voice');--> statement-breakpoint
ALTER TABLE "channels" ADD COLUMN "type" "channel_type" NOT NULL;