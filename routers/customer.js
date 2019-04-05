const express = require('express');
const router = express.Router();
const bankadb = require('../memorydb/bankadb');

//Route paths start with api/v1

//Signup API
router.post('/signup', (req, res, next) => {

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
        id : 1000 + bankadb.userSignup.length,
        email : req.body.email,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        phoneNumber : parseInt(req.body.phoneNumber),
        password: req.body.password,
        confirmPassword : req.body.confirmPassword,
        token : '45erkjherht45495783',
        type : req.body.type = 'customer',
        };       

    bankadb.userSignup.push(signup);
    
    return res.status(200).send({
    success: true,
    message: 'You have succesfully signed up!',
    signup
    });            
});

//Login API
router.post('/login/:id', (req, res, next) => {

    const id = parseInt(req.params.id, 10);

    let validUser;
    
    bankadb.userSignup.map((user) => {
        if (user.id === id) {
            validUser = user;
            
        };
    });

    if(!validUser){
        var err = new Error('User not found');
        err.status = 404;
        return next(err);
    }

    if(req.body.email !== validUser.email){
        let err = new Error('A valid email is required');
        err.status = 406;
        return next(err);
    }
    else if(req.body.password !== validUser.password){
            let err = new Error('A valid password is required');
            err.status = 406;
            return next(err);
    }
    
    const login = {
        id : validUser.id,
        email : req.body.email,
        password : req.body.password,
        firstName : validUser.firstName,
        lastName : validUser.lastName,
        token : validUser.token
    }

   bankadb.userLogin.push(login);

    res.status(200).send({
        success: true,
        message: 'Login Successful',
        login
    });
});

//API for customer to create bank account
router.post('/create-bank-account/:id', (req, res, next) => {

    const id = parseInt(req.params.id, 10);

    let validUser;
    
    bankadb.userSignup.map((user) => {
        if (user.id === id) {
            validUser = user;    
        };
    });

    if(!validUser){
        var err = new Error('User not found');
        err.status = 404;
        return next(err);
    }

    if(isNaN(req.body.bvnNumber)){
        var err = new Error('Invalid BVN Number');
        err.status = 406;
        return next(err);
    }
    else if(!req.body.residentialAddress){
        var err = new Error('Residential Address is required');
        err.status = 406;
        return next(err);
    }
    else if(!req.body.meansOfIdentification){
        var err = new Error('Means of Identification is required');
        err.status = 406;
        return next(err);
    }
    else if(!req.body.occupation){
        var err = new Error('Occupation is required');
        err.status = 406;
        return next(err);
    }
    else if(!req.body.nextOfKin){
        var err = new Error('Next of Kin is required');
        err.status = 406;
        return next(err);
    }
    else if(isNaN(req.body.idNumber)){
        var err = new Error('A valid Identification Number is required');
        err.status = 406;
        return next(err);
    }
    else if(!req.body.accountType){
        var err = new Error('Account Type is required');
        err.status = 406;
        return next(err);
    }
    else if(!req.body.sex){
        var err = new Error('Your Sex is required');
        err.status = 406;
        return next(err);
    }
    else if(!req.body.maritalStatus) {
        var err = new Error('Marital Status is required');
        err.status = 406;
        return next(err);
    }

    const createBankAccount = {
        id : validUser.id,
        accountNumber : Math.floor(1111111111 + Math.random() * 1999999999),
        fullName :  `${validUser.firstName} ${validUser.lastName}`,
        owner: validUser.id,
        bvnNumber : parseInt(req.body.bvnNumber),
        createdOn : new Date(),
        residentialAddress : req.body.residentialAddress,
        meansOfIdentification : req.body.meansOfIdentification,
        emailAddress : validUser.email,
        occupation : req.body.occupation,
        nextOfKin : req.body.nextOfKin,
        idNumber : parseInt(req.body.idNumber),
        phoneNumber : validUser.phoneNumber,
        accountType : req.body.accountType,
        accountStatus : req.body.accountStatus = 'Active',
        sex: req.body.sex,
        maritalStatus : req.body.maritalStatus,
        currency : req.body.currency = 'NGN',
        totalCredit : req.body.totalCredit = 0,
        totalDebit : req.body.totalDebit = 0,
        openingBalance : parseFloat(req.body.balance = 0000)
    };

    bankadb.userBankAccount.push(createBankAccount);

    res.status(200).send({
        success: true,
        message: 'Account Created Successful',
        createBankAccount
    });
});

//Account profile API
router.get('/account-profile/:id', (req, res, next) => {

    const id = parseInt(req.params.id, 10);

    let validUser;
    
    bankadb.userBankAccount.map((user) => {
        if (user.id === id) {
            validUser = user;    
        };
    });

    if(!validUser){
        var err = new Error('User not found');
        err.status = 404;
        return next(err);
    }

    res.status(200).send({
        success: true,
        message: 'Account Profile',
        validUser
    })
});

//Contact form API
router.post('/contact/:id', (req, res, next) => {
    const id = parseInt(req.params.id, 10);

    let validUser;
    
    bankadb.userBankAccount.map((user) => {
        if (user.id === id) {
            validUser = user;    
        };
    });

    if(!validUser){
        var err = new Error('User not found');
        err.status = 404;
        return next(err);
    }

    if(!req.body.message){
        var err = new Error('Message is required');
        err.status = 406;
        return next(err);
    }

    const contact = {
        fullName : validUser.fullName,
        email : validUser.emailAddress,
        message : req.body.message
    };

    bankadb.contactMessage.push(contact);

    res.status(200).send({
        success: true,
        message: 'Message successfully sent!',
        contact
    })
})

module.exports = router;
