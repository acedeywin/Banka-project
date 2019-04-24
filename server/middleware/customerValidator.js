 import bankadb from '../memorydb/bankadb';
 //import pool from '../lib/connectdb';
 import createToken from '../lib/token';
 import {validateEmail, validateString} from '../lib/emailCheck';

    export const validUserSignup = (req, res, next) => {

        let {email, firstName, lastName, phoneNumber, password, confirmPassword} = req.body;

        req.body.id = Math.floor(1111 + Math.random() * 1999); 
        req.body.userAccount = 'Customer';
        req.body.token = createToken(req.body.token);
         
        if(!email || !firstName || !lastName || !password || !confirmPassword){
            return res.status(406).send({
                status: 'error', 
                message: 'All fields are required'
            });
        }
        else if(!validateEmail(email) || isNaN(phoneNumber) || !validateString(firstName) || !validateString(lastName) || firstName.length < 3 || lastName.length < 3){
            return res.status(406).send({
                status: 'error', 
                message: 'Invalid Input'
            });
        }
        else if(password !== confirmPassword){
            return res.status(406).send({
                status: 'error', 
                message: 'Password mismatch'
            });    
    }
    return next();  
}
        
    
  export  const validUserLogin = (req, res, next) => {

    let {email, password} = req.body;
    
            if(!email || !password){
                res.status(404).send({
                    status: 'error', 
                    message: 'Invalid User'
                }); 
            }
            return next();
    };
    
   export const validBankAccount = (req, res, next) => {

        let err = {};
    
        let {bvnNumber, dateOfBirth, residentialAddress, meansOfIdentification, idNumber, occupation, nextOfKin, relationshipToNextOfKin, accountType, sex, maritalStatus} = req.body; 

        req.body.accountNumber = Math.floor(1111111111 + Math.random() * 1999999999);
        req.body.accountStatus = 'Active';
        req.body.currency = 'NGN';
        req.body.createdOn = new Date();
        req.body.openingBalance =parseFloat(0);
        req.body.credit = parseFloat(0);
        req.body.debit = parseFloat(0);
        req.body.totalCredit = parseFloat(0);
        req.body.totalDebit = parseFloat(0);
        req.body.oldBalance = parseFloat(0);
        req.body.newBalance = parseFloat(0);
    
        if(isNaN(bvnNumber) || bvnNumber.length != 10){
             return res.status(406).send({
                status: 'error', 
                message: 'BVN number is required'
            });
        }
        else if(!dateOfBirth){
            return res.status(406).send({
                status: 'error', 
                message: 'Date of Birth is required'
            });
        }
        else if(!residentialAddress){
            return res.status(406).send({
                status: 'error', 
                message: 'Address is required'
            });
        }
        else if(!validateString(meansOfIdentification)){
            return res.status(406).send({
                status: 'error', 
                message: 'Identification is required'
            });
        }
        else if(!idNumber){
            return res.status(406).send({
                status: 'error', 
                message: 'ID number is required'
            });
        }
        else if(!validateString(occupation)){
            return res.status(406).send({
                status: 'error', 
                message: 'Occupation is required'
            });
        }
        else if(!validateString(nextOfKin)){
            return res.status(406).send({
                status: 'error', 
                message: 'Next of Kin is required'
            });
        }
        else if(!validateString(relationshipToNextOfKin)){
            return res.status(406).send({
                status: 'error', 
                message: 'State your relationship to your next Kin'
            });
        }
        else if(!validateString(accountType)){
            return res.status(406).send({
                status: 'error', 
                message: 'Choose a type is required'
            });
        }
        else if(!validateString(sex)){
            return res.status(406).send({
                status: 'error', 
                message: 'Sex is required'
            });
        }
        else if(!validateString(maritalStatus)){
             return res.status(406).send({
                status: 'error', 
                message: 'Marital Status is required'
            });
        }
                
        return next();
    };

    export const validAccountProfile = (req, res, next) => {

        const id = parseInt(req.params.id);

        if(!id){
            res.status(406).send({
                status: 'error', 
                message: 'User not found'
            });
        }
        return next();
    }

    export const validContactPage = (req, res, next) => {

        const id = parseInt(req.params.id);

        let validUser;
        
        bankadb.userSignup.map((user) => {
            if (user.id === id) {
                validUser = user;  
                
            req.body.id = validUser.id;
            req.body.fullName = validUser.fullName;
            req.body.email = validUser.emailAddress;
            }
        });

        if(!validUser){
            res.status(404).send({
                status: 'error', 
                message: 'User not found'
            });
        }

        if(!req.body.message){
            res.status(406).send({
                status: 'error', 
                message: 'Message is required'
            });
        }
        return next();
    }

    export const validTransactionHistory = (req, res, next) => {

        const id = parseInt(req.params.id);

        let validUser;
        
        bankadb.transactions.map((user) => {
            if (user.id === id) {
                validUser = user; 
                
                req.body.id = validUser.id;
                req.body.transactionDate = validUser.transactionDate;
                req.body.accountType = validUser.accountType;
                req.body.transactionType = validUser.transactionType;
                req.body.balance = validUser.newBalance;
                req.body.fullName = validUser.fullName
            }
        });

        if(!validUser){
            res.status(404).send({
                status: 'error', 
                message: 'No Transaction found'
            });
        }

        if(validUser.transactionType == 'Credit'){
            req.body.deposit = validUser.amount;
            req.body.withdrawal = 0;
        }
        else if(validUser.transactionType == 'Debit'){
            req.body.withdrawal = validUser.amount;
            req.body.deposit = 0;
        }
        return next();
    }
    

