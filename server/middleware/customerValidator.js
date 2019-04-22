 import bankadb from '../memorydb/bankadb';
 import pool from '../lib/connectdb';
 import createToken from '../lib/token';
 //import validate from '../lib/emailCheck';

    export const validUserSignup = (req, res, next) => {

        let {id, email, firstName, lastName, phoneNumber, password, confirmPassword, accountType, token} = req.body;

        id = Math.floor(1111 + Math.random() * 1999); 
        accountType = 'Customer';
        token = createToken(token);
        
        //email = validate(email);

        pool.query('INSERT INTO signup (id, email, first_name, last_name, phone_number, _password, confirm_password, account_type, token) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [id, email, firstName, lastName, phoneNumber, password, confirmPassword, accountType, token], (error, results) => {
            if (error) {
                res.status(406).send({
                    status: 'error', 
                    message: error
                }); 
            }
        });
         
<<<<<<< HEAD
        if(!email || !firstName || !lastName || isNaN(phoneNumber) || !password || !confirmPassword /*|| !validate(email)*/){
=======
        if(!req.body.email || !req.body.firstName || !req.body.lastName || !req.body.password || !req.body.confirmPassword){
>>>>>>> c6c876b65fe424e46ba272b97e9b2aeccf8650ae
            res.status(406).send({
                status: 'error', 
                message: 'All fields are required'
            });
        }
<<<<<<< HEAD
        else if(password !== confirmPassword){
=======
        else if(!validateEmail(req.body.email || isNaN(req.body.phoneNumber))){
            res.status(406).send({
                status: 'error', 
                message: 'Invalid Input'
            });
        }
        else if(req.body.password !== req.body.confirmPassword){
>>>>>>> c6c876b65fe424e46ba272b97e9b2aeccf8650ae
            res.status(406).send({
                status: 'error', 
                message: 'Password mismatch'
            });   
         return next();   
    };
}
        
    
  export  const validUserLogin = (req, res, next) => {

    let {email, password, firstName, lastName, token} = req.body;
    
<<<<<<< HEAD
    //const id = parseInt(req.params.id);
    
        pool.query('SELECT email, _password, first_name, last_name, token FROM signup WHERE id = $1', [id], (error, results) => {
            if (error) {
                res.status(406).send({
                    status: 'error', 
                    message: error
                }); 
            }
            else if(results.length > 0){
                if(results[0].password == password){
                    res.status(200).send({
                        success: true,
                        message: "login sucessfull"
                          });
                }else{
                    res.status(406).send({
                        status: 'error', 
                        message: 'Invalid password'
                    });
                }
            }
        });
    
            if(!email || !password){
=======
            if(!req.body.email || !req.body.password){
>>>>>>> c6c876b65fe424e46ba272b97e9b2aeccf8650ae
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
                res.status(404).send({
                    status: 'error', 
                    message: 'User not found'
                });
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
    

