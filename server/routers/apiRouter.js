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
    validDeleteSavingsAccount,
    validDeleteCurrentAccount,
    validCurrentAccounts,
    validPatchSavingsAccount,
    validPatchCurrentAccount,
    validAdminCreateAccount,
    validAdminProfile,
    validStaffProfile,
    validAdminLogin,
    validStaffLogin,
    validDeleteAdminAccount,
    validDeleteStaffAccount,
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
router.get('/users', adminStaffController.getAllUserAccount);
router.get('/accounts/savings', adminStaffController.getAllSavingsAccounts);
router.get('/accounts/current', adminStaffController.getAllCurrentAccounts);
router.get('/accounts/savings/:id', validSavingsAccounts, adminStaffController.getSavingsAccounts);
router.get('/accounts/current/:id', validCurrentAccounts, adminStaffController.getCurrentAccounts);
router.get('/profile/admin/:id', validAdminProfile, adminStaffController.getAdminProfile);
router.get('/profile/staff/:id', validStaffProfile, adminStaffController.getStaffProfile);
router.get('/admin', adminStaffController.getAdminUserAccounts);
router.get('/staff', adminStaffController.getStaffUserAccounts);
router.delete('/accounts/savings/:id', validDeleteSavingsAccount, adminStaffController.deleteSavingsAccount);
router.delete('/accounts/current/:id', validDeleteCurrentAccount, adminStaffController.deleteCurrentAccount)
router.delete('/admin/:id', validDeleteAdminAccount, adminStaffController.deleteAdminAccount);
router.delete('/staff/:id', validDeleteStaffAccount, adminStaffController.deleteStaffAccount);
router.patch('/accounts/savings/:id', validPatchSavingsAccount,  adminStaffController.patchSavingsAccount);
router.patch('/accounts/current/:id', validPatchCurrentAccount, adminStaffController.patchCurrentAccount);
router.patch('/admin/:id', validPatchAdminAccount, adminStaffController.patchAdminAccount);
router.patch('/staff/:id', validPatchStaffAccount, adminStaffController.patchStaffAccount);
router.post('/auth/personnel', validAdminCreateAccount, adminStaffController.postAdminCreateAccount);
router.post('/auth/login/admin/:id', validAdminLogin, adminStaffController.postAdminLogin);
router.post('/auth/login/staff/:id', validStaffLogin, adminStaffController.postStaffLogin);
router.put('/transactions/current/:id', validUpdateCurrentAccount, adminStaffController.updateCurrentAccount);
router.put('/transactions/savings/:id', validUpdateSavingsAccount, adminStaffController.updateSavingsAccount);

//editProfileController routers
router.put('/password/customers/:id', validCustomerPassword, editProfileController.updateCustomerPassword);
router.put('/password/admin/:id', validAdminPassword, editProfileController.updateAdminPassword);
router.put('/password/staff/:id', validStaffPassword, editProfileController.updateStaffPassword);
router.post('/uploads', editProfileController.postUploadPhoto);

export default router;
