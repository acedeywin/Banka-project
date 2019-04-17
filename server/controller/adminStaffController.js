import bankadb from '../memorydb/bankadb';
import createToken from '../lib/token';

class AdminStaffController{

    //API for viewing all bank/user accounts
    getAllUserAccount(req, res){
        res.status(200).send({
            success: true,
            message: 'All Accounts',
            signupCustomer : bankadb.userSignup,
            savingsBankAccount: bankadb.savingsBankAccount,
            currentBankAccount : bankadb.currentBankAccount,
            adminAccount : bankadb.adminUserAccount,
            staffAccount : bankadb.staffUserAccount,
            transactions : bankadb.transactions
        });
    }

    //API for viewing all savings bank accounts
    getAllSavingsAccounts(req, res){
        res.status(200).send({
            success: true,
            message: 'Savings Bank Accounts',
            savingsBankAccount: bankadb.savingsBankAccount
        });
    }

    //API for viewing all current bank accounts
    getAllCurrentAccounts(req, res){
        res.status(200).send({
            success: true,
            message: 'Current Bank Accounts',
            currentBankAccount : bankadb.currentBankAccount
        });
    }

    //API for viewing a specific savings account
    getSavingsAccounts(req, res, next){
        const id = parseInt(req.params.id);

        let validUser;
        
        bankadb.savingsBankAccount.map((user) => {
            if (user.id === id) {
                validUser = user;    
            }
        });

        if(!validUser){
            let err = new Error('User not found');
            err.status = 404;
            return next(err);
        }

        return res.status(200).send({
            success: true,
            message: `${validUser.fullName}'s ${validUser.accountType} Account Profile`,
            validUser
        });
    }

    //API for viewing a specific current account
    getCurrentAccounts(req, res, next){
        const id = parseInt(req.params.id);
        let validUser;
        
        bankadb.currentBankAccount.map((user) => {
            if (user.id === id) {
                validUser = user;    
            }
        });

        if(!validUser){
            let err = new Error('User not found');
            err.status = 404;
            return next(err);
        }

        res.status(200).send({
            success: true,
            message: `${validUser.fullName}'s ${validUser.accountType} Account Profile`,
            validUser
        });
    }

    //API for deleting a savings account
    deleteSavingsAccount(req, res, next){
        const id = parseInt(req.params.id);
        let validUser;

        bankadb.savingsBankAccount.map((user, index) => {
            if (user.id === id) {
                validUser = user
                bankadb.savingsBankAccount.splice(index, 1);
            }
        });

        if(validUser){
            res.status(200).send({
                success: true,
                message: `${validUser.fullName}'s ${validUser.accountType} Account has been Successfully Deleted`
            });
        }else{
            let err = new Error('User not found');
            err.status = 404;
            return next(err);
        }   
    }

    //API for deleting a current account
    deleteCurrentAccount(req, res, next){
        const id = parseInt(req.params.id);
        let validUser;

        bankadb.currentBankAccount.map((user, index) => {
            if (user.id === id) {
                validUser = user
                bankadb.currentBankAccount.splice(index, 1);
            }
        });

        if(validUser){
            res.status(200).send({
                success: true,
                message: `${validUser.fullName}'s ${validUser.accountType} Account has been Successfully Deleted`
            });
        }else{
            let err = new Error('User not found');
            err.status = 404;
            return next(err);
        }   
    }

    //API for activating/deactivating a savings account
    patchSavingsAccount(req, res, next){
        const id = parseInt(req.params.id);
        let validUser;

        bankadb.savingsBankAccount.map((user) => {
            if (user.id === id) {
                validUser = user;
            }
        });

        if(!validUser){
            let err = new Error('User not found');
            err.status = 404;
            return next(err);
        }

        if(validUser.accountStatus == 'Active'){
            validUser.accountStatus = 'Dormant';
            
        }
        else if(validUser.accountStatus == 'Dormant'){
            validUser.accountStatus = 'Active';
        }
        
        res.status(200).send({
            success: true,
            message: `${validUser.fullName}'s ${validUser.accountType} Account is now ${validUser.accountStatus}`,
            validUser
        });
    }

    //API for activating/deactivating a current account
    patchCurrentAccount(req, res, next){
        const id = parseInt(req.params.id);
        let validUser;

        bankadb.currentBankAccount.map((user) => {
            if (user.id === id) {
                validUser = user;
            }
        });
        if(!validUser){
            let err = new Error('User not found');
            err.status = 404;
            return next(err);
        }

        if(validUser.accountStatus == 'Active'){
            validUser.accountStatus = 'Dormant';
            
        }
        else if(validUser.accountStatus == 'Dormant'){
            validUser.accountStatus = 'Active';
        }
        
        res.status(200).send({
            success: true,
            message: `${validUser.fullName}'s ${validUser.accountType} Account is now ${validUser.accountStatus}`,
            validUser
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
    postAdminCreateAccount(req, res, next){
        if(!req.body.firstName){
            let err = new Error('First name is required');
            err.status = 406;
            return next(err);
        }
        else if(!req.body.lastName){
            let err = new Error('Last name is required');
            err.status = 406;
            return next(err);
        }
        else if(!req.body.userEmail){
            let err = new Error('User email is required');
            err.status = 406;
            return next(err);
        }
        else if(!req.body.userAccountType){
            let err = new Error('Please select a type of user account');
            err.status = 406;
            return next(err);
        }
        else if(!req.body.id){
            let err = new Error('User ID is required');
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

        const createUserAccount = {
            id : parseInt(req.body.id),
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            userEmail : req.body.userEmail,
            password : req.body.password,
            confirmPassword : req.body.confirmPassword,
            userAccountType : req.body.userAccountType,
            accountStatus : 'Active',
            createdOn : new Date(),
            isAdmin : req.body.isAdmin,
            token : createToken(req.body.token)
        }  
    
        if(req.body.userAccountType == 'Staff'){
            req.body.isAdmin = false;
            bankadb.staffUserAccount.push(createUserAccount);
        }
        else if(req.body.userAccountType == 'Admin'){
            req.body.isAdmin = true;
            bankadb.adminUserAccount.push(createUserAccount)
        }else{
            let err = new Error('Account type not defined');
            err.status = 406;
            return next(err);
        }
    
        return res.status(200).send({
            success: true,
            message: `${req.body.firstName} ${req.body.lastName}'s ${req.body.userAccountType} Account has been Created Successfully`,
            createUserAccount
        });
    }

    //API for user(admin) account profile
    getAdminProfile(req, res, next){

        const id = parseInt(req.params.id);

        let validUser;
        
        bankadb.adminUserAccount.map((user) => {
            if (user.id === id) {
                validUser = user;    
            }
        });

        if(!validUser){
            let err = new Error('User not found');
            err.status = 404;
            return next(err);
        }

        const adminProfile = {
            id : validUser.id,
            firstName : validUser.firstName,
            lastName : validUser.lastName,
            email : validUser.userEmail,
            accountType : validUser.accountType,
            createdOn : validUser.createdOn,
            accountStatus : validUser.accountStatus,
        };

        bankadb.adminProfile.push(adminProfile);

        return res.status(200).send({
            success: true,
            message: `${validUser.accountType} Account Profile`,
            adminProfile
        });
    }

    //API for user(admin) account profile
    getStaffProfile(req, res, next){

        const id = parseInt(req.params.id);

        let validUser;
        
        bankadb.staffUserAccount.map((user) => {
            if (user.id === id) {
                validUser = user;    
            }
        });

        if(!validUser){
            let err = new Error('User not found');
            err.status = 404;
            return next(err);
        }

        const staffProfile = {
            id : validUser.id,
            firstName : validUser.firstName,
            lastName : validUser.lastName,
            email : validUser.userEmail,
            accountType : validUser.accountType,
            createdOn : validUser.createdOn,
            accountStatus : validUser.accountStatus,
        };

        bankadb.staffProfile.push(staffProfile);

        res.status(200).send({
            success: true,
            message: `${validUser.accountType} Account Profile`,
            staffProfile
        });
    }

        //API for admin login
        postAdminLogin(req, res, next){

            const id = parseInt(req.params.id);
    
            let validUser,
                err = new Error('Invalid User');
                err.status = 404;
            
            bankadb.adminUserAccount.map((user) => {
                if (user.id === id) {
                    validUser = user;            
                }
            });
    
            if(!validUser){   
                return next(err);
            }
    
            if(req.body.email !== validUser.userEmail){
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
        
           bankadb.adminLogin.push(login);
        
            res.status(200).send({
                success: true,
                message: 'Login Successful',
                login
            });
        }

        //API for staff login
        postStaffLogin(req, res, next){

            const id = parseInt(req.params.id);
    
            let validUser,
                err = new Error('Invalid User');
                err.status = 404;
            
            bankadb.staffUserAccount.map((user) => {
                if (user.id === id) {
                    validUser = user;            
                }
            });
    
            if(!validUser){
                return next(err);
            }
    
            if(req.body.email !== validUser.userEmail){
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
        
           bankadb.staffLogin.push(login);
        
            res.status(200).send({
                success: true,
                message: 'Login Successful',
                login
            });
        }

    //API for deleting an admin account
    deleteAdminAccount(req, res, next){
        const id = parseInt(req.params.id);
        let validUser;

        bankadb.adminUserAccount.map((user, index) => {
            if (user.id === id) {
                validUser = user
                bankadb.adminUserAccount.splice(index, 1);
            }
        });

        if(validUser){
            res.status(200).send({
                success: true,
                message: `${validUser.firstName} ${validUser.lastName}'s ${validUser.userAccountType} Account has been Successfully Deleted`
            });
        }else{
            let err = new Error('User not found');
            err.status = 404;
            return next(err);
        }
    }

    //API for deleting a staff account
    deleteStaffAccount(req, res, next){
        const id = parseInt(req.params.id);
        let validUser;

        bankadb.staffUserAccount.map((user, index) => {
            if (user.id === id) {
                validUser = user
                bankadb.staffUserAccount.splice(index, 1);
            }
        });

        if(validUser){
            res.status(200).send({
                success: true,
                message: `${validUser.firstName} ${validUser.lastName}'s ${validUser.userAccountType} Account has been Successfully Deleted`
            });
        }else{
            let err = new Error('User not found');
            err.status = 404;
            return next(err);
        }
    }

    //API for activating/deactivating admin account
    patchAdminAccount(req, res, next){
        const id = parseInt(req.params.id);
        let validUser;

        bankadb.adminUserAccount.map((user) => {
            if (user.id === id) {
                validUser = user;
            }
        });
        if(!validUser){
            let err = new Error('User not found');
            err.status = 404;
            return next(err);
        }

        if(validUser.accountStatus == 'Active'){
            validUser.accountStatus = 'Dormant';
            
        }
        else if(validUser.accountStatus == 'Dormant'){
            validUser.accountStatus = 'Active';
        }
        
        res.status(200).send({
            success: true,
            message: `${validUser.fullName}'s ${validUser.accountType} Account is now ${validUser.accountStatus}`,
            validUser
        });
    }

    //API for activating/deactivating current accounts
    patchStaffAccount(req, res, next){
        const id = parseInt(req.params.id);
        let validUser;

        bankadb.staffUserAccount.map((user) => {
            if (user.id === id) {
                validUser = user;
            }
        });
        if(!validUser){
            let err = new Error('User not found');
            err.status = 404;
            return next(err);
        }

        if(validUser.accountStatus == 'Active'){
            validUser.accountStatus = 'Dormant';
            
        }
        else if(validUser.accountStatus == 'Dormant'){
            validUser.accountStatus = 'Active';
        }
        
        res.status(200).send({
            success: true,
            message: `${validUser.fullName}'s ${validUser.accountType} Account is now ${validUser.accountStatus}`,
            validUser
        });
    }

    //API for staff to credit/debit a current account
    updateCurrentAccount(req, res, next){
        const id = parseInt(req.params.id);
        let validUser;

        bankadb.currentBankAccount.map((user) => {
            if (user.id === id) {
                validUser = user;
            }
        });
        if(!validUser){
            let err = new Error('User not found');
            err.status = 404;
            return next(err);
        }

        if(!req.body.amount){
            let err = new Error('Amount is required');
            err.status = 406;
            return next(err);
        }
        else if(!req.body.transactionType){
            let err = new Error('Pick a Transaction Type');
            err.status = 406;
            return next(err);
        }
        else if(!req.body.staffId){
            let err = new Error('Staff ID is required');
            err.status = 406;
            return next(err);
        }

        if(req.body.transactionType == 'Credit'){
            validUser.credit = parseFloat(req.body.amount);
            validUser.totalCredit = validUser.totalCredit + validUser.credit;
            validUser.debit = parseFloat(0);
            validUser.totalDebit = validUser.totalDebit + validUser.debit;
            validUser.oldBalance = validUser.newBalance;
            validUser.newBalance = validUser.totalCredit - validUser.totalDebit;
        }
        else if(req.body.transactionType == 'Debit'){
                validUser.debit = parseFloat(req.body.amount);
                validUser.totalDebit = validUser.totalDebit + validUser.debit; 
                validUser.credit = parseFloat(0);
                validUser.totalCredit = validUser.totalCredit + validUser.credit;       
                validUser.oldBalance = validUser.newBalance;
                validUser.newBalance = validUser.totalCredit - validUser.totalDebit;
        }

        const accountTransactions = {
            fullName : validUser.fullName,
            accountEmail : validUser.emailAddress,
            id : validUser.id,
            accountNumber : validUser.accountNumber,
            amount : parseFloat(req.body.amount),
            accountType : validUser.accountType,
            transactionDate : new Date(),
            cashier : parseInt(req.body.cashier),
            transactionType : req.body.transactionType,
            totalCredit : validUser.totalCredit.toString(),
            totalDebit : validUser.totalDebit.toString(),
            oldBalance : validUser.oldBalance.toString(),
            newBalance : validUser.newBalance.toString()
        }    
    
        bankadb.transactions.push(accountTransactions);
    
        res.status(200).send({
            success: true,
            message: `Account Number ${validUser.accountNumber} has been successfully ${req.body.transactionType}ed with NGN${req.body.amount}`,
            accountTransactions
        });
    }

    //API for staff to credit/debit savings accounts
    updateSavingsAccount(req, res, next){
        const id = parseInt(req.params.id);
        let validUser;

        bankadb.savingsBankAccount.map((user) => {
            if (user.id === id) {
                validUser = user;
            }
        });
        if(!validUser){
            let err = new Error('User not found');
            err.status = 404;
            return next(err);
        }

        if(!req.body.amount){
            let err = new Error('Amount is required');
            err.status = 406;
            return next(err);
        }
        else if(!req.body.transactionType){
            let err = new Error('Pick a Transaction Type');
            err.status = 406;
            return next(err);
        }
        
        else if(!req.body.staffId){
            let err = new Error('Staff ID is required');
            err.status = 406;
            return next(err);
        }

        if(req.body.transactionType == 'Credit'){
            validUser.credit = parseFloat(req.body.amount);
            validUser.totalCredit = validUser.totalCredit + validUser.credit;
            validUser.debit = parseFloat(0);
            validUser.totalDebit = validUser.totalDebit + validUser.debit;
            validUser.oldBalance = validUser.newBalance;
            validUser.newBalance = validUser.totalCredit - validUser.totalDebit;
        }
        else if(req.body.transactionType == 'Debit'){
                validUser.debit = parseFloat(req.body.amount);
                validUser.totalDebit = validUser.totalDebit + validUser.debit; 
                validUser.credit = parseFloat(0);
                validUser.totalCredit = validUser.totalCredit + validUser.credit;       
                validUser.oldBalance = validUser.newBalance;
                validUser.newBalance = validUser.totalCredit - validUser.totalDebit;
        }

        const accountTransactions = {
            fullName : validUser.fullName,
            accountEmail : validUser.emailAddress,
            id : validUser.id,
            accountNumber : validUser.accountNumber,
            amount : parseFloat(req.body.amount),
            accountType : validUser.accountType,
            transactionDate : new Date(),
            cashier : parseInt(req.body.cashier),
            transactionType : req.body.transactionType,
            totalCredit : validUser.totalCredit.toString(),
            totalDebit : validUser.totalDebit.toString(),
            oldBalance : validUser.oldBalance.toString(),
            newBalance : validUser.newBalance.toString()
        }
        
    
        bankadb.transactions.push(accountTransactions);
    
        res.status(200).send({
            success: true,
            message: `Account Number ${validUser.accountNumber} has been successfully ${req.body.transactionType}ed with NGN${req.body.amount}`,
            accountTransactions
        });
    }
}

const adminStaffController = new AdminStaffController();
export default adminStaffController;
