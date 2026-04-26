-- This migration intentionally does not mutate the database.
-- The Better Auth schema transition already ran in 0001_better_auth_upgrade.sql,
-- but Drizzle's snapshot history was still on the legacy schema. Keeping 0003 as
-- a no-op lets `drizzle-kit migrate` record the corrected snapshot state without
-- replaying DDL against tables that already exist.
SELECT 1;
