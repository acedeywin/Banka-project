CREATE TABLE customer (
    sn SERIAL,
    id INT NOT NULL PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    phone_number BIGINT NOT NULL,
    _password VARCHAR(50) NOT NULL,
    confirm_password VARCHAR(50) NOT NULL,
    user_account VARCHAR(20) NOT NULL,
    token VARCHAR(5000) NOT NULL,
    account_number BIGINT
);

REFERENCES bank_account (account_number),
    UNIQUE(account_number)

CREATE TABLE bank_account (
    sn SERIAL,
    id INT NOT NULL,
    account_number BIGINT NOT NULL PRIMARY KEY,
    full_name VARCHAR(50) NOT NULL,
    _owner INT NOT NULL,
    bvn_number BIGINT NOT NULL,
    date_of_birth TIMESTAMP NOT NULL,
    residential_address VARCHAR(100) NOT NULL,
    means_of_identification VARCHAR(50) NOT NULL,
    id_number BIGINT NOT NULL,
    email_address VARCHAR(100) NOT NULL,
    occupation VARCHAR(50) NOT NULL,
    next_of_kin VARCHAR(100) NOT NULL,
    relationship_to_Kin VARCHAR(100) NOT NULL,
    phone_number BIGINT NOT NULL,
    account_type VARCHAR(20) NOT NULL,
    account_status VARCHAR(20) NOT NULL,
    sex VARCHAR(10) NOT NULL,
    marital_status VARCHAR(20) NOT NULL,
    currency VARCHAR(7) NOT NULL,
    created_on TIMESTAMP NOT NULL,
    opening_balance  FLOAT NOT NULL,
    credit FLOAT NOT NULL,
    debit FLOAT NOT NULL,
    total_credit FLOAT NOT NULL,
    total_debit FLOAT NOT NULL,
    old_balance FLOAT NOT NULL,
    new_balance FLOAT NOT NULL
);

CREATE TABLE contact_form (
    sn SERIAL,
    id INT NOT NULL,
    full_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    _message VARCHAR(2000) NOT NULL
);

CREATE TABLE create_account (
    sn SERIAL,
    id INT NOT NULL PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    email VARCHAR(50) NOT NULL,
    _password VARCHAR(50) NOT NULL,
    confirm_password VARCHAR(50) NOT NULL,
    account_type VARCHAR(20) NOT NULL,
    account_status VARCHAR(20) NOT NULL,
    created_On TIMESTAMP NOT NULL,
    isAdmin BOOLEAN NOT NULL,
    token VARCHAR(5000) NOT NULL
);

CREATE TABLE transaction (
    sn SERIAL,
    id INT,
    transaction_date TIMESTAMP,
    account_number,
    account_type VARCHAR(50),
    transaction_type VARCHAR(50),
    deposit BIGINT,
    withdrawal BIGINT,
    balance BIGINT
);
