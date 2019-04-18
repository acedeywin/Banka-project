import express from 'express';
import customerController from '../controller/customerController';
import adminStaffController from '../controller/adminStaffController';
import editProfileController from '../controller/editProfileController';
import customerValidator from '../middleware/customerValidator';
import adminStaffValidator from '../middleware/adminStaffValidator';

const router = express.Router();

//customerController routers
router.post('/auth/signup', customerValidator.validUserSignup, customerController.postUserSignup);
router.post('/auth/login/customers/:id', customerValidator.validUserLogin, customerController.postUserLogin);
router.post('/accounts/customers/:id', customerValidator.validBankAccount, customerController.postCreateBankAccount);
router.post('/contact/:id', customerController.postContactPage);
router.get('/profile/customers/:id', customerController.getAccountProfile);
router.get('/transactions/history/:id', customerController.getTransactionHistory);

//adminStaffController routers
router.get('/users', adminStaffController.getAllUserAccount);
router.get('/accounts/savings', adminStaffController.getAllSavingsAccounts);
router.get('/accounts/current', adminStaffController.getAllCurrentAccounts);
router.get('/accounts/savings/:id', adminStaffValidator.validSavingsAccounts, adminStaffController.getSavingsAccounts);
router.get('/accounts/current/:id', adminStaffValidator.validCurrentAccounts, adminStaffController.getCurrentAccounts);
router.get('/profile/admin/:id', adminStaffController.getAdminProfile);
router.get('/profile/staff/:id', adminStaffController.getStaffProfile);
router.get('/admin', adminStaffController.getAdminUserAccounts);
router.get('/staff', adminStaffController.getStaffUserAccounts);
router.delete('/accounts/savings/:id', adminStaffValidator.validDeleteSavingsAccount, adminStaffController.deleteSavingsAccount);
router.delete('/accounts/current/:id', adminStaffValidator.validCurrentAccounts, adminStaffController.deleteCurrentAccount)
router.delete('/admin/:id', adminStaffController.deleteAdminAccount);
router.delete('/staff/:id', adminStaffController.deleteStaffAccount);
router.patch('/accounts/savings/:id', adminStaffValidator.validPatchSavingsAccount,  adminStaffController.patchSavingsAccount);
router.patch('/accounts/current/:id', adminStaffController.patchCurrentAccount);
router.patch('/admin/:id', adminStaffController.patchAdminAccount);
router.patch('/staff/:id', adminStaffController.patchStaffAccount);
router.post('/auth/personnel', adminStaffController.postAdminCreateAccount);
router.post('/login/admin/:id', adminStaffController.postAdminLogin);
router.post('/login/staff/:id', adminStaffController.postStaffLogin);
router.put('/transactions/current/:id', adminStaffController.updateCurrentAccount);
router.put('/transactions/savings/:id', adminStaffController.updateSavingsAccount);

//editProfileController routers
router.put('/password/customers/:id', editProfileController.updateCustomerPassword);
router.put('/password/admin/:id', editProfileController.updateAdminPassword);
router.put('/password/staff/:id', editProfileController.updateStaffPassword);
router.post('/uploads', editProfileController.postUploadPhoto);

export default router;
