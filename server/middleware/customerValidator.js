 import bankadb from '../memorydb/bankadb';
 import { check, validationResult, body } from 'express-validator/check';
 import createToken from '../lib/token';

    export const validUserSignup = (req, res, next) => {

        function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
          }



        req.body.id = Math.floor(1111 + Math.random() * 1999); 
        req.body.accountType = 'Customer';
        req.body.token = createToken(req.body.token);
         
        if(!req.body.email || !req.body.firstName || !req.body.lastName || isNaN(req.body.phoneNumber) || !req.body.password || !req.body.confirmPassword || !validateEmail(req.body.email)){
            res.status(406).send({
                status: 'error', 
                message: 'All fields are required'
            });
        }
        else if(req.body.password !== req.body.confirmPassword){
            res.status(406).send({
                status: 'error', 
                message: 'Password mismatch'
            });
        }
        
         return next();
        
    };
        
    
  export  const validUserLogin = (req, res, next) => {
    
        const id = parseInt(req.params.id);
    
            let validUser;  
            
            bankadb.userSignup.map((user) => {
                if (user.id === id) {
                    validUser = user;
                    
                    req.body.id = validUser.id;
                    req.body.firstName = validUser.firstName;
                    req.body.lastName = validUser.lastName;
                    req.body.token = validUser.token;
                }
            });
    
            if(!validUser){ 
                res.status(404).send({
                    status: 'error', 
                    message: 'Invalid User'
                });   
            }
    
            if(req.body.email !== validUser.email || req.body.password !== validUser.password){
                res.status(404).send({
                    status: 'error', 
                    message: 'Invalid User'
                }); 
            }
            return next();
    };
    
   export const validBankAccount = (req, res, next) => {
    
        const id = parseInt(req.params.id);
    
            let validUser, err;
            
            bankadb.userSignup.map((user) => {
                if (user.id === id) {
                    validUser = user; 
                    
                    req.body.id = validUser.id;
                    req.body.fullName = `${validUser.firstName} ${validUser.lastName}`;
                    req.body.owner = validUser.id;
                    req.body.emailAddress = validUser.email;
                    req.body.phoneNumber = validUser.phoneNumber;
                }
            })
    
            if(!validUser){
                err = new Error('User not found');
                err.status = 404;
            }
    
            if(isNaN(req.body.bvnNumber) || !req.body.dateOfBirth || !req.body.residentialAddress || !req.body.meansOfIdentification || !req.body.idNumber || !req.body.occupation || !req.body.nextOfKin || req.body.relationshipToNextOfKin || !req.body.accountType || !req.body.sex ||!req.body.maritalStatus){
                res.status(406).send({
                    status: 'error', 
                    message: 'All fields are required'
                });
            }
        
            // if(req.body.accountType == 'Savings'){
            //     bankadb.savingsBankAccount.push(createBankAccount);
            // }
            // else if (req.body.accountType == 'Current'){
            //     bankadb.currentBankAccount.push(currentBankAccount);
            // }
            return next();
    };

    export const validAccountProfile = (req, res, next) => {

        const id = parseInt(req.params.id);

        let validUser;
        
        bankadb.accountProfile.map((user) => {
            if (user.id === id) {
                validUser = user; 
                
            req.body.id = validUser.id;
            req.body.accountNumber = validUser.accountNumber;
            req.body.accountType = validUser.accountType;
            req.body.createdOn = validUser.createdOn;
            req.body.accountOwner = validUser.fullName;
            req.body.currency = validUser.currency;
            req.body.accountStatus = validUser.accountStatus;
            req.body.totalCredit = validUser.totalCredit;
            req.body.totalDebit = validUser.totalDebit;
            req.body.accountBalance = validUser.newBalance;
            req.body.fullName = validUser.fullName
            }
        });

        if(!validUser){
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
    

