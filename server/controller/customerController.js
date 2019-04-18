import bankadb from '../memorydb/bankadb';
import createToken from '../lib/token';

class CustomerController {

    //API for user(customer) signup
    postUserSignup(req, res){ 

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
            message: 'You have succesfully signed up',
            signup
            });
                  
    }

    //API for user(customer) login
    postUserLogin(req, res){

            const login = {
                id : req.body.id,
                email : req.body.email,
                password : req.body.password,
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                token : createToken(req.body.token)
            }
            bankadb.userLogin.push(login);
        
        res.status(200).send({
            success: true,
            message: 'Login Successful',
            login,
        });
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