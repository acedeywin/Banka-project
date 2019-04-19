import bankadb from '../memorydb/bankadb';
import multer from 'multer';
import path from 'path';

export const validCustomerPassword = (req, res, next) => {

    const id = parseInt(req.params.id);
        let validUser;

        bankadb.userSignup.map((user) => {
            if (user.id === id) {
                validUser = user;

                req.body.id = validUser.id;
                req.body.firstName = validUser.firstName;
                req.body.lastName = validUser.lastName;
                req.body.validUser = validUser;
            }
        });
        if(!validUser){
            res.status(404).send({
                status: 'error', 
                message: 'User not found'
            });
        }
        if(!req.body.newPassword || !req.body.confirmNewPassword || req.body.newPassword !== req.body.confirmNewPassword){
            res.status(406).send({
                status: 'error', 
                message: 'All fields are required'
            });
        }
        else if(req.body.newPassword === validUser.password){
            res.status(401).send({
                status: 'error', 
                message: 'New Password must be different from the previous one'
            });
        }

        if(req.body.newPassword){
            validUser.password = req.body.newPassword;
        }
        if(req.body.confirmNewPassword){
            validUser.confirmPassword = req.body.confirmNewPassword;
        }
        return next();
}

export const validAdminPassword = (req, res, next) => {

    let validUser;

        bankadb.userSignup.map((user) => {
            if (user.id === id) {
                validUser = user;

                req.body.id = validUser.id;
                req.body.firstName = validUser.firstName;
                req.body.lastName = validUser.lastName;
                req.body.validUser = validUser;
            }
        });
        if(!validUser){
            res.status(404).send({
                status: 'error', 
                message: 'User not found'
            });
        }
        if(!req.body.newPassword || !req.body.confirmNewPassword || req.body.newPassword !== req.body.confirmNewPassword){
            res.status(406).send({
                status: 'error', 
                message: 'All fields are required'
            });
        }
        else if(req.body.newPassword === validUser.password){
            res.status(401).send({
                status: 'error', 
                message: 'New Password must be different from the previous one'
            });
        }

        if(req.body.newPassword){
            validUser.password = req.body.newPassword;
        }
        if(req.body.confirmNewPassword){
            validUser.confirmPassword = req.body.confirmNewPassword;
        }
        return next();
}

export const validStaffPassword = (req, res, next) => {

    let validUser;

        bankadb.userSignup.map((user) => {
            if (user.id === id) {
                validUser = user;

                req.body.id = validUser.id;
                req.body.firstName = validUser.firstName;
                req.body.lastName = validUser.lastName;
                req.body.validUser = validUser;
            }
        });
        if(!validUser){
            res.status(404).send({
                status: 'error', 
                message: 'User not found'
            });
        }
        if(!req.body.newPassword || !req.body.confirmNewPassword || req.body.newPassword !== req.body.confirmNewPassword){
            res.status(406).send({
                status: 'error', 
                message: 'All fields are required'
            });
        }
        else if(req.body.newPassword === validUser.password){
            res.status(401).send({
                status: 'error', 
                message: 'New Password must be different from the previous one'
            });
        }

        if(req.body.newPassword){
            validUser.password = req.body.newPassword;
        }
        if(req.body.confirmNewPassword){
            validUser.confirmPassword = req.body.confirmNewPassword;
        }
        return next();
}

