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
    account_number BIGINT REFERENCES bank_account (account_number),
    UNIQUE(account_number)
);

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
    created_On TIMESTAMP NOT NULL,
    opening_Balance  FLOAT NOT NULL,
    credit FLOAT NOT NULL,
    debit FLOAT NOT NULL,
    totalCredit FLOAT NOT NULL,
    totalDebit FLOAT NOT NULL,
    oldBalance FLOAT NOT NULL,
    newBalance FLOAT NOT NULL
);

CREATE TABLE contact_form (
    sn SERIAL,
    id INT NOT NULL PRIMARY KEY,
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

const createBankAccount = {
            id : req.body.id,
            accountNumber : Math.floor(1111111111 + Math.random() * 1999999999),
            fullName :  req.body.fullName,
            owner: req.body.owner,
            bvnNumber : parseInt(req.body.bvnNumber),
            dateOfBirth : req.body.dateOfBirth,
            residentialAddress : req.body.residentialAddress,
            meansOfIdentification : req.body.meansOfIdentification,
            idNumber : parseInt(req.body.idNumber),
            emailAddress : req.body.emailAddress,
            occupation : req.body.occupation,
            nextOfKin : req.body.nextOfKin,
            relationshipToNextOfKin : req.body.relationshipToNextOfKin,
            phoneNumber : req.body.phoneNumber,
            accountType : req.body.accountType,
            accountStatus : 'Active',
            sex: req.body.sex,
            maritalStatus : req.body.maritalStatus,
            currency : 'NGN',
            createdOn : new Date(),
            openingBalance : parseFloat(0),
            credit : parseFloat(0),
            debit : parseFloat(0),
            totalCredit : parseFloat(0),
            totalDebit : parseFloat(0),
            oldBalance : parseFloat(0),
            newBalance : parseFloat(0)
        };

        req.body.accountType == 'Savings' ? bankadb.savingsBankAccount.push(createBankAccount) : req.body.accountType == 'Current' ? bankadb.currentBankAccount.push(createBankAccount) : undefined;

        bankadb.accountProfile.push(createBankAccount);