import bankadb from '../memorydb/bankadb';
import multer from 'multer';
import path from 'path';

//cb(null, Date.now() + file.originalname);

class EditProfileController{
    
    //API for customer to reset password
    updateCustomerPassword(req, res, next){
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
        if(!req.body.newPassword){
            let err = new Error('Enter New Password');
            err.status = 406;
            return next(err);
        }
        else if(!req.body.confirmNewPassword){
            let err = new Error('Confirm your New Password');
            err.status = 406;
            return next(err);
        }
        else if(req.body.newPassword !== req.body.confirmNewPassword){
            let err = new Error('New Password mismatch');
            err.status = 406;
            return next(err);
        }
        else if(req.body.newPassword === validUser.password){
            let err = new Error('New Password must be different from the previous one');
            err.status = 406;
            return next(err);
        }

        if(req.body.newPassword){
            validUser.password = req.body.newPassword;
        }
        if(req.body.confirmNewPassword){
            validUser.confirmPassword = req.body.confirmNewPassword;
        }

        const resetPassword = {
            id : validUser.id,
            newPassword : req.body.newPassword,
            confirmNewPassword : req.body.confirmNewPassword
        }

        res.status(200).send({
            success: true,
            message: `Dear ${validUser.firstName} ${validUser.lastName}, your password was successfully updated.`,
            validUser,
            resetPassword
        });
    }

    updateAdminPassword(req, res, next){
        const id = parseInt(req.params.id);
        let validUser;

        bankadb.adminAccount.map((user) => {
            if (user.id === id) {
                validUser = user;
            }
        });
        if(!validUser){
            let err = new Error('User not found');
            err.status = 404;
            return next(err);
        }
        if(!req.body.newPassword){
            let err = new Error('Enter New Password');
            err.status = 406;
            return next(err);
        }
        else if(!req.body.confirmNewPassword){
            let err = new Error('Confirm your New Password');
            err.status = 406;
            return next(err);
        }
        else if(req.body.newPassword !== req.body.confirmNewPassword){
            let err = new Error('New Password mismatch');
            err.status = 406;
            return next(err);
        }
        else if(req.body.newPassword === validUser.password){
            let err = new Error('New Password must be different from the previous one');
            err.status = 406;
            return next(err);
        }

        if(req.body.newPassword){
            validUser.password = req.body.newPassword;
        }
        if(req.body.confirmNewPassword){
            validUser.confirmPassword = req.body.confirmNewPassword;
        }

        const resetPassword = {
            id : validUser.id,
            newPassword : req.body.newPassword,
            confirmNewPassword : req.body.confirmNewPassword
        }

        res.status(200).send({
            success: true,
            message: `Dear ${validUser.firstName} ${validUser.lastName}, your password was successfully updated.`,
            validUser,
            resetPassword
        });
    }

    updateStaffPassword(req, res, next){
        const id = parseInt(req.params.id);
        let validUser;

        bankadb.staffAccount.map((user) => {
            if (user.id === id) {
                validUser = user;
            }
        });
        if(!validUser){
            let err = new Error('User not found');
            err.status = 404;
            return next(err);
        }
        if(!req.body.newPassword){
            let err = new Error('Enter New Password');
            err.status = 406;
            return next(err);
        }
        else if(!req.body.confirmNewPassword){
            let err = new Error('Confirm your New Password');
            err.status = 406;
            return next(err);
        }
        else if(req.body.newPassword !== req.body.confirmNewPassword){
            let err = new Error('New Password mismatch');
            err.status = 406;
            return next(err);
        }
        else if(req.body.newPassword === validUser.password){
            let err = new Error('New Password must be different from the previous one');
            err.status = 406;
            return next(err);
        }

        if(req.body.newPassword){
            validUser.password = req.body.newPassword;
        }
        if(req.body.confirmNewPassword){
            validUser.confirmPassword = req.body.confirmNewPassword;
        }

        const resetPassword = {
            id : validUser.id,
            newPassword : req.body.newPassword,
            confirmNewPassword : req.body.confirmNewPassword
        }

        res.status(200).send({
            success: true,
            message: `Dear ${validUser.firstName} ${validUser.lastName}, your password was successfully updated.`,
            validUser,
            resetPassword
        });
    }

    postUploadPhoto(req, res, next){

        // const id = parseInt(req.params.id);

        // let validUser;
        
        // bankadb.userSignup.map((user) => {
        //     if (user.id === id) {
        //         validUser = user;    
        //     }
        // })

        // if(!validUser){
        //     let err = new Error('User not found');
        //     err.status = 404;
        //     return next(err);
        // }

        //Set storage engine
        const storage = multer.diskStorage({
            destination : (req, file, cb) => {cb(null, './uploads/')},
            filename : (req, file, cb) => {
                cb(null, Date.now() + path.extname(file.originalname));
            }    
        });

        //Init upload
        const upload = multer({
            storage : storage,
            limits : {fileSize: 1000000},
            fileFilter : (req, file, cb) => {checkFileType(file, cb);}
        }).single('userImage');

        //Check file type
        const checkFileType = (file, cb) => {
            //Allowed extension
            const filetypes = /jpeg|jpg|png/;
            //Check the extension
            const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
            //Check for mimetype
            const mimetype = filetypes.test(file.mimetype);

            if(mimetype && extname){
                cb(null, true);
            }else{
                cb(new Error('Error: Image must be jpeg, jpg, or png'), false);
            }
        };

        // if(!req.file){
        //     let err = new Error('An image is required');
        //     err.status = 404;
        //     return next(err);
        // }

        // const uploadImage = {
        //     id  : validUser.id,
        //     image : req.file
        // }

        upload(req, res, (err) => {
            if(err){
                res.status(406).send({
                    err: err.status,
                    message: 'Invalid Image'
                })
            }
            else {
                res.status(200).send({
                    success: true,
                    message: `Profile image successfully uploaded`,
                    file: req.file
                });
            }      
        });
    }


    
}

const editProfileController = new EditProfileController();
export default editProfileController;


