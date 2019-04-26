import bankadb from '../memorydb/bankadb';
//import createToken from '../lib/token';
import pool from '../lib/connectdb';

class AdminStaffController{

    // //API for viewing all bank/user accounts
    // getAllUserAccount(req, res){
    //     res.status(200).send({
    //         success: true,
    //         message: 'All Accounts',
    //         signupCustomer : bankadb.userSignup,
    //         savingsBankAccount: bankadb.savingsBankAccount,
    //         currentBankAccount : bankadb.currentBankAccount,
    //         accountProfile : bankadb.accountProfile,
    //         adminAccount : bankadb.adminUserAccount,
    //         staffAccount : bankadb.staffUserAccount,
    //         transactions : bankadb.transactions 
    //     });
    // }

    //API for viewing all bank accounts
    getAllBankAccounts(req, res){

        const accountType = req.params.accountType;
        let userAccount = req.body.userAccount;

        pool.query('SELECT * FROM bank_account WHERE account_type = $1', [accountType], (error, results) => {
                if (error) {
                  throw error
                }
                results.rows.forEach((key) => {

                    userAccount = key.accountType;

                    res.status(200).json({
                        success: true,
                        message: `List of All ${userAccount} Accounts`,
                        results: results.rows
                    }); 
                })
            })
    }

    //API for viewing a specific user savings account
    getBankAccounts(req, res){
        
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

    
    //API for deleting a savings account
    deleteBankAccount(req, res){
        console.log('i got herea')

        const accountNumber = parseInt(req.params.accountNumber);

        pool.query('DELETE FROM bank_account WHERE account_number = $1 RETURNING *', [accountNumber], (error, results) => {
            if (error) {
              throw error
            }
            return res.status(200).json({
                success: true,
                message: ` Account has been Successfully Deleted`,
            });  
        })  
    }

    //API for activating/deactivating a bank account
    patchBankAccount(req, res){

        const accountNumber = parseInt(req.params.accountNumber)
        let { accountStatus, fullName, userAccount, userStatus } = req.body;


        pool.query('SELECT * FROM customer WHERE account_number = $1', [accountNumber], (error, results) => {
            if(error){
                throw error
            }
            results.rows.forEach((key) => {

                pool.query('UPDATE bank_account SET account_status = $1 WHERE account_number = $2 RETURNING *',[accountStatus, accountNumber], (error, results) => {
                  if (error) {
                    throw error
                  }
                  if(key.account_status == 'Active'){
                        accountStatus = 'Dormant';
                        userStatus = accountStatus;
                    }
                    else if(key.account_status == 'Dormant'){
                        accountStatus = 'Active';
                        userStatus = accountStatus;
                    } 

                    res.status(200).json(results.rows[0]);
                
                })
            })
        })  
    }

    //API for viewing all admin user accounts
    getAdminStaffAccounts(req, res){

        const accountType = req.params.accountType;
        let userAccount = req.body.userAccount;

        pool.query('SELECT * FROM create_account WHERE account_type = $1', [accountType], (error, results) => {
                if (error) {
                  throw error
                }
                results.rows.forEach((key) => {

                    userAccount = key.accountType;

                    res.status(200).json({
                        success: true,
                        message: `List of All ${userAccount} Accounts`,
                        results: results.rows
                    }); 
                })
            })
        
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
            console.log(error);
            console.log(results.rows[0]);
            if (error) {
              throw error
            }
            results.rows.forEach((key) => {

                const fullName = `${key.first_name} ${key.last_name}`;
                const userAccount = key.account_type;

                return res.status(200).send({
                success: true,
                message: `${fullName}'s ${userAccount} Account has been succesfully created`,
                data: results.rows 
            }); 
            })
          })
    }

    //API for user(admin) account profile
    getAdminStaffProfile(req, res){

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

    // //API for user(admin) account profile
    // getStaffProfile(req, res){

    //     const id = parseInt(req.params.id),
    //           accountType = req.params.accountType;

    //     let fullName = req.body.fullName;

    //     pool.query('SELECT * FROM create_account WHERE id = $1 AND accountType = $2', [id, accountType], (error, results) => {
    //             if (error) {
    //               throw error
    //             }
    //             results.rows.forEach((key) => {

    //                 fullName = `${key.first_name} ${key.last_name}`

    //                 res.status(200).json({
    //                     success: true,
    //                     message: `${fullName}'s Account Profile`,
    //                     results: results.rows
    //                 }); 
    //             });
    //         })
    // }

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
    deleteUserAccount(req, res){
        console.log('i got hereb')
        const id = parseInt(req.params.id),
            accountType = req.params.accountType;

        pool.query('DELETE FROM create_account WHERE id = $1 AND account_type = $2 RETURNING *', [id, accountType], (error, results) => {
            if (error) {
              throw error
            }
            return res.status(200).json({
                success: true,
                 message: `Account has been Successfully Deleted`,
            }); 
        }) 
        
    }

    //API for deleting a staff account
    deleteCustomerAccount(req, res){
        console.log(req.params.id)

        const id = parseInt(req.params.id);

        pool.query('DELETE FROM customer WHERE id = $1 RETURNING *', [id], (error, results) => {
            console.log(error);
            console.log(results.rows[0]);
            if (error) {
              throw error
            }
            res.status(200).json({
                success: true,
                message: ` Account has been Successfully Deleted`,
                results: results.rows[0]
            });  
        })  
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
