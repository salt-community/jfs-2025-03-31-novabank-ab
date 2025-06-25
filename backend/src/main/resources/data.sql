------------------------------------------------------------------
-- 1. CURRENCIES
------------------------------------------------------------------
INSERT INTO currencies (id, name, abbrevation) VALUES
                                                   ('9bdc18e7-8173-4191-8f61-f3451c5e6759', 'Swedish Krona', 'SEK'),
                                                   ('9fa9391c-b25a-4933-8c58-e9c7c77f3620', 'Euro',           'EUR');

------------------------------------------------------------------
-- 2. USERS  (samma inloggnings­uppgifter som tidigare)
------------------------------------------------------------------
INSERT INTO users (id, password, first_name, last_name, email, phone_number, role, status, created_at, last_login) VALUES
                                                                                                                       ('user_2yMZ4k4VMcQ4C3Yowv3JfXg0mOd', '123', 'Aki',            'Ström',  'aki.strom@appliedtechnology.se',  '0700000000', 'USER',  'ACTIVE', '2025-06-12 08:42:57', '2025-06-12 08:42:57'),
                                                                                                                       ('user_2yJpkDpb1EaHO7sAK8GVzXoQ3Hf', '123', 'Nikita',         'Biden',  'nikita.egelrud@appliedtechnology.se','0700000001','USER', 'ACTIVE', '2025-06-12 08:42:57', '2025-06-12 08:42:57'),
                                                                                                                       ('user_2ya9D2bPCC3XYyGsklZRQPPBeb9', '123', 'Elias',          'User',   'elias@novabank.se',               '0700000002', 'USER',  'ACTIVE', '2025-06-12 08:42:57', '2025-06-12 08:42:57'),
                                                                                                                       ('user_2yMYqxXhoEDq64tfBlelGADfdlp', '123', 'Amanda',         'User',   'amanda@novabank.se',              '0700000002', 'USER',  'ACTIVE', '2025-06-12 08:42:57', '2025-06-12 08:42:57'),
                                                                                                                       ('user_2fMYqxXhoEDq64tfBlelGADfdlp', '123', 'Admin',          'Adminson','admin@novabank.se',             '0700000002', 'USER',  'ACTIVE', '2025-06-12 08:42:57', '2025-06-12 08:42:57'),
                                                                                                                       ('user_2yMYqxXhoEDq54tfBlelGADfdlp', '123', 'demo-inactive1', 'User',   'demo@novabank1.se',               '0701000402', 'USER',  'CLOSED', '2025-06-12 08:42:57', '2025-06-12 08:42:57'),
                                                                                                                       ('user_2yMYqxXhyEDq54tfBlelGADfdlp', '123', 'demo-inactive2', 'User',   'demo@novabank2.se',               '0702000402', 'USER',  'CLOSED', '2025-06-12 08:42:57', '2025-06-12 08:42:57'),
                                                                                                                       ('user_2yMYqxXhtEDq54tfBlelGADfdlp', '123', 'demo-inactive3', 'User',   'demo@novabank3.se',               '0703000402', 'USER',  'CLOSED', '2025-06-12 08:42:57', '2025-06-12 08:42:57'),
                                                                                                                       ('user_2ySF29vY9WkpDkENO9IiVgjuECS', '123', 'David',          'Aslan',  'david.aslan@appliedtechnology.se','0700000003', 'ADMIN', 'ACTIVE', '2025-06-12 08:42:57', '2025-06-12 08:42:57'),

-- extra användare
                                                                                                                       ('user_2yijisgr6eNN2b8wUSiEMG5PiXi', '123', 'Ludwig', 'Hahn', 'ludwig.hahn@appliedtechnology.se', '0700000004', 'USER', 'ACTIVE', '2025-06-12 08:42:57', '2025-06-12 08:42:57');

------------------------------------------------------------------
-- 3. ACCOUNTS
------------------------------------------------------------------
INSERT INTO accounts (id, user_id, currency_id, created_at, balance, type, status, account_number) VALUES
                                                                                                       ('c1b35a93-9671-43c1-a0fe-aa4c2e9d2aec', 'user_2yMZ4k4VMcQ4C3Yowv3JfXg0mOd', '9bdc18e7-8173-4191-8f61-f3451c5e6759', '2025-06-12', 9370.00, 'PERSONAL', 'ACTIVE', 'SE1234567890'),
                                                                                                       ('3587b71d-5845-4ba3-b667-e556bdf845be', 'user_2yJpkDpb1EaHO7sAK8GVzXoQ3Hf', '9fa9391c-b25a-4933-8c58-e9c7c77f3620', '2025-06-12', 1763.50, 'SAVINGS',  'ACTIVE', 'SE2345678901'),
                                                                                                       ('7915a5bd-ddcc-4a40-8343-dee3a2188cf0', 'user_2ya9D2bPCC3XYyGsklZRQPPBeb9', '9bdc18e7-8173-4191-8f61-f3451c5e6759', '2025-06-12', 7459.75, 'PERSONAL', 'ACTIVE', 'SE3456789012'),
                                                                                                       ('67d254c1-1532-4cf4-8d4f-55ef8fe12717', 'user_2yMYqxXhoEDq64tfBlelGADfdlp', '9fa9391c-b25a-4933-8c58-e9c7c77f3620', '2025-06-12', 25000.00,'PERSONAL', 'ACTIVE', 'SE4567890123'),
                                                                                                       ('67d654c1-1532-4cf4-8d4f-55ef8fe12717', 'user_2ySF29vY9WkpDkENO9IiVgjuECS', '9fa9391c-b25a-4933-8c58-e9c7c77f3620', '2025-06-12', 25000.00,'PERSONAL', 'ACTIVE', 'SE4567890143'),
                                                                                                       ('d2f9b8f3-1a2e-4c6d-9f7b-8a9b0c1d2e3f', 'user_2yijisgr6eNN2b8wUSiEMG5PiXi', '9bdc18e7-8173-4191-8f61-f3451c5e6759', '2025-06-12',     0.00,'PERSONAL', 'ACTIVE', 'SE5678901234');

------------------------------------------------------------------
-- 4. TRANSACTIONS  (uppdaterad struktur med valutafält)
------------------------------------------------------------------
INSERT INTO transactions (
    id, currency_from_id, currency_to_id, converted_amount, rate_used, rate_date,
    from_account_id, to_account_id, recipient_number, type, created_at,
    amount, description, user_note, ocr_number, category, status
) VALUES
-- 104  SEK ➜ EUR
('00000000-0000-0000-0000-000000000104',
 '9bdc18e7-8173-4191-8f61-f3451c5e6759', '9fa9391c-b25a-4933-8c58-e9c7c77f3620',
 22.55, 0.09, '2025-06-12',
 'c1b35a93-9671-43c1-a0fe-aa4c2e9d2aec', '3587b71d-5845-4ba3-b667-e556bdf845be',
 'SE2345678901', 'INTERNAL_TRANSFER', '2025-06-12 09:00:00',
 250.50, 'Monthly subscription fee', 'Subscribed to service', 'OCR00104', 'subscription', NULL),

-- 105  EUR ➜ SEK
('00000000-0000-0000-0000-000000000105',
 '9fa9391c-b25a-4933-8c58-e9c7c77f3620', '9bdc18e7-8173-4191-8f61-f3451c5e6759',
 14874.00, 11.10, '2025-06-12',
 '3587b71d-5845-4ba3-b667-e556bdf845be', '7915a5bd-ddcc-4a40-8343-dee3a2188cf0',
 'SE3456789012', 'BANKGIRO', '2025-06-12 09:15:00',
 1340.00, 'Invoice payment', 'Paid invoice #1234', 'OCR00105', 'invoice', NULL),

-- 106  SEK ➜ EUR
('00000000-0000-0000-0000-000000000106',
 '9bdc18e7-8173-4191-8f61-f3451c5e6759', '9fa9391c-b25a-4933-8c58-e9c7c77f3620',
 6.82, 0.09, '2025-06-12',
 '7915a5bd-ddcc-4a40-8343-dee3a2188cf0', '67d254c1-1532-4cf4-8d4f-55ef8fe12717',
 'SE4567890123', 'PLUSGIRO', '2025-06-12 09:30:00',
 75.75, 'Gym membership fee', 'Monthly gym fee', 'OCR00106', 'health', NULL),

-- 107  EUR ➜ SEK
('00000000-0000-0000-0000-000000000107',
 '9fa9391c-b25a-4933-8c58-e9c7c77f3620', '9bdc18e7-8173-4191-8f61-f3451c5e6759',
 5550.00, 11.10, '2025-06-12',
 '67d254c1-1532-4cf4-8d4f-55ef8fe12717', 'c1b35a93-9671-43c1-a0fe-aa4c2e9d2aec',
 'SE1234567890', 'INTERNAL_TRANSFER', '2025-06-12 10:00:00',
 500.00, 'Gift from Amanda', 'Thanks for your help', 'OCR00107', 'gift', NULL),

-- 108  SEK ➜ EUR
('00000000-0000-0000-0000-000000000108',
 '9bdc18e7-8173-4191-8f61-f3451c5e6759', '9fa9391c-b25a-4933-8c58-e9c7c77f3620',
 270.00, 0.09, '2025-06-12',
 'c1b35a93-9671-43c1-a0fe-aa4c2e9d2aec', '67d654c1-1532-4cf4-8d4f-55ef8fe12717',
 'SE4567890143', 'BANKGIRO', '2025-06-12 10:30:00',
 3000.00, 'Rent payment', 'June rent', 'OCR00108', 'housing', NULL),

-- 109  EUR ➜ EUR (ingen växling)
('00000000-0000-0000-0000-000000000109',
 '9fa9391c-b25a-4933-8c58-e9c7c77f3620', '9fa9391c-b25a-4933-8c58-e9c7c77f3620',
 220.00, 1.00, '2025-06-12',
 '67d654c1-1532-4cf4-8d4f-55ef8fe12717', '3587b71d-5845-4ba3-b667-e556bdf845be',
 'SE2345678901', 'PLUSGIRO', '2025-06-12 11:00:00',
 220.00, 'Electricity bill', 'May electricity', 'OCR00109', 'utilities', NULL);

------------------------------------------------------------------
-- 5. USER_SETTINGS_CONFIGS  (oförändrat)
------------------------------------------------------------------
INSERT INTO user_settings_configs (id, user_id, sms_notifications, email_notifications, card_transaction_notifications, atm_withdrawal_notifications, deposit_notifications, language) VALUES
                                                                                                                                                                                           ('3f3c6c6d-1f43-4f0c-9d11-aaa111aaa111', 'user_2yMZ4k4VMcQ4C3Yowv3JfXg0mOd', true, true, true, true, true, 'en'),
                                                                                                                                                                                           ('3f3c6c6d-1f43-4f0c-9d11-aaa222aaa222', 'user_2yJpkDpb1EaHO7sAK8GVzXoQ3Hf', true, true, true, true, true, 'en'),
                                                                                                                                                                                           ('3f3c6c6d-1f43-4f0c-9d11-aaa333aaa333', 'user_2ya9D2bPCC3XYyGsklZRQPPBeb9', true, true, true, true, true, 'en'),
                                                                                                                                                                                           ('3f3c6c6d-1f43-4f0c-9d11-aaa444aaa444', 'user_2yMYqxXhoEDq64tfBlelGADfdlp', true, true, true, true, true, 'en'),
                                                                                                                                                                                           ('3f3c6c6d-1f43-4f0c-9d11-aaa555aaa555', 'user_2fMYqxXhoEDq64tfBlelGADfdlp', true, true, true, true, true, 'en'),
                                                                                                                                                                                           ('3f3c6c6d-1f43-4f0c-9d11-aaa666aaa666', 'user_2yijisgr6eNN2b8wUSiEMG5PiXi', true, true, true, true, true, 'en');

------------------------------------------------------------------
-- 6. SCHEDULED_TRANSACTIONS  (uppdaterad struktur med valutafält)
------------------------------------------------------------------
INSERT INTO scheduled_transactions (
    id, currency_from_id, currency_to_id, converted_amount, rate_used, rate_date,
    from_account_id, to_account_id, recipient_number, type,
    amount, scheduled_date, status, created_at, ocr_number, user_note, description
) VALUES
-- SEK ➜ EUR
('69ca9a09-804d-4c67-9227-ea23569d4a31',
 '9bdc18e7-8173-4191-8f61-f3451c5e6759','9fa9391c-b25a-4933-8c58-e9c7c77f3620',
 90.00, 0.09, '2025-06-12',
 'c1b35a93-9671-43c1-a0fe-aa4c2e9d2aec','3587b71d-5845-4ba3-b667-e556bdf845be',
 'SE2345678901','INTERNAL_TRANSFER',
 1000.00,'2025-06-27 14:20:00','PENDING','2025-06-12 08:42:57','OCRS00001','Monthly transfer','Scheduled transfer'),

-- EUR ➜ SEK
('0e683c21-5ed5-4498-b7d4-a9d4e432be02',
 '9fa9391c-b25a-4933-8c58-e9c7c77f3620','9bdc18e7-8173-4191-8f61-f3451c5e6759',
 5550.00, 11.10, '2025-06-12',
 '3587b71d-5845-4ba3-b667-e556bdf845be','7915a5bd-ddcc-4a40-8343-dee3a2188cf0',
 'SE3456789012','BANKGIRO',
 500.00,'2025-06-27 14:20:00','PENDING','2025-06-12 09:00:00','OCRS00002','Rent payment','Monthly rent'),

-- EUR ➜ EUR  (ingen växling)
('4df15be9-12a2-4ee3-8f5c-c11dee6bae57',
 '9fa9391c-b25a-4933-8c58-e9c7c77f3620','9fa9391c-b25a-4933-8c58-e9c7c77f3620',
 750.00, 1.00, '2025-06-12',
 '7915a5bd-ddcc-4a40-8343-dee3a2188cf0','67d254c1-1532-4cf4-8d4f-55ef8fe12717',
 'SE4567890123','PLUSGIRO',
 750.00,'2025-06-27 12:20:00','PENDING','2025-06-12 10:00:00','OCRS00003','Utility bill','Monthly utilities'),

-- SEK ➜ EUR
('a8e1f32b-12b4-4f37-9f7b-879a0d2e5bc9',
 '9bdc18e7-8173-4191-8f61-f3451c5e6759','9fa9391c-b25a-4933-8c58-e9c7c77f3620',
 108.00,0.09,'2025-06-15',
 'c1b35a93-9671-43c1-a0fe-aa4c2e9d2aec','67d654c1-1532-4cf4-8d4f-55ef8fe12717',
 'SE4567890143','INTERNAL_TRANSFER',
 1200.00,'2025-07-01 09:00:00','PENDING','2025-06-15 08:00:00','OCRS00004','Savings deposit','Monthly saving'),

-- övriga fem poster oförändrade valuta-mässigt (EUR ➜ EUR)
('b7d55e22-3a94-43b8-b4c7-3f7f9f56b345',
 '9bdc18e7-8173-4191-8f61-f3451c5e6759','9fa9391c-b25a-4933-8c58-e9c7c77f3620',
 27.00,0.09,'2025-06-16',
 'c1b35a93-9671-43c1-a0fe-aa4c2e9d2aec','3587b71d-5845-4ba3-b667-e556bdf845be',
 'SE2345678901','BANKGIRO',
 300.00,'2025-07-05 14:00:00','PENDING','2025-06-16 09:30:00','OCRS00005','Gym membership','Monthly gym payment'),

('c9f3245b-2321-4232-a53c-fbd7a8a8dfb7',
 '9fa9391c-b25a-4933-8c58-e9c7c77f3620','9fa9391c-b25a-4933-8c58-e9c7c77f3620',
 650.00,1.00,'2025-06-16',
 '3587b71d-5845-4ba3-b667-e556bdf845be','7915a5bd-ddcc-4a40-8343-dee3a2188cf0',
 'SE3456789012','PLUSGIRO',
 650.00,'2025-07-03 16:00:00','PENDING','2025-06-16 12:45:00','OCRS00006','Car insurance','Annual insurance'),

('d0f53a4c-4e55-48e1-9ae3-19f3ae7fbc91',
 '9fa9391c-b25a-4933-8c58-e9c7c77f3620','9fa9391c-b25a-4933-8c58-e9c7c77f3620',
 400.00,1.00,'2025-06-16',
 '7915a5bd-ddcc-4a40-8343-dee3a2188cf0','67d654c1-1532-4cf4-8d4f-55ef8fe12717',
 'SE4567890143','BANKGIRO',
 400.00,'2025-07-02 10:30:00','PENDING','2025-06-16 11:00:00','OCRS00007','Phone bill','Monthly phone bill'),

('e1b76e91-8a9c-4b6e-8ae2-3a1e2c9e91f7',
 '9fa9391c-b25a-4933-8c58-e9c7c77f3620','9bdc18e7-8173-4191-8f61-f3451c5e6759',
 10545.00,11.10,'2025-06-16',
 '67d254c1-1532-4cf4-8d4f-55ef8fe12717','c1b35a93-9671-43c1-a0fe-aa4c2e9d2aec',
 'SE1234567890','INTERNAL_TRANSFER',
 950.00,'2025-07-04 13:00:00','PENDING','2025-06-16 13:20:00','OCRS00008','Loan repayment','Scheduled repayment'),

('f2c78234-1bde-4a75-a86c-7a95a37dba3f',
 '9bdc18e7-8173-4191-8f61-f3451c5e6759','9fa9391c-b25a-4933-8c58-e9c7c77f3620',
 18.00,0.09,'2025-06-16',
 'c1b35a93-9671-43c1-a0fe-aa4c2e9d2aec','7915a5bd-ddcc-4a40-8343-dee3a2188cf0',
 'SE3456789012','BANKGIRO',
 200.00,'2025-07-06 15:45:00','PENDING','2025-06-16 14:00:00','OCRS00009','Book purchase','Monthly book subscription');

------------------------------------------------------------------
-- 7. USER_APPLICATIONS (oförändrat)
------------------------------------------------------------------
-- (alla poster som du listade finns kvar, ej ändrade)
INSERT INTO user_applications (id, created_at, updated_at, status, first_name, last_name, personal_number, email, phone_number) VALUES
                                                                                                                                    ('66ff8721-f639-4d4e-8d8e-61fe405b5299','2025-06-15 03:42:57','2025-06-15 06:42:57','APPROVED','Oscar','Biden','19881021-7985','oscar.biden@novabank.se','0708794628'),
                                                                                                                                    ('81deb525-1c80-4602-9309-aee8ae8984c8','2025-06-13 21:42:57','2025-06-15 01:42:57','APPROVED','Ida','Lind','19810402-8682','ida.lind@novabank.se','0701214330'),
                                                                                                                                    ('c4bf3157-4c07-48f3-b47e-930b60092216','2025-06-12 21:42:57','2025-06-13 07:42:57','DISAPPROVED','Linus','Aslan','19830319-3917','linus.aslan@novabank.se','0709804416'),
                                                                                                                                    ('25e4d898-e4da-4f51-9e34-54939f6036ad','2025-06-16 20:42:57','2025-06-17 21:42:57','DISAPPROVED','Tove','Nilsson','20020908-6750','tove.nilsson@novabank.se','0702955112'),
                                                                                                                                    ('8377d2a6-d358-4f53-99c6-9d0dd72d6533','2025-06-17 09:42:57','2025-06-18 17:42:57','DISAPPROVED','Tove','Andersson','19951208-8563','tove.andersson@novabank.se','0704830021'),
                                                                                                                                    ('bb2b453f-5815-451c-ab0e-d44ea5652c40','2025-06-19 05:42:57','2025-06-20 11:42:57','DISAPPROVED','Linus','Ström','19660927-7855','linus.ström@novabank.se','0708394355'),
                                                                                                                                    ('a1c1a0de-1ea8-4aec-8de7-20e3d20417b8','2025-06-20 07:42:57','2025-06-20 22:42:57','DISAPPROVED','Aki','Aslan','19800224-8309','aki.aslan@novabank.se','0701096241'),
                                                                                                                                    ('21bc515d-eddf-4f1f-9c23-0ccadf41ae9d','2025-06-23 02:42:57','2025-06-23 23:42:57','APPROVED','Emma','Berg','19551118-2186','emma.berg@novabank.se','0705421755'),
                                                                                                                                    ('f0c5b33b-e52a-44d3-b9a5-4dba1cb838ac','2025-06-17 19:42:57','2025-06-19 16:42:57','APPROVED','Jonas','Biden','19691228-3523','jonassss.biden@novabank.se','0706168834'),
                                                                                                                                    ('9a5c2c71-fcda-4659-8a98-c17912ede8bf','2025-06-17 15:42:57','2025-06-18 06:42:57','DISAPPROVED','Ida','Nilsson','19690710-9792','ida.nilsson@novabank.se','0701783184'),
                                                                                                                                    ('de0eb0d5-7871-4e66-be1e-4b9ef85c5772','2025-06-21 10:42:57','2025-06-22 08:42:57','APPROVED','Aki','Berg','19510614-4332','aki.berg@novabank.se','0701808120'),
                                                                                                                                    ('1a289324-b171-4a9f-ba13-44c1c91d97ed','2025-06-18 11:42:57','2025-06-20 11:42:57','DISAPPROVED','Nikita','Berg','19850928-8822','nikita.berg@novabank.se','0703189696'),
                                                                                                                                    ('1bf5cb27-dd8d-4b82-829a-80e132631598','2025-06-13 17:42:57','2025-06-14 06:42:57','DISAPPROVED','Linus','Lind','19840506-5422','linus.lind@novabank.se','0707779804'),
                                                                                                                                    ('ebe7d4b8-ac49-44fb-9464-4f1cfef91a8a','2025-06-19 16:42:57','2025-06-20 10:42:57','PENDING','Nikita','Nilsson','19740519-6270','nikita.nilsson@novabank.se','0702676404'),
                                                                                                                                    ('23f86db0-21d5-49b2-8c66-0dc7db58dd7c','2025-06-14 03:42:57','2025-06-15 20:42:57','DISAPPROVED','Anna','Hahn','20041014-7872','anna.hahn@novabank.se','0704384980'),
                                                                                                                                    ('5575b4a0-c365-4879-ba7d-c07a8e6c11e5','2025-06-22 16:42:57','2025-06-23 18:42:57','APPROVED','Jonas','Biden','19780525-5068','jonas.biden@novabank.se','0701249239'),
                                                                                                                                    ('a033c43b-884e-47e5-9d21-27ef603f0006','2025-06-22 10:42:57','2025-06-22 22:42:57','DISAPPROVED','Aki','Andersson','19710319-7196','aki.andersson@novabank.se','0705257437'),
                                                                                                                                    ('935cb334-74de-4280-95a9-b829ff4a4783','2025-06-17 11:42:57','2025-06-19 11:42:57','DISAPPROVED','Aki','Ström','19910819-8495','aki.ström@novabank.se','0709204182'),
                                                                                                                                    ('01bf1b28-2645-4812-8490-48922eaab474','2025-06-14 12:42:57','2025-06-14 15:42:57','DISAPPROVED','Anna','Ström','19730613-6549','anna.ström@novabank.se','0705536523'),
                                                                                                                                    ('712961bc-007e-42d6-8a89-5daa54421e33','2025-06-20 00:42:57','2025-06-20 21:42:57','PENDING','Maja','Lind','19560410-8123','maja.lind@novabank.se','0708641442');
