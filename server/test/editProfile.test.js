import server from '../server';
//import apiRouter from '../routers/apiRouter';
import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';

const {expect} = chai;

chai.use(chaiHttp);

    
    describe('api/v1/reset-password', () => {

        const resetPassword = {
            id : 1234,
            password : "1234wer",
            confirmPassword : "1234wer"
        }
    
        it('Customer should be able to reset account password', () => {
         request(server)
                .put('/customer-reset-password/:id')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                });
        });

        it('Admin should be able to reset account password', () => {
            request(server)
                 .put('/admin-reset-password/:id')
                 .set('Accept', 'application/json')
                 .expect('Content-Type', /json/)
                 .end((err, res) => {
                     expect(res.status).to.equal(200);
                     expect(res.body).to.be.an('object');
                 });
         });

         it('Staff should be able to reset account password', () => {
            request(server)
                 .put('/staff-reset-password/:id')
                 .set('Accept', 'application/json')
                 .expect('Content-Type', /json/)
                 .end((err, res) => {
                     expect(res.status).to.equal(200);
                     expect(res.body).to.be.an('object');
                 });
         });
    });

    describe('api/v1/uploads', () => {
        const storage = {};
         const upload = {};

        it('should be able to upload an image', () => {
            request(server)
                 .put('/uploads')
                 .set('Accept', 'application/json')
                 .expect('Content-Type', /json/)
                 .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                 })
        })
    })


