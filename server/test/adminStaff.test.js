import server from '../server';
//import apiRouter from '../routers/apiRouter';
import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';

const {expect} = chai;

chai.use(chaiHttp);

    describe('api/v1/bank-accounts', () => {
        it('admin should get all accounts from memory', () => {
           request(server)
                .get('/all')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                });
        });
    });

    describe('api/v1/ get bank accounts', () => {
        
        it('admin should get a speciific savings account from memory', () => {
           request(server)
                .get('/savings-accounts/:id')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                });
        });

        it('admin should get all savings account from memory', () => {
            request(server)
                 .get('/savings-accounts')
                 .set('Accept', 'application/json')
                 .expect('Content-Type', /json/)
                 .end((err, res) => {
                     expect(res.status).to.equal(200);
                     expect(res.body).to.be.an('object');
                 });
         });

        it('admin should get a speciific current account from memory', () => {
            request(server)
                 .get('/current-accounts/:id')
                 .set('Accept', 'application/json')
                 .expect('Content-Type', /json/)
                 .end((err, res) => {
                     expect(res.status).to.equal(200);
                     expect(res.body).to.be.an('object');
                 });
         });

         it('admin should get all current account from memory', () => {
            request(server)
                 .get('/current-accounts')
                 .set('Accept', 'application/json')
                 .expect('Content-Type', /json/)
                 .end((err, res) => {
                     expect(res.status).to.equal(200);
                     expect(res.body).to.be.an('object');
                 });
         });
    });

    describe('api/v1/ delete a bank account', () => {
        it('admin should be able to delete a savings account', () => {
           request(server)
                .delete('/savings-accounts/:id')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                });
        });

        it('admin should be able to delete a current account', () => {
            request(server)
                 .delete('/current-accounts/:id')
                 .set('Accept', 'application/json')
                 .expect('Content-Type', /json/)
                 .end((err, res) => {
                     expect(res.status).to.equal(200);
                 });
        });
    });

    describe('api/v1/ activate/deactivate a bank account', () => {

        it('admin should be able to activate/deactivate a savings account', () => {
           request(server)
                .patch('/savings-accounts/:id')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                });
        });

        it('admin should be able to activate/deactivate a current account', () => {
            request(server)
                 .patch('/current-accounts/:id')
                 .set('Accept', 'application/json')
                 .expect('Content-Type', /json/)
                 .end((err, res) => {
                     expect(res.status).to.equal(200);
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

        it('admin should be able to create user(staff/admin) accounts', () => {
           request(server)
                .post('/create-user-account')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200);          
                    expect(res.body).to.be.an('object');
                });
        });
    });

    describe('api/v1/user profile', () => {

        it('should get an admin account profile', () => {
            request(server)
                 .get('/admin-profile/:id')
                 .set('Accept', 'application/json')
                 .expect('Content-Type', /json/)
                 .end((err, res) => {
                     expect(res.status).to.equal(200);
                     expect(res.body).to.be.an('object');
                 });
         });

         it('should get a staff account profile', () => {
            request(server)
                 .get('/staff-profile/:id')
                 .set('Accept', 'application/json')
                 .expect('Content-Type', /json/)
                 .end((err, res) => {
                     expect(res.status).to.equal(200)
                     expect(res.body).to.be.an('object');
                 });
         });
    })

    describe('api/v1/ view admin and staff account', () => {


        it('admin should be able to view all user (admin) account', () => {
           request(server)
                .get('/admin')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    //expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                });
        });

        it('admin should be able to view all user (staff) account', () => {
           request(server)
                .get('/staff')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    //expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                });
        });
    });

    describe('api/v1/user login', () => {
    
        const login = {
            id : 12,
            email : "me@world.com",
            password : "123wer",
        }
    
        it('Should login in a user(admin)', () => {
            request(server)
                .post('/admin-login/:id')
                .set('Accept', 'appplication/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                });
        }); 
        
        it('Should login in a user(staff)', () => {
            request(server)
                .post('/staff-login/:id')
                .set('Accept', 'appplication/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                });
        }); 
    });

    describe('api/v1/admin/:id', () => {

        it('admin should be able to delete a user (admin) account', () => {
           request(server)
                .delete('/admin/:id')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                });
        });
    });

    describe('api/v1/staff/:id', () => {

        it('admin should be able to delete a user (staff) account', () => {
           request(server)
                .delete('/staff/:id')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                });
        });
    });

    describe('api/v1/staff/:id', () => {

        it('admin should be able to activate/deactivate a user (staff) account', () => {
           request(server)
                .patch('/staff/:id')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                });
        });
    });

    describe('api/v1/admin/:id', () => {

        it('admin should be able to activate/deactivate a user (admin) account', () => {
           request(server)
                .patch('/admin/:id')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
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

        it('staff should ba able to credit/debit a current account', () => {
           request(server)
                .put('/current-accounts/:id')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
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
        it('staff should ba able to credit/debit a savings account', () => {
           request(server)
                .put('/savings-accounts/:id')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                });
        });
    });