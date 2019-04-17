import server from '../server';
//import apiRouter from '../routers/apiRouter';
import chai from 'chai';
import chaiHttp from 'chai-http';
//import request from 'supertest';

const {expect} = chai;

chai.use(chaiHttp);

    
    describe('api/v1/reset-password', () => {

        const resetPassword = {
            id : 1234,
            password : "1234wer",
            confirmPassword : "1234wer"
        }
    
        it('Customer should be able to reset account password', (done) => {
            chai.request(server)
                .put('/password/customers/:id')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                    done();
                });
        });

        it('Admin should be able to reset account password', (done) => {
            chai.request(server)
                 .put('/password/admin/:id')
                 .end((err, res) => {
                     expect(res.status).to.equal(200);
                     expect(res.body).to.be.an('object');
                     done();
                 });
         });

         it('Staff should be able to reset account password', (done) => {
            chai.request(server)
                 .put('/password/staff/:id')
                 .end((err, res) => {
                     expect(res.status).to.equal(200);
                     expect(res.body).to.be.an('object');
                     done();
                 });
         });
    });

    describe('api/v1/uploads', () => {
        const storage = {};
         const upload = {};

        it('should be able to upload an image', (done) => {
            chai.request(server)
                 .post('/uploads')
                 .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                    done();
                 })
        })
    })


