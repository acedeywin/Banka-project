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

    describe('api/v1/reset-password', () => {

        const resetPassword = {
            id : Number,
            password : String,
            confirmPassword : String
        }
    
        it('Customer should be able to reset account password', () => {
           request(apiRouter)
                .put('/customer-reset-password/:id')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(err.status).to.equal(404);
                    expect(resetPassword.res.body).to.be.an('object');
                });
        });

        it('Admin should be able to reset account password', () => {
            request(apiRouter)
                 .put('/admin-reset-password/:id')
                 .set('Accept', 'application/json')
                 .expect('Content-Type', /json/)
                 .end((err, res) => {
                     expect(res.status).to.equal(200);
                     expect(err.status).to.equal(404);
                     expect(resetPassword.res.body).to.be.an('object');
                 });
         });

         it('Staff should be able to reset account password', () => {
            request(apiRouter)
                 .put('/staff-reset-password/:id')
                 .set('Accept', 'application/json')
                 .expect('Content-Type', /json/)
                 .end((err, res) => {
                     expect(res.status).to.equal(200);
                     expect(err.status).to.equal(404);
                     expect(resetPassword.res.body).to.be.an('object');
                 });
         });
    });

    describe('api/v1/uploads', () => {
        const storage = {};
         const upload = {};

        it('should be able to upload an image', () => {
            request(apiRouter)
                 .put('/uploads')
                 .set('Accept', 'application/json')
                 .expect('Content-Type', /json/)
                 .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(err.status).to.equal(406).to.be.an(error);
                    expect(storage.res.body).to.be.an('object');
                    expect(upload.res.body).to.be.an('object');
                 })
        })
    })


});

