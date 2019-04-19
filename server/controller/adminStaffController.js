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
            accountProfile : bankadb.accountProfile,
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
    getSavingsAccounts(req, res){
        
        return res.status(200).send({
            success: true,
            message: `${req.body.fullName}'s ${req.body.accountType} Account Profile`,
            validUser: req.body.validUser
        });
    }

    //API for viewing a specific current account
    getCurrentAccounts(req, res){
        
        res.status(200).send({
            success: true,
            message: `${req.body.fullName}'s ${req.body.accountType} Account Profile`,
            validUser: req.body.validUser
        });
    }

    //API for deleting a savings account
    deleteSavingsAccount(req, res){
        
            res.status(200).send({
                success: true,
                message: `${req.body.fullName}'s ${req.body.accountType} Account has been Successfully Deleted`
            });
          
    }

    //API for deleting a current account
    deleteCurrentAccount(req, res, next){
          
        res.status(200).send({
            success: true,
            message: `${req.body.fullName}'s ${req.body.accountType} Account has been Successfully Deleted`
        });
    }

    //API for activating/deactivating a savings account
    patchSavingsAccount(req, res){
         
        res.status(200).send({
            success: true,
            message: `${req.body.fullName}'s ${req.body.accountType} Account is now ${req.body.accountStatus}`,
            validUser: req.body.validUser
        });
    }

    //API for activating/deactivating a current account
    patchCurrentAccount(req, res, next){
        res.status(200).send({
            success: true,
            message: `${req.body.fullName}'s ${req.body.accountType} Account is now ${req.body.accountStatus}`,
            validUser: req.body.validUser
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
    
        req.body.userAccountType == 'Staff' ? bankadb.staffUserAccount.push(createUserAccount) : req.body.userAccountType == 'Admin' ? bankadb.adminUserAccount.push(createUserAccount) : undefined;
        
    
        return res.status(200).send({
            success: true,
            message: `${req.body.firstName} ${req.body.lastName}'s ${req.body.userAccountType} Account has been Created Successfully`,
            createUserAccount
        });
    }

    //API for user(admin) account profile
    getAdminProfile(req, res){

        const adminProfile = {
            id : req.body.id,
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.userEmail,
            accountType : req.body.accountType,
            createdOn : req.body.createdOn,
            accountStatus : req.body.accountStatus,
        };

        bankadb.adminProfile.push(adminProfile);

        return res.status(200).send({
            success: true,
            message: `${req.body.accountType} Account Profile`,
            adminProfile
        });
    }

    //API for user(admin) account profile
    getStaffProfile(req, res){

        const adminProfile = {
            id : req.body.id,
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.userEmail,
            accountType : req.body.accountType,
            createdOn : req.body.createdOn,
            accountStatus : req.body.accountStatus,
        };

        bankadb.adminProfile.push(adminProfile);

        return res.status(200).send({
            success: true,
            message: `${req.body.accountType} Account Profile`,
            staffProfile
        });
    }

        //API for admin login
        postAdminLogin(req, res){
    
            const login = {
                id : req.body.id,
                email : req.body.email,
                password : req.body.password,
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                token : req.body.token
            }
        
           bankadb.adminLogin.push(login);
        
            res.status(200).send({
                success: true,
                message: 'Login Successful',
                login
            });
        }

        //API for staff login
        postStaffLogin(req, res){

            const login = {
                id : req.body.id,
                email : req.body.email,
                password : req.body.password,
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                token : req.body.token
            }
        
           bankadb.staffLogin.push(login);
        
            res.status(200).send({
                success: true,
                message: 'Login Successful',
                login
            });
        }

    //API for deleting an admin account
    deleteAdminAccount(req, res){
        
            res.status(200).send({
                success: true,
                message: `${req.body.firstName} ${req.body.lastName}'s ${req.body.userAccountType} Account has been Successfully Deleted`
            });
        
    }

    //API for deleting a staff account
    deleteStaffAccount(req, res, next){
        res.status(200).send({
            success: true,
            message: `${req.body.firstName} ${req.body.lastName}'s ${req.body.userAccountType} Account has been Successfully Deleted`
        });
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
