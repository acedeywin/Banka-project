import bankadb from '../memorydb/bankadb';

export const validSavingsAccounts = (req, res, next) => {

    const id = parseInt(req.params.id);

        let validUser;
        
        bankadb.savingsBankAccount.map((user) => {
            if (user.id === id) {
                validUser = user; 
                
                req.body.fullName = validUser.fullName;
                req.body.accountType = validUser.accountType;
                req.body.validUser = validUser;
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

export const validCurrentAccounts = (req, res, next) => {

    const id = parseInt(req.params.id);

        let validUser;
        
        bankadb.currentBankAccount.map((user) => {
            if (user.id === id) {
                validUser = user; 
                
                req.body.fullName = validUser.fullName;
                req.body.accountType = validUser.accountType;
                req.body.validUser = validUser;
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

export const validDeleteSavingsAccount = (req, res, next) => {

    const id = parseInt(req.params.id);
        let validUser;

        bankadb.savingsBankAccount.map((user, index) => {
            if (user.id === id) {
                validUser = user

                req.body.fullName = validUser.fullName;
                req.body.accountType = validUser.accountType;

                bankadb.savingsBankAccount.splice(index, 1);
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

export const validDeleteCurrentAccount = (req, res, next) => {

    const id = parseInt(req.params.id);
        let validUser;

        bankadb.currentBankAccount.map((user, index) => {
            if (user.id === id) {
                validUser = user

                req.body.fullName = validUser.fullName;
                req.body.accountType = validUser.accountType;

                bankadb.currentBankAccount.splice(index, 1);
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

export const validPatchSavingsAccount = (req, res, next) => {
    const id = parseInt(req.params.id);
    let validUser;

    bankadb.savingsBankAccount.map((user) => {
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

export const validPatchCurrentAccount = (req, res, next) => {

    const id = parseInt(req.params.id);
    let validUser;

    bankadb.currentBankAccount.map((user) => {
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

export const validAdminCreateAccount = (req, res, next) => {

    if(!req.body.firstName || !req.body.lastName || !req.body.userEmail || !req.body.userAccountType || !req.body.id || !req.body.password || !req.body.confirmPassword){
        res.status(406).send({
            status: 'error', 
            message: 'First name is required'
        });
    }
    else if(req.body.password !== req.body.confirmPassword){
        res.status(406).send({
            status: 'error', 
            message: 'Password mismatch'
        });
    }

    if(req.body.userAccountType == 'Staff'){
        req.body.isAdmin = false;
    }
    else if(req.body.userAccountType == 'Admin'){
        req.body.isAdmin = true;
    }
    return next();
}

 export const validAdminProfile = (req, res, next) => {

    const id = parseInt(req.params.id);

        let validUser;
        
        bankadb.adminUserAccount.map((user) => {
            if (user.id === id) {
                validUser = user;
                
            req.body.id = validUser.id;
            req.body.firstName = validUser.firstName;
            req.body.lastName = validUser.lastName;
            req.body.email = validUser.userEmail;
            req.body.accountType = validUser.accountType;
            req.body.createdOn = validUser.createdOn;
            req.body.accountStatus = validUser.accountStatus;
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

export const validStaffProfile = (req, res, next) => {

    const id = parseInt(req.params.id);

        let validUser;
        
        bankadb.adminUserAccount.map((user) => {
            if (user.id === id) {
                validUser = user;
                
            req.body.id = validUser.id;
            req.body.firstName = validUser.firstName;
            req.body.lastName = validUser.lastName;
            req.body.email = validUser.userEmail;
            req.body.accountType = validUser.accountType;
            req.body.createdOn = validUser.createdOn;
            req.body.accountStatus = validUser.accountStatus;
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

export const validUpdateCurrentAccount = (req, res, next) => {
    const id = parseInt(req.params.id);
        let validUser;

        bankadb.currentBankAccount.map((user) => {
            if (user.id === id) {
                validUser = user;

            req.body.fullName = validUser.fullName;
            req.body.accountEmail = validUser.emailAddress;
            req.body.id = validUser.id;
            req.body.accountNumber = validUser.accountNumber;
            req.body.accountType = validUser.accountType;
            req.body.totalCredit = validUser.totalCredit;
            req.body.totalDebit = validUser.totalDebit;
            req.body.oldBalance = validUser.oldBalance;
            req.body.newBalance = validUser.newBalance
            }
        });

        if(!validUser){
            res.status(404).send({
                status: 'error', 
                message: 'User not found'
            });
        }

        if(!req.body.amount || !req.body.transactionType || isNaN(req.body.cashier)){
            res.status(404).send({
                status: 'error', 
                message: 'All fields are required'
            });
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
        return next();
}

export const validUpdateSavingsAccount = (req, res, next) => {

    const id = parseInt(req.params.id);
        let validUser;

        bankadb.savingsBankAccount.map((user) => {
            if (user.id === id) {
                validUser = user;

            req.body.fullName = validUser.fullName;
            req.body.accountEmail = validUser.emailAddress;
            req.body.id = validUser.id;
            req.body.accountNumber = validUser.accountNumber;
            req.body.accountType = validUser.accountType;
            req.body.totalCredit = validUser.totalCredit;
            req.body.totalDebit = validUser.totalDebit;
            req.body.oldBalance = validUser.oldBalance;
            req.body.newBalance = validUser.newBalance
            }
        });

        if(!validUser){
            res.status(404).send({
                status: 'error', 
                message: 'User not found'
            });
        }

        if(!req.body.amount || !req.body.transactionType || isNaN(req.body.cashier)){
            res.status(404).send({
                status: 'error', 
                message: 'All fields are required'
            });
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
        return next();
}
