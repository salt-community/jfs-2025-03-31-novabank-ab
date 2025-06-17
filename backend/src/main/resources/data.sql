-- Currencies
INSERT INTO currencies (id, name, abbrevation) VALUES
    ('9bdc18e7-8173-4191-8f61-f3451c5e6759', 'Swedish Krona', 'SEK'),
    ('9fa9391c-b25a-4933-8c58-e9c7c77f3620', 'Euro', 'EUR');

-- Users
INSERT INTO users (id, full_name, email, phone_number, role, status, created_at, last_login) VALUES
    ('user_2yMYqxXhoEDq64tfBlelGADfdlp', 'Amanda', 'amanda.strom@appliedtechnology.se', '0700000000', 'USER', 'ACTIVE', '2025-06-12 08:42:57', '2025-06-12 08:42:57'),
    ('user_2ya9D2bPCC3XYyGsklZRQPPBeb9', 'Elias', 'elias.egelrud@appliedtechnology.se', '0700000001', 'USER', 'ACTIVE', '2025-06-12 08:42:57', '2025-06-12 08:42:57'),
    ('b29f9397-ec6b-4d5e-9f1c-2939d2c1995b', 'User 3', 'user3@example.com', '0700000002', 'USER', 'ACTIVE', '2025-06-12 08:42:57', '2025-06-12 08:42:57');

    -- Accounts
INSERT INTO accounts (id, user_id, currency_id, created_at, balance, type, status, account_number) VALUES
    ('c1b35a93-9671-43c1-a0fe-aa4c2e9d2aec', 'user_2yMYqxXhoEDq64tfBlelGADfdlp', '9bdc18e7-8173-4191-8f61-f3451c5e6759', '2025-06-12', 9370, 'PERSONAL', 'ACTIVE', 'ACC1000'),
    ('3587b71d-5845-4ba3-b667-e556bdf845be', 'user_2ya9D2bPCC3XYyGsklZRQPPBeb9', '9fa9391c-b25a-4933-8c58-e9c7c77f3620', '2025-06-12', 1763, 'PERSONAL', 'ACTIVE', 'ACC1001'),
    ('7915a5bd-ddcc-4a40-8343-dee3a2188cf0', 'b29f9397-ec6b-4d5e-9f1c-2939d2c1995b', '9bdc18e7-8173-4191-8f61-f3451c5e6759', '2025-06-12', 7459, 'PERSONAL', 'ACTIVE', 'ACC1002'),
    ('67d254c1-1532-4cf4-8d4f-55ef8fe12717', 'user_2yMYqxXhoEDq64tfBlelGADfdlp', '9fa9391c-b25a-4933-8c58-e9c7c77f3620', '2025-06-12', 2583, 'PERSONAL', 'ACTIVE', 'ACC1003'),
    ('57a34877-b5f7-4967-a40b-c5cfba12cc67', 'user_2ya9D2bPCC3XYyGsklZRQPPBeb9', '9bdc18e7-8173-4191-8f61-f3451c5e6759', '2025-06-12', 9515, 'PERSONAL', 'ACTIVE', 'ACC1004'),
    ('4cab58e6-5ebd-4cc3-b42c-1eca8da00a4a', 'b29f9397-ec6b-4d5e-9f1c-2939d2c1995b', '9fa9391c-b25a-4933-8c58-e9c7c77f3620', '2025-06-12', 4064, 'PERSONAL', 'ACTIVE', 'ACC1005'),
    ('ec70e8d7-6fb5-4364-81da-9b1a52cc1650', 'user_2yMYqxXhoEDq64tfBlelGADfdlp', '9bdc18e7-8173-4191-8f61-f3451c5e6759', '2025-06-12', 2333, 'PERSONAL', 'ACTIVE', 'ACC1006'),
    ('400086d4-7b9c-4052-abf3-651376b6817d', 'user_2ya9D2bPCC3XYyGsklZRQPPBeb9', '9fa9391c-b25a-4933-8c58-e9c7c77f3620', '2025-06-12', 9588, 'PERSONAL', 'ACTIVE', 'ACC1007');

-- Transactions
INSERT INTO transactions (id, from_account_id, to_account_id, created_at, amount, description, user_note, ocr_number) VALUES
    ('2fcbbb39-06f2-4d67-a054-2da86129ee28', 'c1b35a93-9671-43c1-a0fe-aa4c2e9d2aec', '3587b71d-5845-4ba3-b667-e556bdf845be', '2025-06-12 08:42:57', 188, 'Description 0', 'Note 0', 'OCR00000'),
    ('fa70865e-e018-410a-99a1-018ea90a3ce6', '3587b71d-5845-4ba3-b667-e556bdf845be', '7915a5bd-ddcc-4a40-8343-dee3a2188cf0', '2025-06-12 08:42:57', 632, 'Description 1', 'Note 1', 'OCR00001'),
    ('62e1632f-e075-4add-984f-a3a7787efb83', '7915a5bd-ddcc-4a40-8343-dee3a2188cf0', '67d254c1-1532-4cf4-8d4f-55ef8fe12717', '2025-06-12 08:42:57', 670, 'Description 2', 'Note 2', 'OCR00002'),
    ('a66ea65f-1a05-4153-bdb7-085ff312d6e6', '67d254c1-1532-4cf4-8d4f-55ef8fe12717', '57a34877-b5f7-4967-a40b-c5cfba12cc67', '2025-06-12 08:42:57', 354, 'Description 3', 'Note 3', 'OCR00003'),
    ('a923eb88-eb4c-43f8-aed4-d3504ecce1e7', '57a34877-b5f7-4967-a40b-c5cfba12cc67', 'c1b35a93-9671-43c1-a0fe-aa4c2e9d2aec', '2025-06-12 08:42:57', 834, 'Description 4', 'Note 4', 'OCR00004'),
    ('8d83bef8-c4de-4c3c-aaee-43df053b541b', 'c1b35a93-9671-43c1-a0fe-aa4c2e9d2aec', '3587b71d-5845-4ba3-b667-e556bdf845be', '2025-06-12 08:42:57', 741, 'Description 5', 'Note 5', 'OCR00005'),
    ('4b49b008-71ff-4770-8417-f411e78f9283', '3587b71d-5845-4ba3-b667-e556bdf845be', '7915a5bd-ddcc-4a40-8343-dee3a2188cf0', '2025-06-12 08:42:57', 113, 'Description 6', 'Note 6', 'OCR00006'),
    ('122f8446-0195-49db-9c83-18bb930bf18f', '7915a5bd-ddcc-4a40-8343-dee3a2188cf0', '67d254c1-1532-4cf4-8d4f-55ef8fe12717', '2025-06-12 08:42:57', 108, 'Description 7', 'Note 7', 'OCR00007'),
    ('809cc380-badd-4876-b0ae-a8ff19f5c500', '67d254c1-1532-4cf4-8d4f-55ef8fe12717', '57a34877-b5f7-4967-a40b-c5cfba12cc67', '2025-06-12 08:42:57', 401, 'Description 8', 'Note 8', 'OCR00008'),
    ('47271bd9-b2f5-458e-85b3-7d0ea5a7be7b', '57a34877-b5f7-4967-a40b-c5cfba12cc67', 'c1b35a93-9671-43c1-a0fe-aa4c2e9d2aec', '2025-06-12 08:42:57', 986, 'Description 9', 'Note 9', 'OCR00009');

-- Scheduled Transactions
INSERT INTO scheduled_transactions (id, from_account_id, to_account_id, amount, scheduled_date, status, created_at, ocr_number, user_note, description) VALUES
    ('69ca9a09-804d-4c67-9227-ea23569d4a31', 'c1b35a93-9671-43c1-a0fe-aa4c2e9d2aec', '3587b71d-5845-4ba3-b667-e556bdf845be', 1331, '2025-06-19 08:42:57', 'PENDING', '2025-06-12 08:42:57', 'OCRS00000', 'Scheduled Note 0', 'Scheduled Description 0'),
    ('0e683c21-5ed5-4498-b7d4-a9d4e432be02', '3587b71d-5845-4ba3-b667-e556bdf845be', '7915a5bd-ddcc-4a40-8343-dee3a2188cf0', 1204, '2025-06-19 08:42:57', 'PENDING', '2025-06-12 08:42:57', 'OCRS00001', 'Scheduled Note 1', 'Scheduled Description 1'),
    ('4df15be9-12a2-4ee3-8f5c-c11dee6bae57', '7915a5bd-ddcc-4a40-8343-dee3a2188cf0', '67d254c1-1532-4cf4-8d4f-55ef8fe12717', 979, '2025-06-19 08:42:57', 'PENDING', '2025-06-12 08:42:57', 'OCRS00002', 'Scheduled Note 2', 'Scheduled Description 2');
