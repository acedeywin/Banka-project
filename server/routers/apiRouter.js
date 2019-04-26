import express from 'express';
import customerController from '../controller/customerController';
import adminStaffController from '../controller/adminStaffController';
import editProfileController from '../controller/editProfileController';
import {
    validUserSignup, 
    validUserLogin,
    validBankAccount,
    validAccountProfile,
    validContactPage,
    validTransactionHistory
    } from '../middleware/customerValidator';
import {
    validSavingsAccounts,
    validCurrentAccounts,
    validPatchBankAccount,
    validPatchCurrentAccount,
    validAdminCreateAccount,
    validAdminProfile,
    validStaffProfile,
    validAdminLogin,
    validStaffLogin,
    validPatchAdminAccount,
    validPatchStaffAccount,
    validUpdateCurrentAccount,
    validUpdateSavingsAccount

} from '../middleware/adminStaffValidator';

import{
    validCustomerPassword,
    validAdminPassword,
    validStaffPassword,
} from '../middleware/editProfileValidator'

const router = express.Router();

//customerController routers
router.post('/auth/signup', validUserSignup, customerController.postUserSignup);
router.post('/auth/login/customers/:id', validUserLogin, customerController.postUserLogin);
router.post('/accounts/customers/:id', validBankAccount, customerController.postCreateBankAccount);
router.post('/contact/:id', validContactPage, customerController.postContactPage);
router.get('/profile/customers/:id', validAccountProfile, customerController.getAccountProfile);
router.get('/transactions/history/:id', validTransactionHistory, customerController.getTransactionHistory);

//adminStaffController routers
//router.get('/users', adminStaffController.getAllUserAccount);
router.get('/accounts/:accountType', adminStaffController.getAllBankAccounts);

router.get('/accounts/:id/:accountType', validSavingsAccounts, adminStaffController.getBankAccounts);

router.get('/profile/user/:id/:accountType', validAdminProfile, adminStaffController.getAdminStaffProfile);
//router.get('/profile/staff/:id/:accountType', validStaffProfile, adminStaffController.getStaffProfile);
router.get('accounts/users/:accountType', adminStaffController.getAdminStaffAccounts);
//router.get('/staff', adminStaffController.getStaffUserAccounts);
router.delete('/accounts/:accountNumber', adminStaffController.deleteBankAccount);

router.delete('/customer/accounts/:id', adminStaffController.deleteCustomerAccount);
router.delete('/accounts/:id/:accountType', adminStaffController.deleteUserAccount);

router.patch('/accounts/dormant/:accountNumber', adminStaffController.dormantBankAccount);
router.patch('/accounts/active/:accountNumber', adminStaffController.activeBankAccount);
router.patch('/admin/:id', validPatchAdminAccount, adminStaffController.patchAdminAccount);
router.patch('/staff/:id', validPatchStaffAccount, adminStaffController.patchStaffAccount);
router.post('/auth/personnel', validAdminCreateAccount, adminStaffController.postAdminCreateAccount);
router.post('/auth/login/:id/:accountType', validAdminLogin, adminStaffController.postAdminStaffLogin);
//router.post('/auth/login/staff/:id', validStaffLogin, adminStaffController.postStaffLogin);
router.put('/transactions/:accountNumber/:transactionType', validUpdateCurrentAccount, adminStaffController.updateCurrentAccount);
//router.put('/transactions/savings/:id', validUpdateSavingsAccount, adminStaffController.updateSavingsAccount);

//editProfileController routers
router.put('/password/customers/:id', validCustomerPassword, editProfileController.updateCustomerPassword);
router.put('/password/admin/:id', validAdminPassword, editProfileController.updateAdminPassword);
router.put('/password/staff/:id', validStaffPassword, editProfileController.updateStaffPassword);
router.post('/uploads', editProfileController.postUploadPhoto);

export default router;
