const admin = require('../routers/admin'),
      chai = require('chai'), 
      chaiHttp = require('chai-http'),
      request = require('supertest');
      
chai.use(chaiHttp);

describe('Server', () => {

    //Start server.js before running test
    let server;
    before((done) => {
        server = require('../server');
        done();
    });
        
    //Close server after running test
    after((done) => {
        server.close();
        done();
    });

    describe('api/v1/bank-accounts', () => {
        it('admin should get all bank accounts from memory', () => {
           request(admin)
                .get('/bank-accounts')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(err.status).to.equal(404);
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.deep.equal(bankadb.userBankAccount);
                });
        });
    });

    describe('api/v1/bank-accounts/:id', () => {
        it('admin should get a speciific bank account from memory', () => {
           request(admin)
                .get('/bank-accounts/:id')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(err.status).to.equal(404);
                    expect(res.body).to.be.an('array');
                });
        });
    });

    describe('api/v1/bank-accounts/:id', () => {
        it('admin should be able to delete a bank account', () => {
           request(admin)
                .delete('/bank-accounts/:id')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(err.status).to.equal(404);
                    expect(res.body).to.be.an('array');
                });
        });
    });

    describe('api/v1/bank-accounts/:id', () => {

        it('admin should be able to activate/deactivate a bank account', () => {
           request(admin)
                .patch('/bank-accounts/:id')
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
            firstName : String,
            lastName : String,
            userEmail : String,
            accountType : String,
            userId : Number,
            createOn : new Date() 
        }

        it('admin should be able to create user(staff/admin) accounts', () => {
           request(admin)
                .post('/user-account')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(err.status).to.equal(404);
                    expect(createUserAccount.res.body).to.be.an('object');
                });
        });
    });

    describe('api/v1/admin', () => {

        it('admin should be able to view all user (admin) account', () => {
           request(admin)
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
           request(admin)
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

    describe('api/v1/admin/:id', () => {

        it('admin should be able to delete a user (admin) account', () => {
           request(admin)
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
           request(admin)
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

        it('admin should be able to activat/deactivate a user (staff) account', () => {
           request(admin)
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

        it('admin should be able to activat/deactivate a user (admin) account', () => {
           request(admin)
                .patch('/admin/:id')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(err.status).to.equal(404);
                });
        });
    });


});