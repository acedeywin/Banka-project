import bankadb from '../memorydb/bankadb';
import createToken from '../lib/token';
import {validateEmail, validateString, validateAmount} from '../lib/emailCheck';
import pool from '../lib/connectdb';

export const validSavingsAccounts = (req, res, next) => {

    const id = parseInt(req.params.id),
          accountType = req.params.accountType;;


        if(!id || !accountType){
            return res.status(404).send({
                status: 'error', 
                message: 'User not found'
            });
        }
        return next();
}

export const validCurrentAccounts = (req, res, next) => {

    const id = parseInt(req.params.id),
          accountType = req.params.accountType;;


        if(!id || !accountType){
            return res.status(404).send({
                status: 'error', 
                message: 'User not found'
            });
        }
        return next();

}

// export const validDeleteCurrentAccount = (req, res, next) => {

//     const id = parseInt(req.params.id);
//         let validUser;

//         bankadb.currentBankAccount.map((user, index) => {
//             if (user.id === id) {
//                 validUser = user

//                 req.body.fullName = validUser.fullName;
//                 req.body.accountType = validUser.accountType;

//                 bankadb.currentBankAccount.splice(index, 1);
//             }
//         });

//         if(!validUser){
//             res.status(404).send({
//                 status: 'error', 
//                 message: 'User not found'
//             });
//         }
//         return next();
// }

export const validPatchBankAccount = (req, res, next) => {
    

    let { accountStatus, fullName, userAccount, userStatus } = req.body;


                 fullName = key.full_name;
                 userAccount = key.account_type;
                 req.body.accountStatus = 'Dormant';

                 if(accountNumber != key.account_number){
                    res.status(404).send({
                        status: 'error', 
                        message: 'User not found'
                    });
                 }

                 if(key.account_status == 'Active'){
                    account_status = 'Dormant';
                    userStatus = 'Dormant';

                }
                else if(key.account_status == 'Dormant'){
                        account_status = 'Active';
                        userStatus = 'Active';
                }

                return res.status(200).json({
                 success: true,
                 message: `${fullName}'s ${userAccount} Account is now ${userStatus}`,
                 results: results.rows
              })
                 
         


    return next();
}

// export const validPatchCurrentAccount = (req, res, next) => {

//     const id = parseInt(req.params.id);
//     let validUser;

//     bankadb.currentBankAccount.map((user) => {
//         if (user.id === id) {
//             validUser = user;

//             req.body.validUser = validUser;
//             req.body.fullName = validUser.fullName;
//             req.body.accountType = validUser.accountType;
//         }
//     });

//     if(!validUser){
//         res.status(404).send({
//             status: 'error', 
//             message: 'User not found'
//         });
//     }

//     if(validUser.accountStatus == 'Active'){
//         validUser.accountStatus = 'Dormant';
//         req.body.accountStatus = 'Dormant';

//     }
//     else if(validUser.accountStatus == 'Dormant'){
//         validUser.accountStatus = 'Active';
//         req.body.accountStatus = 'Active';
//     }

//     return next();
// }

export const validAdminCreateAccount = (req, res, next) => {

    let {id, email, firstName, lastName, password, confirmPassword, accountType} = req.body;
    
    req.body.token = createToken(req.body.token);
    req.body.accountStatus = 'Active';
    req.body.createdOn = new Date();

    if(!validateString(firstName) || !validateString(lastName) || !validateEmail(email) || !validateString(accountType) || isNaN(id) || !password || !confirmPassword){
        res.status(406).send({
            status: 'error', 
            message: 'All inputs must be valid'
        });
    }
    else if(password !== confirmPassword){
        res.status(406).send({
            status: 'error', 
            message: 'Password mismatch'
        });
    }

    if(accountType == 'Staff'){
        req.body.isAdmin = false;
    }
    else if(accountType == 'Admin'){
        req.body.isAdmin = true;
    }
    return next();
}

 export const validAdminProfile = (req, res, next) => {

    const id = parseInt(req.params.id);

        if(!id){
            res.status(406).send({
                status: 'error', 
                message: 'User not found'
            });
        }
        return next();
}

export const validStaffProfile = (req, res, next) => {

    const id = parseInt(req.params.id);

        if(!id){
            res.status(406).send({
                status: 'error', 
                message: 'User not found'
            });
        }
        return next();    
}

export const validAdminLogin = (req, res, next) => {

    let {email, password} = req.body;
    
            if(!email || !password){
                res.status(404).send({
                    status: 'error', 
                    message: 'Invalid User'
                }); 
            }
            return next();         
}

export const validStaffLogin = (req, res, next) => {
    let {email, password} = req.body;
    
            if(!email || !password){
                res.status(404).send({
                    status: 'error', 
                    message: 'Invalid User'
                }); 
            }
            return next();
}

export const validDeleteAdminAccount = (req, res, next) => {

    const id = parseInt(req.params.id);
        let validUser;

        bankadb.adminUserAccount.map((user, index) => {
            if (user.id === id) {
                validUser = user

                req.body.firstName = validUser.firstName;
                req.body.lastName = validUser.lastName;
                req.body.userAccountType = validUser.userAccountType;

                bankadb.adminUserAccount.splice(index, 1);
            }
        });

        if(!validUser){
            res.status(404).send({
                status: 'error', 
                message: 'User not found'
            });
        }
        return next();
}

export const validDeleteStaffAccount = (req, res, next) => {
    const id = parseInt(req.params.id);
        let validUser;

        bankadb.staffUserAccount.map((user, index) => {
            if (user.id === id) {
                validUser = user

                req.body.firstName = validUser.firstName;
                req.body.lastName = validUser.lastName;
                req.body.userAccountType = validUser.userAccountType;

                bankadb.staffUserAccount.splice(index, 1);
            }
        });

        if(!validUser){
            res.status(404).send({
                status: 'error', 
                message: 'User not found'
            });
        }
        return next();
}

export const validPatchAdminAccount = (req, res, next) => {
    const id = parseInt(req.params.id);
    let validUser;

    bankadb.adminUserAccount.map((user) => {
        if (user.id === id) {
            validUser = user;

            req.body.validUser = validUser;
            req.body.fullName = validUser.fullName;
            req.body.accountType = validUser.accountType;
        }
    });

    if(!validUser){
        res.status(404).send({
            status: 'error', 
            message: 'User not found'
        });
    }

    if(validUser.accountStatus == 'Active'){
        validUser.accountStatus = 'Dormant';
        req.body.accountStatus = 'Dormant';

    }
    else if(validUser.accountStatus == 'Dormant'){
        validUser.accountStatus = 'Active';
        req.body.accountStatus = 'Active';
    }

    return next();
}

export const validPatchStaffAccount = (req, res, next) => {
    const id = parseInt(req.params.id);
    let validUser;

    bankadb.staffUserAccount.map((user) => {
        if (user.id === id) {
            validUser = user;

            req.body.validUser = validUser;
            req.body.fullName = validUser.fullName;
            req.body.accountType = validUser.accountType;
        }
    });

    if(!validUser){
        res.status(404).send({
            status: 'error', 
            message: 'User not found'
        });
    }

    if(validUser.accountStatus == 'Active'){
        validUser.accountStatus = 'Dormant';
        req.body.accountStatus = 'Dormant';

    }
    else if(validUser.accountStatus == 'Dormant'){
        validUser.accountStatus = 'Active';
        req.body.accountStatus = 'Active';
    }

    return next();
}

export const validupdateBankAccount = (req, res, next) => {
           
           const accountNumber = parseInt(req.params.accountNumber),
                 transactionType = req.params.transactionType;

           // let {fullName, accountEmail, accountType,totalCredit, totalDebit, oldBalance, newBalance, cashier, credit, debit} = req.body;

            req.body.amount = parseFloat(req.body.amount);
            req.body.transactionDate = new Date();
            req.body.newBalance = 0;
            const amount = req.body.amount; 
            
    

        if(isNaN(amount) || amount < 1 || isNaN(req.body.cashier)){
            
            return res.status(404).send({
                status: 'error', 
                message: 'All fields are required and must be valid'
            });
        }

        if(transactionType == 'credit'){
            req.body.credit = req.body.amount;
            req.body.totalCredit = req.body.credit;
            req.body.debit = 0;
            req.body.totalDebit = req.body.debit;
            req.body.oldBalance = req.body.newBalance;
            req.body.newBalance = req.body.totalCredit - req.body.totalDebit;
        }
        else if(transactionType == 'debit'){
                req.body.debit = req.body.amount;
                req.body.totalDebit = req.body.debit; 
                req.body.credit = 0;
                req.body.totalCredit = req.body.credit;       
                req.body.oldBalance = req.body.newBalance;
                req.body.newBalance = req.body.totalCredit - req.body.totalDebit;
        }else {
           return res.status(402).send({
                status: 'error', 
                message: 'Invalid transaction'
            });
        }
        
        
        return next();
}

// export const validUpdateSavingsAccount = (req, res, next) => {

//     const id = parseInt(req.params.id);
//         let validUser;

//         bankadb.savingsBankAccount.map((user) => {
//             if (user.id === id) {
//                 validUser = user;

//             req.body.fullName = validUser.fullName;
//             req.body.accountEmail = validUser.emailAddress;
//             req.body.id = validUser.id;
//             req.body.accountNumber = validUser.accountNumber;
//             req.body.accountType = validUser.accountType;
//             req.body.totalCredit = validUser.totalCredit;
//             req.body.totalDebit = validUser.totalDebit;
//             req.body.oldBalance = validUser.oldBalance;
//             req.body.newBalance = validUser.newBalance
//             }
//         });

//         if(!validUser){
//             res.status(404).send({
//                 status: 'error', 
//                 message: 'User not found'
//             });
//         }

//         if(!req.body.amount || req.body.amount < 1 || !req.body.transactionType || isNaN(req.body.cashier)){
//             res.status(404).send({
//                 status: 'error', 
//                 message: 'All fields are required'
//             });
//         }
        
//         if(req.body.transactionType == 'Credit'){
//             validUser.credit = parseFloat(req.body.amount);
//             validUser.totalCredit = validUser.totalCredit + validUser.credit;
//             validUser.debit = parseFloat(0);
//             validUser.totalDebit = validUser.totalDebit + validUser.debit;
//             validUser.oldBalance = validUser.newBalance;
//             validUser.newBalance = validUser.totalCredit - validUser.totalDebit;
//         }
//         else if(req.body.transactionType == 'Debit'){
//                 validUser.debit = parseFloat(req.body.amount);
//                 validUser.totalDebit = validUser.totalDebit + validUser.debit; 
//                 validUser.credit = parseFloat(0);
//                 validUser.totalCredit = validUser.totalCredit + validUser.credit;       
//                 validUser.oldBalance = validUser.newBalance;
//                 validUser.newBalance = validUser.totalCredit - validUser.totalDebit;
//         }
//         return next();
// }
