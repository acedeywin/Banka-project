import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
//import apiRouter from '../routers/apiRouter';
//import request from 'supertest';
import adminStaffController from '../controller/adminStaffController';

const {expect, assert} = chai;

chai.use(chaiHttp);

    // describe('class constructor', () => {
        
    //     //class adminStaffController.createUserAccount{.to.have.nested.property('id');};

    //     it('should get all user account', (done) => {
    //         expect(adminStaffController.getAllUserAccount()).to.have.property('object');
    //         done();
    //     })
    // })

    describe('api/v1/bank-accounts', () => {
        it('admin should get all accounts from memory', (done) => {
            chai.request(server)
                .get('/all')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message');
                    done();
                });
        });
    });

    describe('api/v1/ get bank accounts', () => {
        
        it('admin should get a speciific savings account from memory', (done) => {
            chai.request(server)
                .get('/savings-accounts/:id')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message');
                    done();
                });
        });

        it('admin should get all savings account from memory', (done) => {
            chai.request(server)
                 .get('/savings-accounts')
                 .end((err, res) => {
                     expect(res.status).to.equal(200);
                     expect(res.body).to.be.an('object');
                     expect(res.body).to.have.property('message');
                     done();
                 });
         });

        it('admin should get a speciific current account from memory', (done) => {
            chai.request(server)
                 .get('/current-accounts/:id')
                 .end((err, res) => {
                     expect(res.status).to.equal(200);
                     expect(res.body).to.be.an('object');
                     expect(res.body).to.have.property('message');
                     done();
                 });
         });

         it('admin should get all current account from memory', (done) => {
            chai.request(server)
                 .get('/current-accounts')
                 .end((err, res) => {
                     expect(res.status).to.equal(200);
                     expect(res.body).to.be.an('object');
                     expect(res.body).to.have.property('message');
                     done();
                 });
         });
    });

    describe('api/v1/ delete a bank account', () => {
        it('admin should be able to delete a savings account', (done) => {
            chai.request(server)
                .delete('/savings-accounts/:id')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message');
                    done();
                });
        });

        it('admin should be able to delete a current account', (done) => {
            chai.request(server)
                 .delete('/current-accounts/:id')
                 .end((err, res) => {
                     expect(res.status).to.equal(200);
                     expect(res.body).to.be.an('object');
                     expect(res.body).to.have.property('message');
                     done();
                 });
        });
    });

    describe('api/v1/ activate/deactivate a bank account', () => {

        it('admin should be able to activate/deactivate a savings account', (done) => {
            chai.request(server)
                .patch('/savings-accounts/:id')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message');
                    done();
                });
        });

        it('admin should be able to activate/deactivate a current account', (done) => {
            chai.request(server)
                 .patch('/current-accounts/:id')
                 .end((err, res) => {
                     expect(res.status).to.equal(200);
                     expect(res.body).to.be.an('object');
                     expect(res.body).to.have.property('message');
                     done();
                 });
         });
    });

    describe('api/v1/user-account/', () => {

        const createUserAccount = {
            firstName : "Tom",
            lastName : "Wern",
            password : "123wer",
            userEmail : "world.com",
            userAccountType : "Current",
            id : 12,
            createOn : new Date(),
            accountStatus : "Active",
            isAdmin : Boolean
        }

        it('admin should be able to create user(staff/admin) accounts', (done) => {
            chai.request(server)
                .post('/create-user-account')
                .send(createUserAccount)
                .end((err, res) => {
                    expect(res.status).to.equal(200);          
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message');
                    done();
                });
        });
    });

    describe('api/v1/user profile', () => {

        it('should get an admin account profile', (done) => {
            chai.request(server)
                 .get('/admin-profile/:id')
                 .end((err, res) => {
                     expect(res.status).to.equal(200);
                     expect(res.body).to.be.an('object');
                     expect(res.body).to.have.property('message');
                     done();
                 });
         });

         it('should get a staff account profile', (done) => {
            chai.request(server)
                 .get('/staff-profile/:id')
                 .end((err, res) => {
                     expect(res.status).to.equal(200)
                     expect(res.body).to.be.an('object');
                     expect(res.body).to.have.property('message');
                     done();
                 });
         });
    })

    describe('api/v1/ view admin and staff account', () => {


        it('admin should be able to view all user (admin) account', (done) => {
            chai.request(server)
                .get('/admin')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message');
                    done();
                });
        });

        it('admin should be able to view all user (staff) account', (done) => {
            chai.request(server)
                .get('/staff')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message');
                    done();
                });
        });
    });

    describe('api/v1/user login', () => {
    
        const login = {
            id : 12,
            email : "me@world.com",
            password : "123wer",
        }
    
        it('Should login in a user(admin)', (done) => {
            chai.request(server)
                .post('/admin-login/:id')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message');
                    done();
                });
        }); 
        
        it('Should login in a user(staff)', (done) => {
            chai.request(server)
                .post('/staff-login/:id')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message');
                    done();
                });
        }); 
    });

    describe('api/v1/admin/:id', () => {

        it('admin should be able to delete a user (admin) account', (done) => {
            chai.request(server)
                .delete('/admin/:id')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message');
                    done();
                });
        });
    });

    describe('api/v1/staff/:id', () => {

        it('admin should be able to delete a user (staff) account', (done) => {
           chai.request(server)
                .delete('/staff/:id')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message');
                    done();
                });
        });
    });

    describe('api/v1/staff/:id', () => {

        it('admin should be able to activate/deactivate a user (staff) account', (done) => {
           chai.request(server)
                .patch('/staff/:id')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message');
                    done();
                });
        });
    });

    describe('api/v1/admin/:id', () => {

        it('admin should be able to activate/deactivate a user (admin) account', (done) => {
           chai.request(server)
                .patch('/admin/:id')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message');
                    done();
                });
        });
    });

    describe('api/v1/update transactions', () => {

        const accountTransactions = {
            accountFullname : "Tom Wern",
            accountEmail : "me@world.com",
            id : 12345,
            accountNumber : 1234567897,
            amount : parseFloat(5000),
            transactionDate : new Date(),
            staffId : 12,
            transactionType : "Credit",
            totalCredit : "5000",
            totalDebit : 0,
            oldBalance : 0,
            newBalance : 0
        }

        it('staff should ba able to credit/debit a current account', (done) => {
           chai.request(server)
                .put('/current-accounts/:id')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message');
                    done();
                });
        });
    });

    describe('api/v1/update transactions', () => {

        const accountTransactions = {
            accountFullname : "Tom Wern",
            accountEmail : "me@world.com",
            id : 12345,
            accountNumber : 1234567897,
            amount : parseFloat(5000),
            transactionDate : new Date(),
            staffId : 12,
            transactionType : "Credit",
            totalCredit : "5000",
            totalDebit : 0,
            oldBalance : 0,
            newBalance : 0
        }
        it('staff should ba able to credit/debit a savings account', (done) => {
           chai.request(server)
                .put('/savings-accounts/:id')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message');
                    done();
                });
        });
    });