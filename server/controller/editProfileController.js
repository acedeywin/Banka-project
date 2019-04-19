import bankadb from '../memorydb/bankadb';
import multer from 'multer';
import path from 'path';

//cb(null, Date.now() + file.originalname);

class EditProfileController{
    
    //API for customer to reset password
    updateCustomerPassword(req, res){

        const resetPassword = {
            id : req.body.id,
            newPassword : req.body.newPassword,
            confirmNewPassword : req.body.confirmNewPassword
        }

        res.status(200).send({
            success: true,
            message: `Dear ${req.body.firstName} ${req.body.lastName}, your password was successfully updated.`,
            validUser: req.body.validUser,
            resetPassword
        });
    }

    updateAdminPassword(req, res){
        
        const resetPassword = {
            id : req.body.id,
            newPassword : req.body.newPassword,
            confirmNewPassword : req.body.confirmNewPassword
        }

        res.status(200).send({
            success: true,
            message: `Dear ${req.body.firstName} ${req.body.lastName}, your password was successfully updated.`,
            validUser: req.body.validUser,
            resetPassword
        });
    }

    updateStaffPassword(req, res){
        
        const resetPassword = {
            id : req.body.id,
            newPassword : req.body.newPassword,
            confirmNewPassword : req.body.confirmNewPassword
        }

        res.status(200).send({
            success: true,
            message: `Dear ${req.body.firstName} ${req.body.lastName}, your password was successfully updated.`,
            validUser: req.body.validUser,
            resetPassword
        });
    }

    postUploadPhoto(req, res, next){

        //Set storage engine
        const storage = multer.diskStorage({
            destination : (req, file, cb) => {cb(null, './server/uploads/')},
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

            mimetype && extname ? cb(null, true) : cb(new Error('Error: Image must be jpeg, jpg, or png'), false);
            
        };

        upload(req, res, (err) => {
            if(err){
                res.status(406).send({
                    status: 'error', 
                    message: 'Invalid Image'
                }); 
            }else{
                res.status(200).send({
                    success: true,
                    message: `Profile image successfully uploaded`,
                    file: req.file
                });
            }      
        });
        return next();
    }


    
}

const editProfileController = new EditProfileController();
export default editProfileController;


