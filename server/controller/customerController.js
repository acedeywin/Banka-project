import bankadb from '../memorydb/bankadb';
import createToken from '../lib/token';

class CustomerController {

    //API for user(customer) signup
    postUserSignup(req, res, next){
        if(!req.body.email){
            let err = new Error('A valid email is required');
            err.status = 406;
            return next(err);
        }
        else if(!req.body.firstName){
            let err = new Error('A valid First Name is required');
            err.status = 406;
            return next(err);
        }
        else if(!req.body.lastName){
            let err = new Error('A valid Last Name is required');
            err.status = 406;
            return next(err);
        }
        else if(isNaN(req.body.phoneNumber)){
            let err = new Error('Input a valid phone number');
            err.status = 406;
            return next(err);
        }
        else if(!req.body.password || !req.body.confirmPassword){
            let err = new Error('Enter a valid password');
            err.status = 406;
            return next(err);
        }
        else if(req.body.password !== req.body.confirmPassword){
            let err = new Error('Password mismatch');
            err.status = 406;
            return next(err);
        }

        const signup = {
            id : req.body.id = 1000 + bankadb.userSignup.length,
            email : req.body.email,
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            phoneNumber : parseInt(req.body.phoneNumber),
            password: req.body.password,
            confirmPassword : req.body.confirmPassword,
            accountType : 'Customer',
            token : createToken(req.body.token)
        };       

        bankadb.userSignup.push(signup);
        
        return res.status(200).send({
        success: true,
        message: 'You have succesfully signed up!',
        signup
        });           
    }

    //API for user(customer) login
    postUserLogin(req, res, next){

        const id = parseInt(req.params.id);

        let validUser,
            err = new Error('Invalid User');
            err.status = 404;
        
        bankadb.userSignup.map((user) => {
            if (user.id === id) {
                validUser = user;            
            }
        });

        if(!validUser){    
            return next(err);
        }

        if(req.body.email !== validUser.email){
            return next(err);
        }
        else if(req.body.password !== validUser.password){
                return next(err);
        }

        const login = {
            id : validUser.id,
            email : req.body.email,
            password : req.body.password,
            firstName : validUser.firstName,
            lastName : validUser.lastName,
            token : createToken(validUser.token)
        }
    
       bankadb.userLogin.push(login);
    
        res.status(200).send({
            success: true,
            message: 'Login Successful',
            login,
        });
    }

    //API for user(customer) to create a bank account
    postCreateBankAccount(req, res, next){

        const id = parseInt(req.params.id);

        let validUser;
        
        bankadb.userSignup.map((user) => {
            if (user.id === id) {
                validUser = user;    
            }
        })

        if(!validUser){
            let err = new Error('User not found');
            err.status = 404;
            return next(err);
        }

        if(isNaN(req.body.bvnNumber)){
            let err = new Error('Invalid BVN Number');
            err.status = 406;
            return next(err);
        }
        else if(!req.body.dateOfBirth){
            let err = new Error('Date of Birth is required');
            err.status = 406;
            return next(err);
        }
        else if(!req.body.residentialAddress){
            let err = new Error('Residential Address is required');
            err.status = 406;
            return next(err);
        }
        else if(!req.body.meansOfIdentification){
            let err = new Error('Means of Identification is required');
            err.status = 406;
            return next(err);
        }
        else if(!req.body.idNumber){
            let err = new Error('A valid Identification Number is required');
            err.status = 406;
            return next(err);
        }
        else if(!req.body.occupation){
            let err = new Error('Occupation is required');
            err.status = 406;
            return next(err);
        }
        else if(!req.body.nextOfKin){
            let err = new Error('Next of Kin is required');
            err.status = 406;
            return next(err);
        }
        else if(req.body.relationshipToNextOfKin){
            let err = new Error('Relationship to Next of Kin is required');
            err.status = 406;
            return next(err);
        }
        else if(!req.body.accountType){
            let err = new Error('Account Type is required');
            err.status = 406;
            return next(err);
        }
        else if(!req.body.sex){
            let err = new Error('Your Sex is required');
            err.status = 406;
            return next(err);
        }
        else if(!req.body.maritalStatus) {
            let err = new Error('Marital Status is required');
            err.status = 406;
            return next(err);
        }

        const createBankAccount = {
            id : validUser.id,
            accountNumber : Math.floor(1111111111 + Math.random() * 1999999999),
            fullName :  `${validUser.firstName} ${validUser.lastName}`,
            owner: validUser.id,
            bvnNumber : parseInt(req.body.bvnNumber),
            dateOfBirth : req.body.dateOfBirth,
            residentialAddress : req.body.residentialAddress,
            meansOfIdentification : req.body.meansOfIdentification,
            idNumber : parseInt(req.body.idNumber),
            emailAddress : validUser.email,
            occupation : req.body.occupation,
            nextOfKin : req.body.nextOfKin,
            relationshipToNextOfKin : req.body.relationshipToNextOfKin,
            phoneNumber : validUser.phoneNumber,
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

        if(req.body.accountType == 'Savings'){
            bankadb.savingsBankAccount.push(createBankAccount)
        }
        else if (req.body.accountType == 'Current'){
            bankadb.currentBankAccount.push(createBankAccount)
        }else{
            let err = new Error('Account Type not defined');
            err.status = 406;
            return next(err);
        }

        bankadb.accountProfile.push(createBankAccount);
    
        res.status(200).send({
            success: true,
            message: 'Account Created Successful',
            createBankAccount
        });
    }

    //API for user(customer) account profile
    getAccountProfile(req, res, next){

        const id = parseInt(req.params.id);

        let validUser;
        
        bankadb.accountProfile.map((user) => {
            if (user.id === id) {
                validUser = user;    
            }
        });

        if(!validUser){
            let err = new Error('User not found');
            err.status = 404;
            return next(err);
        }

        const accountProfile = {
            id : validUser.id,
            accountNumber : validUser.accountNumber,
            accountType : validUser.accountType,
            createdOn : validUser.createdOn,
            accountOwner : validUser.fullName,
            currency : validUser.currency,
            accountStatus : validUser.accountStatus,
            totalCredit : validUser.totalCredit,
            totalDebit : validUser.totalDebit,
            accountBalance : validUser.newBalance
        };

        bankadb.userProfile.push(accountProfile);

        res.status(200).send({
            success: true,
            message: `${validUser.fullName} Account Profile`,
            accountProfile
        });
    }

    //API for user(customer) contact page
    postContactPage(req, res, next){

        const id = parseInt(req.params.id);

        let validUser;
        
        bankadb.userSignup.map((user) => {
            if (user.id === id) {
                validUser = user;    
            }
        });

        if(!validUser){
            let err = new Error('User not found');
            err.status = 404;
            return next(err);
        }

        if(!req.body.message){
            let err = new Error('Message is required');
            err.status = 406;
            return next(err);
        }

        const contact = {
            id : validUser.id,
            fullName : validUser.fullName,
            email : validUser.emailAddress,
            message : req.body.message
        };

        bankadb.contactMessage.push(contact);

        res.status(200).send({
            success: true,
            message: 'Message successfully sent!',
            contact
        });
    }

    getTransactionHistory(req, res, next){

        const id = parseInt(req.params.id);

        let validUser;
        
        bankadb.transactions.map((user) => {
            if (user.id === id) {
                validUser = user;    
            }
        });

        if(!validUser){
            let err = new Error('No Transaction found');
            err.status = 404;
            return next(err);
        }

        if(validUser.transactionType == 'Credit'){
            req.body.deposit = validUser.amount;
            req.body.withdrawal = 0;
        }
        else if(validUser.transactionType == 'Debit'){
            req.body.withdrawal = validUser.amount;
            req.body.deposit = 0;
        }

        const transactionHistory = {
            id : validUser.id,
            transactionDate : validUser.transactionDate,
            accountType : validUser.accountType,
            transactionType : validUser.transactionType,
            deposit : req.body.deposit,
            withdrawal : req.body.withdrawal,
            balance : validUser.newBalance
        };


        bankadb.history.push(transactionHistory);

        res.status(200).send({
            success: true,
            message: `Transaction History for ${validUser.fullName}`,
            transactionHistory
        });

    }
}

const customerController = new CustomerController();
export default customerController;