-- Currencies
INSERT INTO currencies (id, name, abbrevation) VALUES
                                                   ('9bdc18e7-8173-4191-8f61-f3451c5e6759', 'Swedish Krona', 'SEK'),
                                                   ('9fa9391c-b25a-4933-8c58-e9c7c77f3620', 'Euro', 'EUR');

-- Users
INSERT INTO users (id, password, first_name, last_name, email, phone_number, role, status, created_at, last_login) VALUES
                                                                                                                       ('user_2yMZ4k4VMcQ4C3Yowv3JfXg0mOd', '123', 'Aki', 'Ström', 'aki.strom@appliedtechnology.se', '0700000000', 'USER', 'ACTIVE', '2025-06-12 08:42:57', '2025-06-12 08:42:57'),
                                                                                                                       ('user_2yJpkDpb1EaHO7sAK8GVzXoQ3Hf', '123', 'Nikita', 'Biden', 'nikita.egelrud@appliedtechnology.se', '0700000001', 'USER', 'ACTIVE', '2025-06-12 08:42:57', '2025-06-12 08:42:57'),
                                                                                                                       ('user_2ya9D2bPCC3XYyGsklZRQPPBeb9', '123', 'Elias', 'User', 'elias@novabank.se', '0700000002', 'USER', 'ACTIVE', '2025-06-12 08:42:57', '2025-06-12 08:42:57'),
                                                                                                                       ('user_2yMYqxXhoEDq64tfBlelGADfdlp', '123', 'Amanda', 'User', 'amanda@novabank.se', '0700000002', 'USER', 'ACTIVE', '2025-06-12 08:42:57', '2025-06-12 08:42:57'),
                                                                                                                       ('user_2fMYqxXhoEDq64tfBlelGADfdlp', '123', 'Admin', 'Adminson', 'admin@novabank.se', '0700000002', 'USER', 'ACTIVE', '2025-06-12 08:42:57', '2025-06-12 08:42:57');

-- Accounts
INSERT INTO accounts (id, user_id, currency_id, created_at, balance, type, status, account_number) VALUES
                                                                                                       ('c1b35a93-9671-43c1-a0fe-aa4c2e9d2aec', 'user_2yMZ4k4VMcQ4C3Yowv3JfXg0mOd', '9bdc18e7-8173-4191-8f61-f3451c5e6759', '2025-06-12', 9370.00, 'PERSONAL', 'ACTIVE', 'SE1234567890'),
                                                                                                       ('3587b71d-5845-4ba3-b667-e556bdf845be', 'user_2yJpkDpb1EaHO7sAK8GVzXoQ3Hf', '9fa9391c-b25a-4933-8c58-e9c7c77f3620', '2025-06-12', 1763.50, 'SAVINGS', 'ACTIVE', 'SE2345678901'),
                                                                                                       ('7915a5bd-ddcc-4a40-8343-dee3a2188cf0', 'user_2ya9D2bPCC3XYyGsklZRQPPBeb9', '9bdc18e7-8173-4191-8f61-f3451c5e6759', '2025-06-12', 7459.75, 'PERSONAL', 'ACTIVE', 'SE3456789012'),
                                                                                                       ('67d254c1-1532-4cf4-8d4f-55ef8fe12717', 'user_2yMYqxXhoEDq64tfBlelGADfdlp', '9fa9391c-b25a-4933-8c58-e9c7c77f3620', '2025-06-12', 25000.00, 'PERSONAL', 'ACTIVE', 'SE4567890123');

-- Transactions
INSERT INTO transactions (id, from_account_id, to_account_id, recipient_number, type, created_at, amount, description, user_note, ocr_number) VALUES
                                                                                                                                                  ('2fcbbb39-06f2-4d67-a054-2da86129ee28', 'c1b35a93-9671-43c1-a0fe-aa4c2e9d2aec', '3587b71d-5845-4ba3-b667-e556bdf845be', 'SE2345678901', 'INTERNAL_TRANSFER', '2025-06-12 08:42:57', 188.00, 'Monthly rent', 'Rent June 2025', 'OCR00001'),
                                                                                                                                                  ('fa70865e-e018-410a-99a1-018ea90a3ce6', '3587b71d-5845-4ba3-b667-e556bdf845be', '7915a5bd-ddcc-4a40-8343-dee3a2188cf0', 'SE3456789012', 'BANKGIRO', '2025-06-12 09:15:00', 632.50, 'Utilities payment', 'Electricity bill', 'OCR00002'),
                                                                                                                                                  ('62e1632f-e075-4add-984f-a3a7787efb83', '7915a5bd-ddcc-4a40-8343-dee3a2188cf0', '67d254c1-1532-4cf4-8d4f-55ef8fe12717', 'SE4567890123', 'PLUSGIRO', '2025-06-12 10:30:00', 670.25, 'Invoice payment', 'Invoice #12345', 'OCR00003');

-- Scheduled Transactions
INSERT INTO scheduled_transactions (id, from_account_id, to_account_id, recipient_number, type, amount, scheduled_date, status, created_at, ocr_number, user_note, description) VALUES
                                                                                                                                                                                    ('69ca9a09-804d-4c67-9227-ea23569d4a31', 'c1b35a93-9671-43c1-a0fe-aa4c2e9d2aec', '3587b71d-5845-4ba3-b667-e556bdf845be', 'SE2345678901', 'INTERNAL_TRANSFER', 1000.00, '2025-06-19 08:00:00', 'PENDING', '2025-06-12 08:42:57', 'OCRS00001', 'Monthly transfer', 'Scheduled transfer'),
                                                                                                                                                                                    ('0e683c21-5ed5-4498-b7d4-a9d4e432be02', '3587b71d-5845-4ba3-b667-e556bdf845be', '7915a5bd-ddcc-4a40-8343-dee3a2188cf0', 'SE3456789012', 'BANKGIRO', 500.00, '2025-06-20 15:00:00', 'PENDING', '2025-06-12 09:00:00', 'OCRS00002', 'Rent payment', 'Monthly rent'),
                                                                                                                                                                                    ('4df15be9-12a2-4ee3-8f5c-c11dee6bae57', '7915a5bd-ddcc-4a40-8343-dee3a2188cf0', '67d254c1-1532-4cf4-8d4f-55ef8fe12717', 'SE4567890123', 'PLUSGIRO', 750.00, '2025-06-21 12:00:00', 'PENDING', '2025-06-12 10:00:00', 'OCRS00003', 'Utility bill', 'Monthly utilities');
-- User Settings
INSERT INTO user_settings_configs (
    id,
    user_id,
    sms_notifications,
    email_notifications,
    card_transaction_notifications,
    atm_withdrawal_notifications,
    deposit_notifications,
    language
) VALUES (
             'a97d9d4e-3f25-4bb9-9b3b-2e6f9b61fd3f', -- UUID for the settings row
             'user_2yMZ4k4VMcQ4C3Yowv3JfXg0mOd',     -- Must match a real user in `users` table
             true,   -- sms_notifications
             true,   -- email_notifications
             true,   -- card_transaction_notifications
             false,  -- atm_withdrawal_notifications
             true,   -- deposit_notifications
             'en'    -- language
         );