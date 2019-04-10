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

    //Test for the signup API
    describe('api/v1/signup', () => {
    
        const signup = {
            id : Number,
            email : String,
            firstName : String,
            lastName : String,
            phoneNumber : Number,
            password: String,
            confirmPassword : String,
            type : String,
            isAdmin: Boolean
        }; 
    
        it('Should create a customer', () => {
            request(apiRouter)
                .post('/signup')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    expect(signup.res.body).to.be.an('object');
                    expect(err.status).to.equal(406);
                });
        });
    });
    
    //Test for the login API
    describe('api/v1/user login', () => {
    
        const login = {
            id : Number,
            email : String,
            password : String,
            firstName : String,
            lastName : String,
            token : String
        }
    
        it('Should login in a customer', () => {
            request(apiRouter)
                .post('/customer-login/:id')
                .set('Accept', 'appplication/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    expect(login.res.body).to.be.an('object');
                    expect(err.status).to.equal(406);
                });
        });    
    });

    //Test for create-bank-account API
    describe('api/v1/create-bank-account/:id', () => {

        const createBankAccount = {
            id : Number,
            accountNumber : Number,
            fullName : String,
            owner: Number,
            bvnNumber : Number,
            dateOfBirth : String,
            createdOn : Date.now(),
            residentialAddress : String,
            meansOfIdentification : String,
            emailAddress : String,
            occupation : String,
            nextOfKin : String,
            idNumber : String,
            phoneNumber : Number,
            accountType : String,
            status : String,
            sex: String,
            maritalStatus : String,
            currency : String,
            openingBalance : Number,
            credit : Number,
            debit : Number,
            totalCredit : Number,
            totalDebit : Number,
            oldBalance : Number,
            newBalance : Number
        };

        it('Customer should be able to create account', () => {
            request(apiRouter)
                .post('/create-bank-account/:id')
                .set('Accept', 'appplication/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    expect(createBankAccount.res.body).to.be.an('object');
                    expect(err.status).to.equal(406);
                });
        }); 
    });

    describe('api/v1/account-profile/:id', () => {

        it('should get a customer account profile', () => {
            request(apiRouter)
                 .get('/account-profile/:id')
                 .set('Accept', 'application/json')
                 .expect('Content-Type', /json/)
                 .end((err, res) => {
                     expect(res.status).to.equal(200)
                     expect(res.body).to.be.an('array');
                     expect(res.body).to.deep.equal(bankadb.accountProfile);
                 });
         });
    })

    describe('api/v1/contact/:id', () => {

        const contact = {
            fullName : String,
            email : String,
            message : String
        };

        it('Customer should be able to send messages', () => {
            request(apiRouter)
                .post('/contact/:id')
                .set('Accept', 'appplication/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    expect(contact.res.body).to.be.an('object');
                    expect(err.status).to.equal(406);
                });        
        });
    });

    describe('api/v1/transaction-history/:id', () => {

        const transactionHistory = {
            id : Number,
            transactionDate : Date.now(),
            accountType : String,
            transactionType : String,
            deposit : Number,
            withdrawal : Number,
            balance : String
        };

        it('Customer should be able to view their account transaction history', () => {
            request(apiRouter)
                .post('/transaction-history/:id')
                .set('Accept', 'appplication/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    expect(transactionHistory.res.body).to.be.an('object');
                    expect(err.status).to.equal(406);
                });        
        });
    })    
});

