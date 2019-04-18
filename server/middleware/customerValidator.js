import bankadb from '../memorydb/bankadb';

     const validUserSignup = (req, res, next) => {
         let err;
        if(!req.body.email){
            err = new Error('A valid email is required');
            err.status = 406;
        }
        else if(!req.body.firstName){
            err = new Error('A valid First Name is required');
            err.status = 406;
        }
        else if(!req.body.lastName){
            err = new Error('A valid Last Name is required');
            err.status = 406;
        } 
        else if(isNaN(req.body.phoneNumber)){
            err = new Error('Input a valid phone number');
            err.status = 406;
        }
        else if(!req.body.password || !req.body.confirmPassword){
            err = new Error('Enter a valid password');
            err.status = 406;
        }
        else if(req.body.password !== req.body.confirmPassword){
            err = new Error('Password mismatch');
            err.status = 406;
        }

        res.status(406).send({
            message: next(err)
            });
    };
    
    const validUserLogin = (req, res, next) => {
    
        const id = parseInt(req.params.id);
    
            let validUser, err;  
            
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
                err = new Error('Invalid User');
                err.status = 404;
            }
    
            if(req.body.email !== validUser.email){
                err = new Error('Invalid User');
                err.status = 404;
            }
            else if(req.body.password !== validUser.password){
                    err = new Error('Invalid User');
                    err.status = 404;
            }
        res.status(406).send({
            message: next(err)
            });
    };
    
    const validBankAccount = (req, res, next) => {
    
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
    
            if(isNaN(req.body.bvnNumber)){
                err = new Error('Invalid BVN Number');
                err.status = 406;
            }
            else if(!req.body.dateOfBirth){
                err = new Error('Date of Birth is required');
                err.status = 406;
            }
            else if(!req.body.residentialAddress){
                err = new Error('Residential Address is required');
                err.status = 406;
            }
            else if(!req.body.meansOfIdentification){
                err = new Error('Means of Identification is required');
                err.status = 406;
            }
            else if(!req.body.idNumber){
                err = new Error('A valid Identification Number is required');
                err.status = 406;
            }
            else if(!req.body.occupation){
                err = new Error('Occupation is required');
                err.status = 406;
            }
            else if(!req.body.nextOfKin){
                err = new Error('Next of Kin is required');
                err.status = 406;
            }
            else if(req.body.relationshipToNextOfKin){
                err = new Error('Relationship to Next of Kin is required');
                err.status = 406;
            }
            else if(!req.body.accountType){
                err = new Error('Account Type is required');
                err.status = 406;
            }
            else if(!req.body.sex){
                err = new Error('Your Sex is required');
                err.status = 406;
            }
            else if(!req.body.maritalStatus) {
                err = new Error('Marital Status is required');
                err.status = 406;
            }
        
            // if(req.body.accountType == 'Savings'){
            //     bankadb.savingsBankAccount.push(createBankAccount);
            // }
            // else if (req.body.accountType == 'Current'){
            //     bankadb.currentBankAccount.push(currentBankAccount);
            // }
            res.status(406).send({
                message: next(err)
                });
    };
    



export default {
    validUserSignup, validUserLogin, validBankAccount
};
