import bankadb from '../memorydb/bankadb';

const validSavingsAccounts = (req, res, next) => {

    const id = parseInt(req.params.id);

        let validUser, err;
        
        bankadb.savingsBankAccount.map((user) => {
            if (user.id === id) {
                validUser = user; 
                
                req.body.fullName = validUser.fullName;
                req.body.accountType = validUser.accountType;
                req.body.validUser = validUser;
            }
        });

        if(!validUser){
            err = new Error('User not found');
            err.status = 404;
        }

        res.status(406).send({
            message: next(err)
            });
}

const validCurrentAccounts = (req, res, next) => {

    const id = parseInt(req.params.id);

        let validUser, err;
        
        bankadb.currentBankAccount.map((user) => {
            if (user.id === id) {
                validUser = user; 
                
                req.body.fullName = validUser.fullName;
                req.body.accountType = validUser.accountType;
                req.body.validUser = validUser;
            }
        });

        if(!validUser){
            err = new Error('User not found');
            err.status = 404;
        }

        res.status(406).send({
            message: next(err)
            });

}

const validDeleteSavingsAccount = (req, res, next) => {

    const id = parseInt(req.params.id);
        let validUser, err;

        bankadb.savingsBankAccount.map((user, index) => {
            if (user.id === id) {
                validUser = user

                req.body.fullName = validUser.fullName;
                req.body.accountType = validUser.accountType;

                bankadb.savingsBankAccount.splice(index, 1);
            }
        });

        if(!validUser){
            err = new Error('User not found');
            err.status = 404;
        }  
        res.status(406).send({
            message: next(err)
        });
}

const validDeleteCurrentAccount = (req, res, next) => {

    const id = parseInt(req.params.id);
        let validUser, err;

        bankadb.currentBankAccount.map((user, index) => {
            if (user.id === id) {
                validUser = user

                req.body.fullName = validUser.fullName;
                req.body.accountType = validUser.accountType;

                bankadb.currentBankAccount.splice(index, 1);
            }
        });

        if(!validUser){
            err = new Error('User not found');
            err.status = 404;
        }  
        res.status(406).send({
            message: next(err)
        });
}

const validPatchSavingsAccount = (req, res, next) => {
    const id = parseInt(req.params.id);
    let validUser, err;

    bankadb.savingsBankAccount.map((user) => {
        if (user.id === id) {
            validUser = user;

            req.body.validUser = validUser;
            req.body.fullName = validUser.fullName;
            req.body.accountType = validUser.accountType;
        }
    });

    if(!validUser){
        err = new Error('User not found');
        err.status = 404;
    }

    if(validUser.accountStatus == 'Active'){
        validUser.accountStatus = 'Dormant';
        req.body.accountStatus = 'Dormant';

    }
    else if(validUser.accountStatus == 'Dormant'){
        validUser.accountStatus = 'Active';
        req.body.accountStatus = 'Active';
    }

    res.status(406).send({
        message: next(err)
    });
}

//const validPatchCurrentAccount = (req, res, next)

export default {
    validSavingsAccounts, validCurrentAccounts, validDeleteSavingsAccount, validDeleteCurrentAccount, validPatchSavingsAccount
};
