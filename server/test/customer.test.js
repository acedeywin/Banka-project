import server from '../server';
//import apiRouter from '../routers/apiRouter';
import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';

const {expect} = chai;
      
chai.use(chaiHttp);

    //Test for the signup API
    describe('api/v1/signup', () => {

        const signup = {
            id : 1234,
            email : "me@wor.com",
            firstName : "Tom",
            lastName : "Wern",
            phoneNumber : 39045346789,
            password: "123wer",
            confirmPassword : "123wer",
            type : "Customer",
            token : '45erkjherht45495783',
            isAdmin: false
        }; 
    
        it('Should create a customer', () => {
          request(server)
                .post('/signup')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .send(signup)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                });
        }); 
    });
    
    //Test for the login API
    describe('api/v1/user login', () => {
    
        const login = {
            id : 1234,
            email : "me@wor.com",
            firstName : "Tom",
            lastName : "Wern",
            password : "123wer",
            token : '45erkjherht45495783'
        }
    
        it('Should login in a customer', () => {
            request(server)
                .post('/customer-login/:id')
                .set('Accept', 'appplication/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    expect(res.body).to.be.an('object');
                });
        });    
    });

    //Test for create-bank-account API
    describe('api/v1/create-bank-account/:id', () => {

        const createBankAccount = {
            id : 1234,
            accountNumber : 3007345671,
            fullName : "Tom Wern",
            owner: 1234,
            bvnNumber : 2345213454,
            dateOfBirth : "2/3/1980",
            residentialAddress : "23 wall street",
            meansOfIdentification : "Passport",
            emailAddress : "me@world.com",
            occupation : "Nurse",
            nextOfKin : "Endy Wern",
            idNumber : "123-wer-567-rty",
            phoneNumber : 39045346789,
            accountType : "Customer",
            sex: "Male",
            maritalStatus : "Single",
            currency : "NGN",
            openingBalance : 0,
            credit : 0,
            debit : 0,
            totalCredit : 0,
            totalDebit : 0,
            oldBalance : 0,
            newBalance : 0
        };

        it('Customer should be able to create account', () => {
            request(server)
                .post('/create-bank-account/:id')
                .set('Accept', 'appplication/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    expect(res.body).to.be.an('object');
                });
        }); 
    });

    describe('api/v1/account-profile/:id', () => {

        it('should get a customer account profile', () => {
            request(server)
                 .get('/account-profile/:id')
                 .set('Accept', 'application/json')
                 .expect('Content-Type', /json/)
                 .end((err, res) => {
                     expect(res.status).to.equal(200)
                     expect(res.body).to.be.an('object');
                 });
         });
    })

    describe('api/v1/contact/:id', () => {

        const contact = {
            fullName : "Tom Wern",
            email : "me@world.com",
            message : "Hello world"
        };

        it('Customer should be able to send messages', () => {
            request(server)
                .post('/contact/:id')
                .set('Accept', 'appplication/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    expect(res.body).to.be.an('object');
                });        
        });
    });

    describe('api/v1/transaction-history/:id', () => {

        const transactionHistory = {
            id : "1234",
            transactionDate : new Date(),
            accountType : "Savings",
            transactionType : "Credit",
            deposit : 5000,
            withdrawal : 0,
            balance : 5000
        };

        it('Customer should be able to view their account transaction history', () => {
            request(server)
                .post('/transaction-history/:id')
                .set('Accept', 'appplication/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    expect(res.body).to.be.an('object');
                });        
        });
    });    

