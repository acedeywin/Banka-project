import server from '../server';
import apiRouter from '../routers/apiRouter';
import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';

const expect = chai.expect();

chai.use(chaiHttp);

describe('Server', () => {

    //Start server.js before running test
    before((done) => {
        server;
        done();
    });
        
    //Close server after running test
    after((done) => {
        server.close();
        done();
    });

    describe('api/v1/bank-accounts', () => {
        it('admin should get all bank accounts from memory', () => {
           request(apiRouter)
                .get('/all')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(err.status).to.equal(404);
                    expect(res.body).to.be.an('array');
                });
        });
    });

    describe('api/v1/ get bank accounts', () => {
        
        it('admin should get a speciific savings account from memory', () => {
           request(apiRouter)
                .get('/savings-accounts/:id')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(err.status).to.equal(404);
                    expect(res.body).to.be.an('object');
                });
        });

        it('admin should get all savings account from memory', () => {
            request(apiRouter)
                 .get('/savings-accounts')
                 .set('Accept', 'application/json')
                 .expect('Content-Type', /json/)
                 .end((err, res) => {
                     expect(res.status).to.equal(200);
                     expect(err.status).to.equal(404);
                     expect(res.body).to.be.an('object');
                 });
         });

        it('admin should get a speciific current account from memory', () => {
            request(apiRouter)
                 .get('/current-accounts/:id')
                 .set('Accept', 'application/json')
                 .expect('Content-Type', /json/)
                 .end((err, res) => {
                     expect(res.status).to.equal(200);
                     expect(err.status).to.equal(404);
                     expect(res.body).to.be.an('object');
                 });
         });

         it('admin should get all current account from memory', () => {
            request(apiRouter)
                 .get('/current-accounts')
                 .set('Accept', 'application/json')
                 .expect('Content-Type', /json/)
                 .end((err, res) => {
                     expect(res.status).to.equal(200);
                     expect(err.status).to.equal(404);
                     expect(res.body).to.be.an('object');
                 });
         });
    });

    describe('api/v1/ delete a bank account', () => {
        it('admin should be able to delete a savings account', () => {
           request(apiRouter)
                .delete('/savings-accounts/:id')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(err.status).to.equal(404);
                });
        });

        it('admin should be able to delete a current account', () => {
            request(apiRouter)
                 .delete('/current-accounts/:id')
                 .set('Accept', 'application/json')
                 .expect('Content-Type', /json/)
                 .end((err, res) => {
                     expect(res.status).to.equal(200);
                     expect(err.status).to.equal(404);
                 });
        });
    });

    describe('api/v1/ activate/deactivate a bank account', () => {

        it('admin should be able to activate/deactivate a savings account', () => {
           request(apiRouter)
                .patch('/savings-accounts/:id')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(err.status).to.equal(404);
                });
        });

        it('admin should be able to activate/deactivate a current account', () => {
            request(apiRouter)
                 .patch('/current-accounts/:id')
                 .set('Accept', 'application/json')
                 .expect('Content-Type', /json/)
                 .end((err, res) => {
                     expect(res.status).to.equal(200);
                     expect(err.status).to.equal(404);
                 });
         });
    });

    describe('api/v1/user-account/', () => {

        const createUserAccount = {
            token : String,
            firstName : String,
            lastName : String,
            password : String,
            userEmail : String,
            userAccountType : String,
            id : Number,
            createOn : Date.now(),
            accountStatus : String,
            isAdmin : Boolean
        }

        it('admin should be able to create user(staff/admin) accounts', () => {
           request(apiRouter)
                .post('/create-user-account')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(err.status).to.equal(406);
                    expect(createUserAccount.res.body).to.be.an('object');
                });
        });
    });

    describe('api/v1/user profile', () => {

        it('should get an admin account profile', () => {
            request(apiRouter)
                 .get('/admin-profile/:id')
                 .set('Accept', 'application/json')
                 .expect('Content-Type', /json/)
                 .end((err, res) => {
                     expect(res.status).to.equal(200)
                     expect(res.body).to.be.an('array');
                     expect(res.body).to.deep.equal(bankadb.adminProfile);
                 });
         });

         it('should get a staff account profile', () => {
            request(apiRouter)
                 .get('/staff-profile/:id')
                 .set('Accept', 'application/json')
                 .expect('Content-Type', /json/)
                 .end((err, res) => {
                     expect(res.status).to.equal(200)
                     expect(res.body).to.be.an('array');
                     expect(res.body).to.deep.equal(bankadb.staffProfile);
                 });
         });
    })

    describe('api/v1/admin', () => {

        it('admin should be able to view all user (admin) account', () => {
           request(apiRouter)
                .get('/admin')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(err.status).to.equal(404);
                    expect(res.body).to.be.an('object');
                });
        });
    });

    describe('api/v1/staff', () => {

        it('admin should be able to view all user (staff) account', () => {
           request(apiRouter)
                .get('/staff')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(err.status).to.equal(404);
                    expect(res.body).to.be.an('object');
                });
        });
    });

    describe('api/v1/user login', () => {
    
        const login = {
            id : Number,
            email : String,
            password : String,
            firstName : String,
            lastName : String,
            token : String
        }
    
        it('Should login in a user(admin)', () => {
            request(apiRouter)
                .post('/admin-login/:id')
                .set('Accept', 'appplication/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    expect(login.res.body).to.be.an('object');
                    expect(err.status).to.equal(406);
                });
        }); 
        
        it('Should login in a user(staff)', () => {
            request(apiRouter)
                .post('/staff-login/:id')
                .set('Accept', 'appplication/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    expect(login.res.body).to.be.an('object');
                    expect(err.status).to.equal(406);
                });
        }); 
    });

    describe('api/v1/admin/:id', () => {

        it('admin should be able to delete a user (admin) account', () => {
           request(apiRouter)
                .delete('/admin/:id')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(err.status).to.equal(404);
                });
        });
    });

    describe('api/v1/staff/:id', () => {

        it('admin should be able to delete a user (staff) account', () => {
           request(apiRouter)
                .delete('/staff/:id')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(err.status).to.equal(404);
                });
        });
    });

    describe('api/v1/staff/:id', () => {

        it('admin should be able to activate/deactivate a user (staff) account', () => {
           request(apiRouter)
                .patch('/staff/:id')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(err.status).to.equal(404);
                });
        });
    });

    describe('api/v1/admin/:id', () => {

        it('admin should be able to activate/deactivate a user (admin) account', () => {
           request(apiRouter)
                .patch('/admin/:id')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(err.status).to.equal(404);
                });
        });
    });

    describe('api/v1/update transactions', () => {

        const accountTransactions = {
            accountFullname : String,
            accountEmail : String,
            id : Number,
            accountNumber : String,
            amount : parseFloat(Number),
            typeOfTranscation : String,
            transactionDate : Date.now(),
            staffId : Number,
            transactionType : String,
            totalCredit : String,
            totalDebit : String,
            oldBalance : String,
            newBalance : String
        }

        it('staff should ba able to credit/debit a current account', () => {
           request(apiRouter)
                .put('/current-accounts/:id')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(err.status).to.equal(404);
                    expect(accountTransactions.res.body).to.be.an('object');
                });
        });
    });

    describe('api/v1/update transactions', () => {

        const accountTransactions = {
            accountFullname : String,
            accountEmail : String,
            id : Number,
            accountNumber : String,
            amount : parseFloat(Number),
            typeOfTranscation : String,
            transactionDate : Date.now(),
            staffId : Number,
            transactionType : String,
            totalCredit : String,
            totalDebit : String,
            oldBalance : String,
            newBalance : String
        }

        it('staff should ba able to credit/debit a savings account', () => {
           request(apiRouter)
                .put('/savings-accounts/:id')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(err.status).to.equal(404);
                    expect(accountTransactions.res.body).to.be.an('object');
                });
        });
    });
});