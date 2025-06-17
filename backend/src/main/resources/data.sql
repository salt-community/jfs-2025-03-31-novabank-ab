-- Insert User
INSERT INTO users (
    id, password, first_name, last_name, email, phone_number, role, status, created_at, last_login
) VALUES (
             'user_2yMZ4k4VMcQ4C3Yowv3JfXg0mOd', 'encoded-password', 'John', 'Doe',
             'john.doe@example.com', '0701234567', 'user', 'ACTIVE',
             '2024-01-01T10:00:00', '2024-01-02T12:00:00'
         );

-- Insert Currency
INSERT INTO currencies (id, name, abbrevation) VALUES (
                                                          '1eccc3ba-d76c-4a97-9a10-c3b02d705555', 'Swedish Krona', 'SEK'
                                                      );

-- Insert Account
INSERT INTO accounts (
    id, user_id, currency_id, created_at, balance, type, status, account_number
) VALUES (
             '11111111-1111-1111-1111-111111111111', 'user_2yMZ4k4VMcQ4C3Yowv3JfXg0mOd',
             '1eccc3ba-d76c-4a97-9a10-c3b02d705555', '2024-01-01', 5000.00,
             'PERSONAL', 'ACTIVE', '1234567890'
         );

-- Insert Nickname for Account
INSERT INTO account_nickname (id, nickname, account_id) VALUES (
                                                                   '22222222-2222-2222-2222-222222222222', 'Main Savings',
                                                                   '11111111-1111-1111-1111-111111111111'
                                                               );

-- Insert Transaction
INSERT INTO transactions (
    id, from_account_id, to_account_id, recipient_number, type, created_at,
    amount, description, user_note, ocr_number
) VALUES (
             '33333333-3333-3333-3333-333333333333',
             '11111111-1111-1111-1111-111111111111',
             '11111111-1111-1111-1111-111111111111',
             '9876543210', 1, '2024-01-10T14:30:00',
             1000.00, 'Rent payment', 'January rent', 'OCR123456'
         );

-- Insert Client (external)
INSERT INTO clients (id, account_number) VALUES (
                                                    '44444444-4444-4444-4444-444444444444', '9988776655'
                                                );

-- Insert Application
INSERT INTO applications (
    id, created_at, status, first_name, last_name, personal_number, email, phone_number
) VALUES (
             '55555555-5555-5555-5555-555555555555', '2024-01-03T08:00:00', 'PENDING',
             'Alice', 'Smith', '9001011234', 'alice@example.com', '0707654321'
         );
