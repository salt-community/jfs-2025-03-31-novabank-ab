-- Full H2 SQL dump: schema + data

-- DROP existing tables
DROP TABLE IF EXISTS scheduled_transactions;
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS currencies;

-- 1) currencies
CREATE TABLE currencies (
                            id           VARCHAR(36)   PRIMARY KEY,
                            name         VARCHAR(255),
                            abbrevation  VARCHAR(255)  CHECK (abbrevation IN ('EUR','SEK'))
);

-- 2) users
CREATE TABLE users (
                       id           VARCHAR(36)   PRIMARY KEY,
                       first_name   VARCHAR(255)  NOT NULL,
                       last_name    VARCHAR(255)  NOT NULL,
                       email        VARCHAR(255)  NOT NULL,
                       phone_number VARCHAR(255)  NOT NULL,
                       role         VARCHAR(255)  NOT NULL CHECK (role IN ('ADMIN','USER')),
                       status       VARCHAR(255)  NOT NULL CHECK (status IN ('ACTIVE','SUSPENDED','CLOSED')),
                       created_at   TIMESTAMP,
                       last_login   TIMESTAMP
);

-- 3) accounts
CREATE TABLE accounts (
                          id             VARCHAR(36)   PRIMARY KEY,
                          user_id        VARCHAR(36),
                          currency_id    VARCHAR(36),
                          created_at     DATE,
                          balance        DOUBLE,
                          type           VARCHAR(255)  NOT NULL CHECK (type   IN ('PERSONAL','SAVINGS')),
                          status         VARCHAR(255)  NOT NULL CHECK (status IN ('ACTIVE','SUSPENDED','INACTIVE','CLOSED')),
                          account_number VARCHAR(255),
                          FOREIGN KEY(user_id)     REFERENCES users(id),
                          FOREIGN KEY(currency_id) REFERENCES currencies(id)
);

-- 4) transactions
CREATE TABLE transactions (
                              id               VARCHAR(36)   PRIMARY KEY,
                              from_account_id  VARCHAR(36),
                              to_account_id    VARCHAR(36),
                              created_at       TIMESTAMP     NOT NULL,
                              amount           DOUBLE        NOT NULL,
                              description      VARCHAR(255)  NOT NULL,
                              user_note        VARCHAR(255)  NOT NULL,
                              ocr_number       VARCHAR(255)  NOT NULL,
                              FOREIGN KEY(from_account_id) REFERENCES accounts(id),
                              FOREIGN KEY(to_account_id)   REFERENCES accounts(id)
);

-- 5) scheduled_transactions
CREATE TABLE scheduled_transactions (
                                        id               VARCHAR(36)   PRIMARY KEY,
                                        from_account_id  VARCHAR(36)   NOT NULL,
                                        to_account_id    VARCHAR(36)   NOT NULL,
                                        amount           DOUBLE        NOT NULL,
                                        scheduled_date   TIMESTAMP     NOT NULL,
                                        status           VARCHAR(255)  NOT NULL CHECK (status IN ('PENDING','COMPLETED')),
                                        created_at       TIMESTAMP     NOT NULL,
                                        ocr_number       VARCHAR(255)  NOT NULL,
                                        user_note        VARCHAR(255)  NOT NULL,
                                        description      VARCHAR(255)  NOT NULL,
                                        FOREIGN KEY(from_account_id) REFERENCES accounts(id),
                                        FOREIGN KEY(to_account_id)   REFERENCES accounts(id)
);

-- DATA INSERTS

INSERT INTO currencies (id, name, abbrevation) VALUES
                                                   ('a1b2c3d4-e5f6-7a8b-9c0d-e1f2a3b4c5d6','US Dollar','SEK'),
                                                   ('b2c3d4e5-f6a7-8b9c-0d1e-f2a3b4c5d6e7','Euro','EUR'),
                                                   ('c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f','Swedish Krona','SEK');

INSERT INTO users (
    id, first_name, last_name, email, phone_number,
    role, status, created_at, last_login
) VALUES
      ('3fa85f64-5717-4562-b3fc-2c963f66afa6','Alice','Andersson','alice.andersson@example.com','0701234567','USER','ACTIVE','2025-05-10 08:15:00','2025-06-14 17:45:00'),
      ('7b9e1c2d-9f4a-4f3e-a2bd-5c8f9d1e2345','Björn','Bergström','bjorn.bergstrom@example.com','0702345678','ADMIN','ACTIVE','2025-04-01 09:00:00','2025-06-15 12:00:00'),
      ('1e2d3c4b-5a6f-7e8d-9c0b-1a2f3e4d5c6b','Carla','Carlsson','carla.carlsson@example.com','0703456789','USER','SUSPENDED','2025-03-20 14:30:00','2025-05-30 08:00:00'),
      ('9f8e7d6c-5b4a-3c2d-1e0f-9a8b7c6d5e4f','David','Dahl','david.dahl@example.com','0704567890','USER','CLOSED','2025-01-15 11:45:00','2025-02-01 10:15:00'),
      ('0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d','Elin','Ekström','elin.ekstrom@example.com','0705678901','USER','SUSPENDED','2025-06-16 09:00:00',NULL);

INSERT INTO accounts (
    id, user_id, currency_id, created_at, balance,
    type, status, account_number
) VALUES
      ('11111111-1111-1111-1111-111111111111','3fa85f64-5717-4562-b3fc-2c963f66afa6','a1b2c3d4-e5f6-7a8b-9c0d-e1f2a3b4c5d6','2025-05-10',1250.00,'PERSONAL','ACTIVE','SE4550000000055555555551'),
      ('22222222-2222-2222-2222-222222222222','7b9e1c2d-9f4a-4f3e-a2bd-5c8f9d1e2345','b2c3d4e5-f6a7-8b9c-0d1e-f2a3b4c5d6e7','2025-04-01', 800.50,'SAVINGS','ACTIVE','DE89370400440532013000'),
      ('33333333-3333-3333-3333-333333333333','1e2d3c4b-5a6f-7e8d-9c0b-1a2f3e4d5c6b','c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f','2025-03-20',  50.75,'PERSONAL','SUSPENDED','SE4550000000055555555552'),
      ('44444444-4444-4444-4444-444444444444','9f8e7d6c-5b4a-3c2d-1e0f-9a8b7c6d5e4f','a1b2c3d4-e5f6-7a8b-9c0d-e1f2a3b4c5d6','2025-01-15',   0.00,'PERSONAL','INACTIVE','SE4550000000055555555553'),
      ('55555555-5555-5555-5555-555555555555','0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d','c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f','2025-06-16', 300.00,'SAVINGS','ACTIVE','SE4550000000055555555554');

INSERT INTO transactions (
    id, from_account_id, to_account_id, created_at,
    amount, description, user_note, ocr_number
) VALUES
      ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222','2025-06-10 14:20:00',200.00,'Rent payment','June rent','OCR20250610A'),
      ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb','33333333-3333-3333-3333-333333333333','11111111-1111-1111-1111-111111111111','2025-06-12 09:05:00', 50.00,'Refund from Carla','Refund','OCR20250612B'),
      ('cccccccc-cccc-cccc-cccc-cccccccccccc','22222222-2222-2222-2222-222222222222','55555555-5555-5555-5555-555555555555','2025-06-14 16:45:00',100.50,'Gift to Elin','Happy birthday','OCR20250614C'),
      ('dddddddd-dddd-dddd-dddd-dddddddddddd','55555555-5555-5555-5555-555555555555','44444444-4444-4444-4444-444444444444','2025-06-15 11:30:00', 75.25,'Transfer to savings','Monthly save','OCR20250615D');

INSERT INTO scheduled_transactions (
    id, from_account_id, to_account_id, amount, scheduled_date,
    status, created_at, ocr_number, user_note, description
) VALUES
      ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee','11111111-1111-1111-1111-111111111111','33333333-3333-3333-3333-333333333333',250.00,'2025-07-01 09:00:00','PENDING','2025-06-16 10:00:00','OCR20250701E','Monthly invoice','July invoice'),
      ('ffffffff-ffff-ffff-ffff-ffffffffffff','22222222-2222-2222-2222-222222222222','44444444-4444-4444-4444-444444444444',150.00,'2025-07-05 15:30:00','PENDING','2025-06-16 10:05:00','OCR20250705F','Subscription fee','Monthly subscription'),
      ('11111111-aaaa-bbbb-cccc-222222222222','55555555-5555-5555-5555-555555555555','11111111-1111-1111-1111-111111111111', 80.00,'2025-06-20 08:00:00','COMPLETED','2025-06-01 12:00:00','OCR20250620G','Gym membership','June membership');
