-- Convert credentialID from standard base64 to base64url format
-- standard base64 uses +, /, = padding
-- base64url uses -, _, no padding
UPDATE "passkey"
SET "credentialID" = rtrim(replace(replace("credentialID", '+', '-'), '/', '_'), '=')
WHERE "credentialID" ~ '[+/=]';
