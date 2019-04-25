import bankadb from '../memorydb/bankadb';
//import createToken from '../lib/token';
import pool from '../lib/connectdb';


class CustomerController {

    //API for user(customer) signup
    postUserSignup(req, res){        

        let {id, email, firstName, lastName, phoneNumber, password, confirmPassword, userAccount, token} = req.body;

        pool.query('INSERT INTO customer (id, email, first_name, last_name, phone_number, _password, confirm_password, user_account, token) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [id, email, firstName, lastName, phoneNumber, password, confirmPassword, userAccount,  token], (error, results) => {
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
            let {email, password} = req.body;
            
            pool.query('SELECT * FROM customer WHERE id = $1', [id], (error, results) => {
                if (error) {
                  throw error
                }
                results.rows.forEach((key) => {
                    if (key.email == email && key._password == password) {
                        res.status(200).json(results.rows);
                    }else{
                        res.status(404).json('User not found');
                    }  
                  });
              })
    }

    //API for user(customer) to create a bank account
    postCreateBankAccount(req, res){

        let id = parseInt(req.params.id);

        let {accountNumber, fullName, owner, bvnNumber, dateOfBirth, residentialAddress, meansOfIdentification, idNumber, emailAddress, occupation, nextOfKin, relationshipToNextOfKin, phoneNumber, accountType,accountStatus, sex, maritalStatus, currency, createdOn, openingBalance, credit, debit, totalCredit, totalDebit, oldBalance, newBalance} = req.body; 

        pool.query('SELECT * FROM customer WHERE id = $1', [id], (error, results) => {
            if(error){
                throw error
            }
            results.rows.forEach((key) => {
                if(key.id == id){

                    id = key.id;
                    fullName = `${key.first_name} ${key.last_name}`; 
                    owner = key.id; 
                    emailAddress = key.email; 
                    phoneNumber = key.phone_number;

                    pool.query('INSERT INTO bank_account (id, account_number, full_name, _owner, bvn_number, date_of_birth, residential_address, means_of_identification, id_number, email_address, occupation, next_of_kin, relationship_to_Kin, phone_number, account_type,account_status, sex, marital_status, currency, created_on, opening_balance, credit, debit, totalCredit, totalDebit, oldBalance, newBalance) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27) RETURNING *', [id, accountNumber, fullName, owner, bvnNumber, dateOfBirth, residentialAddress, meansOfIdentification, idNumber, emailAddress, occupation, nextOfKin, relationshipToNextOfKin, phoneNumber, accountType,accountStatus, sex, maritalStatus, currency, createdOn, openingBalance, credit, debit, totalCredit, totalDebit, oldBalance, newBalance], (error, results) => {
                        if(error){
                            throw error
                        }else{
                            res.status(200).json(results.rows[0]);
                        }
                    })
                }
            })
        })
    }

    //API for user(customer) account profile
    getAccountProfile(req, res){

        const id = parseInt(req.params.id);
        let fullName = req.body.fullName;

        pool.query('SELECT * FROM customer WHERE id = $1', [id], (error, results) => {
                if (error) {
                  throw error
                }
                results.rows.forEach((key) => {

                    fullName = `${key.first_name} ${key.last_name}`

                   return res.status(200).json({
                        success: true,
                        message: `${fullName}'s Account Profile`,
                        results: results.rows
                    }); 
                });
            })
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