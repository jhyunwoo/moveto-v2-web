ALTER TABLE "user" RENAME COLUMN "emailVerified" TO "legacyEmailVerifiedAt";
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "emailVerified" boolean DEFAULT false NOT NULL;
--> statement-breakpoint
UPDATE "user"
SET
  "name" = COALESCE(NULLIF(trim("name"), ''), split_part(COALESCE(NULLIF(trim("email"), ''), 'legacy-' || "id" || '@users.invalid'), '@', 1), 'Legacy User'),
  "email" = COALESCE(NULLIF(trim("email"), ''), 'legacy-' || "id" || '@users.invalid'),
  "emailVerified" = CASE WHEN "legacyEmailVerifiedAt" IS NULL THEN false ELSE true END;
--> statement-breakpoint
WITH duplicate_emails AS (
  SELECT
    "id",
    "email",
    row_number() OVER (PARTITION BY lower("email") ORDER BY "id") AS duplicate_number
  FROM "user"
)
UPDATE "user" AS u
SET "email" = split_part(u."email", '@', 1) || '+' || substring(u."id", 1, 8) || '@' || COALESCE(NULLIF(split_part(u."email", '@', 2), ''), 'users.invalid')
FROM duplicate_emails AS d
WHERE u."id" = d."id" AND d.duplicate_number > 1;
--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "name" SET NOT NULL;
--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "email" SET NOT NULL;
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "updatedAt" timestamp DEFAULT now() NOT NULL;
--> statement-breakpoint
CREATE UNIQUE INDEX "user_email_unique" ON "user" ("email");
--> statement-breakpoint
ALTER TABLE "session" ADD COLUMN "id" text;
--> statement-breakpoint
UPDATE "session"
SET "id" = 'legacy-session-' || md5("sessionToken" || ':' || "userId");
--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "id" SET NOT NULL;
--> statement-breakpoint
ALTER TABLE "session" DROP CONSTRAINT "session_pkey";
--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("id");
--> statement-breakpoint
ALTER TABLE "session" RENAME COLUMN "sessionToken" TO "token";
--> statement-breakpoint
ALTER TABLE "session" RENAME COLUMN "expires" TO "expiresAt";
--> statement-breakpoint
ALTER TABLE "session" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;
--> statement-breakpoint
ALTER TABLE "session" ADD COLUMN "updatedAt" timestamp DEFAULT now() NOT NULL;
--> statement-breakpoint
ALTER TABLE "session" ADD COLUMN "ipAddress" text;
--> statement-breakpoint
ALTER TABLE "session" ADD COLUMN "userAgent" text;
--> statement-breakpoint
CREATE UNIQUE INDEX "session_token_unique" ON "session" ("token");
--> statement-breakpoint
CREATE INDEX "session_user_id_idx" ON "session" ("userId");
--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "id" text;
--> statement-breakpoint
UPDATE "account"
SET "id" = 'legacy-account-' || md5("userId" || ':' || "provider" || ':' || "providerAccountId");
--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "id" SET NOT NULL;
--> statement-breakpoint
ALTER TABLE "account" DROP CONSTRAINT "account_provider_providerAccountId_pk";
--> statement-breakpoint
ALTER TABLE "account" RENAME COLUMN "providerAccountId" TO "accountId";
--> statement-breakpoint
ALTER TABLE "account" RENAME COLUMN "provider" TO "providerId";
--> statement-breakpoint
ALTER TABLE "account" RENAME COLUMN "access_token" TO "accessToken";
--> statement-breakpoint
ALTER TABLE "account" RENAME COLUMN "refresh_token" TO "refreshToken";
--> statement-breakpoint
ALTER TABLE "account" RENAME COLUMN "id_token" TO "idToken";
--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "accessTokenExpiresAt" timestamp;
--> statement-breakpoint
UPDATE "account"
SET "accessTokenExpiresAt" = to_timestamp("expires_at")::timestamp
WHERE "expires_at" IS NOT NULL;
--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "refreshTokenExpiresAt" timestamp;
--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "password" text;
--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;
--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "updatedAt" timestamp DEFAULT now() NOT NULL;
--> statement-breakpoint
ALTER TABLE "account" DROP COLUMN "type";
--> statement-breakpoint
ALTER TABLE "account" DROP COLUMN "expires_at";
--> statement-breakpoint
ALTER TABLE "account" DROP COLUMN "token_type";
--> statement-breakpoint
ALTER TABLE "account" DROP COLUMN "session_state";
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_pkey" PRIMARY KEY ("id");
--> statement-breakpoint
CREATE UNIQUE INDEX "account_provider_account_unique" ON "account" ("providerId", "accountId");
--> statement-breakpoint
CREATE INDEX "account_user_id_idx" ON "account" ("userId");
--> statement-breakpoint
CREATE TABLE "verification" (
  "id" text PRIMARY KEY NOT NULL,
  "identifier" text NOT NULL,
  "value" text NOT NULL,
  "expiresAt" timestamp NOT NULL,
  "createdAt" timestamp DEFAULT now() NOT NULL,
  "updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
INSERT INTO "verification" ("id", "identifier", "value", "expiresAt", "createdAt", "updatedAt")
SELECT
  'legacy-verification-' || md5("identifier" || ':' || "token"),
  "identifier",
  "token",
  "expires",
  now(),
  now()
FROM "verificationToken";
--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verification" ("identifier");
--> statement-breakpoint
DROP TABLE "verificationToken";
--> statement-breakpoint
CREATE TABLE "passkey" (
  "id" text PRIMARY KEY NOT NULL,
  "name" text,
  "publicKey" text NOT NULL,
  "userId" text NOT NULL,
  "credentialID" text NOT NULL,
  "counter" integer NOT NULL,
  "deviceType" text NOT NULL,
  "backedUp" boolean NOT NULL,
  "transports" text,
  "createdAt" timestamp,
  "aaguid" text,
  CONSTRAINT "passkey_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action
);
--> statement-breakpoint
INSERT INTO "passkey" (
  "id",
  "name",
  "publicKey",
  "userId",
  "credentialID",
  "counter",
  "deviceType",
  "backedUp",
  "transports",
  "createdAt",
  "aaguid"
)
SELECT
  'legacy-passkey-' || md5("userId" || ':' || "credentialID"),
  'Migrated Passkey',
  "credentialPublicKey",
  "userId",
  "credentialID",
  "counter",
  "credentialDeviceType",
  "credentialBackedUp",
  "transports",
  now(),
  NULL
FROM "authenticator";
--> statement-breakpoint
CREATE UNIQUE INDEX "passkey_credential_id_unique" ON "passkey" ("credentialID");
--> statement-breakpoint
CREATE INDEX "passkey_user_id_idx" ON "passkey" ("userId");
--> statement-breakpoint
DROP TABLE "authenticator";
