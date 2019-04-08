import express from 'express';
import customerController from '../controller/customerController';
import adminStaffController from '../controller/adminStaffController';

const router = express.Router();

router.post('/signup', customerController.postUserSignup);
router.post('/customer-login/:id', customerController.postUserLogin);
router.post('/create-bank-account/:id', customerController.postCreateBankAccount);
router.post('/contact/:id', customerController.postContactPage);
router.get('/account-profile/:id', customerController.getAccountProfile);
router.get('/transaction-history/:id', customerController.getTransactionHistory);

router.get('/all', adminStaffController.getAllUserAccount);
router.get('/savings-accounts', adminStaffController.getAllSavingsAccounts);
router.get('/current-accounts', adminStaffController.getAllCurrentAccounts);
router.get('/savings-accounts/:id', adminStaffController.getSavingsAccounts);
router.get('/current-accounts/:id', adminStaffController.getCurrentAccounts);
router.get('/admin', adminStaffController.getAdminUserAccounts);
router.get('/staff', adminStaffController.getStaffUserAccounts);
router.delete('/savings-accounts/:id', adminStaffController.deleteSavingsAccount);
router.delete('/current-accounts/:id', adminStaffController.deleteCurrentAccount)
router.delete('/admin/:id', adminStaffController.deleteAdminAccount);
router.delete('/staff/:id', adminStaffController.deleteStaffAccount);
router.patch('/savings-accounts/:id', adminStaffController.patchSavingsAccount);
router.patch('/current-accounts/:id', adminStaffController.patchCurrentAccount);
router.patch('/admin/:id', adminStaffController.patchAdminAccount);
router.patch('/staff/:id', adminStaffController.patchStaffAccount);
router.post('/create-user-account', adminStaffController.postAdminCreateAccount);
router.post('/admin-login/:id', adminStaffController.postAdminLogin);
router.post('/staff-login/:id', adminStaffController.postStaffLogin);
router.put('/current-accounts/:id', adminStaffController.updateCurrentAccount);
router.put('/savings-accounts/:id', adminStaffController.updateSavingsAccount);


export default router;
