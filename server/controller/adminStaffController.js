import bankadb from '../memorydb/bankadb';
//import createToken from '../lib/token';
import pool from '../lib/connectdb';

class AdminStaffController{

    //API for viewing all bank/user accounts
    getAllUserAccount(req, res){
        res.status(200).send({
            success: true,
            message: 'All Accounts',
            signupCustomer : bankadb.userSignup,
            savingsBankAccount: bankadb.savingsBankAccount,
            currentBankAccount : bankadb.currentBankAccount,
            accountProfile : bankadb.accountProfile,
            adminAccount : bankadb.adminUserAccount,
            staffAccount : bankadb.staffUserAccount,
            transactions : bankadb.transactions 
        });
    }

    //API for viewing all savings bank accounts
    getAllSavingsAccounts(req, res){

        const accountType = req.params.accountType;

        pool.query('SELECT * FROM bank_account WHERE account_type = $1', [accountType], (error, results) => {
                if (error) {
                  throw error
                }
                    res.status(200).json({
                        success: true,
                        message: `List of All Savings Accounts`,
                        results: results.rows
                    }); 
            })
    }

    //API for viewing all current bank accounts
    getAllCurrentAccounts(req, res){

        const accountType = req.params.accountType;

        pool.query('SELECT * FROM bank_account WHERE account_type = $1', [accountType], (error, results) => {
                if (error) {
                  throw error
                }
                    res.status(200).json({
                        success: true,
                        message: `List of All Current Accounts`,
                        results: results.rows
                    }); 
            })
    }

    //API for viewing a specific user savings account
    getSavingsAccounts(req, res){
        
        const id = parseInt(req.params.id),
              accountType = req.params.accountType;

        let {fullName, userAccount} = req.body;

        pool.query('SELECT * FROM bank_account WHERE id = $1 AND account_type = $2', [id, accountType], (error, results) => {
                if (error) {
                  throw error
                }
                results.rows.forEach((key) => {

                    fullName = `${key.full_name}`;
                    userAccount = key.account_type;

                    res.status(200).json({
                        success: true,
                        message: `${fullName}'s ${userAccount} Account(s)`,
                        results: results.rows
                    });
                }) 
            })
    }

    //API for viewing a specific user current account
    getCurrentAccounts(req, res){
        
        const id = parseInt(req.params.id),
              accountType = req.params.accountType;

        let {fullName, userAccount} = req.body;

        pool.query('SELECT * FROM bank_account WHERE id = $1 AND account_type = $2', [id, accountType], (error, results) => {
                if (error) {
                  return res.status(404).send({
                status: 'error', 
                message: 'User not found'
            });
                }
                results.rows.forEach((key) => {

                    fullName = `${key.full_name}`;
                    userAccount = key.account_type;

                    res.status(200).json({
                        success: true,
                        message: `${fullName}'s ${userAccount} Account(s)`,
                        results: results.rows
                    });
                }) 
            })
    }

    //API for deleting a savings account
    deleteSavingsAccount(req, res){
        
            res.status(200).send({
                success: true,
                message: `${req.body.fullName}'s ${req.body.accountType} Account has been Successfully Deleted`
            });
          
    }

    //API for deleting a current account
    deleteCurrentAccount(req, res, next){
          
        res.status(200).send({
            success: true,
            message: `${req.body.fullName}'s ${req.body.accountType} Account has been Successfully Deleted`
        });
    }

    //API for activating/deactivating a savings account
    patchSavingsAccount(req, res){
         
        res.status(200).send({
            success: true,
            message: `${req.body.fullName}'s ${req.body.accountType} Account is now ${req.body.accountStatus}`,
            validUser: req.body.validUser
        });
    }

    //API for activating/deactivating a current account
    patchCurrentAccount(req, res, next){
        res.status(200).send({
            success: true,
            message: `${req.body.fullName}'s ${req.body.accountType} Account is now ${req.body.accountStatus}`,
            validUser: req.body.validUser
        });
    }

    //API for viewing all admin user accounts
    getAdminUserAccounts(req, res){
        res.status(200).send({
            success: true,
            message: 'Admin User Accounts',
            adminAccount: bankadb.adminUserAccount
        });
    }

    //API for viewing all staff user accounts
    getStaffUserAccounts(req, res){
        res.status(200).send({
            success: true,
            message: 'Staff User Accounts',
            staffAccount: bankadb.staffUserAccount
        });
    }

    //API for creating a user(admin/staff) account
    postAdminCreateAccount(req, res){
        
        let {id, firstName, lastName, email, password, confirmPassword, accountType, accountStatus, createdOn, isAdmin, token} = req.body;

        pool.query('INSERT INTO create_account (id, first_name, last_name, email, _password, confirm_password, account_type, account_status, created_On, isAdmin, token) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *', [id, firstName, lastName, email, password, confirmPassword, accountType, accountStatus, createdOn, isAdmin, token], (error, results) => {
            if (error) {
              throw error
            }
            res.status(200).send({
                success: true,
                message: 'You have succesfully signed up',
                data: results.rows[0]
            }); 
            return;
          })
    }

    //API for user(admin) account profile
    getAdminProfile(req, res){

        const id = parseInt(req.params.id),
              accountType = req.params.accountType;

        let fullName = req.body.fullName;

        pool.query('SELECT * FROM create_account WHERE id = $1 AND account_type = $2', [id, accountType], (error, results) => {
                if (error) {
                  throw error
                }
                results.rows.forEach((key) => {

                    fullName = `${key.first_name} ${key.last_name}`;

                    res.status(200).json({
                        success: true,
                        message: `${fullName}'s Account Profile`,
                        results: results.rows
                    }); 
                });
            })
    }

    //API for user(admin) account profile
    getStaffProfile(req, res){

        const id = parseInt(req.params.id),
              accountType = req.params.accountType;

        let fullName = req.body.fullName;

        pool.query('SELECT * FROM create_account WHERE id = $1 AND accountType = $2', [id, accountType], (error, results) => {
                if (error) {
                  throw error
                }
                results.rows.forEach((key) => {

                    fullName = `${key.first_name} ${key.last_name}`

                    res.status(200).json({
                        success: true,
                        message: `${fullName}'s Account Profile`,
                        results: results.rows
                    }); 
                });
            })
    }

        //API for admin login
        postAdminLogin(req, res){
    
            const id = parseInt(req.params.id);
            let {email, password} = req.body;
            
            pool.query('SELECT * FROM create_account WHERE id = $1', [id], (error, results) => {
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

        //API for staff login
        postStaffLogin(req, res){

            const id = parseInt(req.params.id);
            let {email, password} = req.body;
            
            pool.query('SELECT * FROM create_account WHERE id = $1', [id], (error, results) => {
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

    //API for deleting an admin account
    deleteAdminAccount(req, res){
        
            res.status(200).send({
                success: true,
                message: `${req.body.firstName} ${req.body.lastName}'s ${req.body.userAccountType} Account has been Successfully Deleted`
            });
        
    }

    //API for deleting a staff account
    deleteStaffAccount(req, res, next){
        res.status(200).send({
            success: true,
            message: `${req.body.firstName} ${req.body.lastName}'s ${req.body.userAccountType} Account has been Successfully Deleted`
        });
    }

    //API for activating/deactivating admin account
    patchAdminAccount(req, res){
        res.status(200).send({
            success: true,
            message: `${req.body.fullName}'s ${req.body.accountType} Account is now ${req.body.accountStatus}`,
            validUser: req.body.validUser
        });
    }

    //API for activating/deactivating current accounts
    patchStaffAccount(req, res, next){
        res.status(200).send({
            success: true,
            message: `${req.body.fullName}'s ${req.body.accountType} Account is now ${req.body.accountStatus}`,
            validUser: req.body.validUser
        });
    }

    //API for staff to credit/debit a current account
    updateCurrentAccount(req, res){

        const accountTransactions = {
            fullName : req.body.fullName,
            accountEmail : req.body.emailAddress,
            id : req.body.id,
            accountNumber : req.body.accountNumber,
            amount : parseFloat(req.body.amount),
            accountType : req.body.accountType,
            transactionDate : new Date(),
            cashier : req.body.cashier,
            transactionType : req.body.transactionType,
            totalCredit : req.body.totalCredit,
            totalDebit : req.body.totalDebit,
            oldBalance : req.body.oldBalance,
            newBalance : req.body.newBalance
        }    
    
        bankadb.transactions.push(accountTransactions);
    
        res.status(200).send({
            success: true,
            message: `Account Number ${req.body.accountNumber} has been successfully ${req.body.transactionType}ed with NGN${req.body.amount}`,
            accountTransactions
        });
    }

    //API for staff to credit/debit savings accounts
    updateSavingsAccount(req, res){
        
        const accountTransactions = {
            fullName : req.body.fullName,
            accountEmail : req.body.emailAddress,
            id : req.body.id,
            accountNumber : req.body.accountNumber,
            amount : parseFloat(req.body.amount),
            accountType : req.body.accountType,
            transactionDate : new Date(),
            cashier : req.body.cashier,
            transactionType : req.body.transactionType,
            totalCredit : req.body.totalCredit,
            totalDebit : req.body.totalDebit,
            oldBalance : req.body.oldBalance,
            newBalance : req.body.newBalance
        }    
    
        bankadb.transactions.push(accountTransactions);
    
        res.status(200).send({
            success: true,
            message: `Account Number ${req.body.accountNumber} has been successfully ${req.body.transactionType}ed with NGN${req.body.amount}`,
            accountTransactions
        });     
    }
}

const adminStaffController = new AdminStaffController();
export default adminStaffController;
