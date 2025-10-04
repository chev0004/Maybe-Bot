CREATE TABLE "active_vc_sessions" (
	"user_id" text PRIMARY KEY NOT NULL,
	"channel_id" text NOT NULL,
	"join_time" timestamp with time zone NOT NULL,
	"is_streaming" boolean DEFAULT false NOT NULL,
	"stream_start_time" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "active_vc_sessions" ADD CONSTRAINT "active_vc_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "active_vc_sessions" ADD CONSTRAINT "active_vc_sessions_channel_id_channels_id_fk" FOREIGN KEY ("channel_id") REFERENCES "public"."channels"("id") ON DELETE no action ON UPDATE no action;