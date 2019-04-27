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
    validPatchUserAccount,
    validPatchStaffAccount,
    validupdateBankAccount,
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
router.get('/accounts/:accountType', adminStaffController.getAllBankAccounts);
router.get('/accounts/:id/:accountType', validSavingsAccounts, adminStaffController.getBankAccounts);
router.get('/profile/user/:id/:accountType', validAdminProfile, adminStaffController.getAdminStaffProfile);
router.get('accounts/users/:accountType', adminStaffController.getAdminStaffAccounts);

router.delete('/accounts/:accountNumber', adminStaffController.deleteBankAccount);
router.delete('/customer/accounts/:id', adminStaffController.deleteCustomerAccount);
router.delete('/accounts/:id/:accountType', adminStaffController.deleteAdminStaffAccount);

router.patch('/accounts/:accountNumber/:statusUpdate', validPatchBankAccount, adminStaffController.patchBankAccount);
router.patch('/accounts/user/:id/:statusUpdate', validPatchUserAccount, adminStaffController.patchAdminStaffAccount);

router.post('/auth/personnel', validAdminCreateAccount, adminStaffController.postAdminCreateAccount);
router.post('/auth/login/:id/:accountType', validAdminLogin, adminStaffController.postAdminStaffLogin);

router.put('/transactions/:accountNumber/:transactionType', validupdateBankAccount, adminStaffController.updateBankAccount);

//editProfileController routers
router.put('/password/customers/:id', validCustomerPassword, editProfileController.updateCustomerPassword);
router.put('/password/admin/:id', validAdminPassword, editProfileController.updateAdminPassword);
router.put('/password/staff/:id', validStaffPassword, editProfileController.updateStaffPassword);
router.post('/uploads', editProfileController.postUploadPhoto);

export default router;
