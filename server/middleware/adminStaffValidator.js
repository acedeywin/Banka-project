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

export const validPatchBankAccount = (req, res, next) => {
    
    const accountNumber = parseInt(req.params.accountNumber),
          statusUpdate  = req.params.statusUpdate;

    if(statusUpdate == 'activate'){
        req.body.accountStatus = 'Active';
    }
    else if(statusUpdate == 'deactivate'){
        req.body.accountStatus = 'Dormant';
    }
    else{
        return res.status(200).json({
            success: 'error',
            message: 'Invalid Action'
        })
    }
    return next();
}

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

export const validPatchUserAccount = (req, res, next) => {
    
    const id = parseInt(req.params.id),
          statusUpdate  = req.params.statusUpdate;

    if(statusUpdate == 'activate'){
        req.body.accountStatus = 'Active';
    }
    else if(statusUpdate == 'deactivate'){
        req.body.accountStatus = 'Dormant';
    }
    else{
        return res.status(200).json({
            success: 'error',
            message: 'Invalid Action'
        })
    }
    return next();
}

export const validupdateBankAccount = (req, res, next) => {
           
           const accountNumber = parseInt(req.params.accountNumber),
                 transactionType = req.params.transactionType;

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


