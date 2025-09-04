-- Seed two test users for QA
INSERT INTO "User" ("id","email","name","tokenBalance","currency")
VALUES ('seed_user_with_tokens','user-with-tokens@mail.com','Test User (tokens)',1000,'GBP'::"Currency")
ON CONFLICT ("email") DO UPDATE SET "tokenBalance" = EXCLUDED."tokenBalance";

INSERT INTO "User" ("id","email","name","tokenBalance","currency")
VALUES ('seed_user_without_tokens','user-without-tokens@mail.com','Test User (no tokens)',0,'GBP'::"Currency")
ON CONFLICT ("email") DO UPDATE SET "tokenBalance" = EXCLUDED."tokenBalance";

