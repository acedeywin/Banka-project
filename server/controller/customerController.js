import bankadb from '../memorydb/bankadb';
// import createToken from '../lib/token';
import pool from '../lib/connectdb';

class CustomerController {

    //API for user(customer) signup
    postUserSignup(req, res){        

        let {id, email, firstName, lastName, phoneNumber, password, confirmPassword, accountType, token} = req.body;

        pool.query('INSERT INTO signup (id, email, first_name, last_name, phone_number, _password, confirm_password, account_type, token) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [id, email, firstName, lastName, phoneNumber, password, confirmPassword, accountType, token], (error, results) => {
            if (error) {
              throw error
            }
            return res.status(200).send({
                success: true,
                message: 'You have succesfully signed up',
                data: results.rows[0]
            }); 
          })             
    } 

    //API for user(customer) login
    postUserLogin(req, res){

            const id = parseInt(req.params.id);
            let {email, password, firstName, lastName, token} = req.body;
            
            pool.query('SELECT * FROM signup WHERE id = $1', [id], (error, results) => {
                if (error) {
                  throw error
                }
                res.status(200).json(results.rows)
              })
    }

    //API for user(customer) to create a bank account
    postCreateBankAccount(req, res){

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
    
        res.status(200).send({
            success: true,
            message: 'Account Created Successful',
            createBankAccount
        });
    }

    //API for user(customer) account profile
    getAccountProfile(req, res){

        const accountProfile = {
            id : req.body.id,
            accountNumber : req.body.accountNumber,
            accountType : req.body.accountType,
            createdOn : req.body.createdOn,
            accountOwner : req.body.fullName,
            currency : req.body.currency,
            accountStatus : req.body.accountStatus,
            totalCredit : req.body.totalCredit,
            totalDebit : req.body.totalDebit,
            accountBalance : req.body.newBalance
        };

        bankadb.userProfile.push(accountProfile);

        res.status(200).send({
            success: true,
            message: `${req.body.fullName} Account Profile`,
            accountProfile
        });
    }

    //API for user(customer) contact page
    postContactPage(req, res){

        const contact = {
            id : req.body.id,
            fullName : req.body.fullName,
            email : req.body.emailAddress,
            message : req.body.message
        };

        bankadb.contactMessage.push(contact);

        res.status(200).send({
            success: true,
            message: 'Message successfully sent!',
            contact
        });
    }

    getTransactionHistory(req, res){

        

        const transactionHistory = {
            id : req.body.id,
            transactionDate : req.body.transactionDate,
            accountType : req.body.accountType,
            transactionType : req.body.transactionType,
            deposit : req.body.deposit,
            withdrawal : req.body.withdrawal,
            balance : req.body.newBalance
        };


        bankadb.history.push(transactionHistory);

        res.status(200).send({
            success: true,
            message: `Transaction History for ${req.body.fullName}`,
            transactionHistory
        });

    }
}

const customerController = new CustomerController();
export default customerController;