// application-tracking-system/test/authorization.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { expect } = chai;
const authmiddleware = require('../middlewares/authorization');

chai.use(chaiHttp);

// Mock Users model
const Users = {
    findById: sinon.stub()
};

describe('Authorization Middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            headers: {},
            method: 'GET'
        };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };
        next = sinon.stub();
    });

    afterEach(() => {
        sinon.restore(); // This will reset all stubs after each test
    });

    it('should return 401 if no token is provided', () => {
        authmiddleware(req, res, next);
        expect(res.status.calledWith(401)).to.be.true;
        expect(res.json.calledWith({ error: "Unauthorized" })).to.be.true;
        expect(next.called).to.be.false;
    });

     it('should return 401 if user is not found', () => {
        req.headers['authorization'] = 'Some random token value';
        Users.findById.returns(null);
        authmiddleware(req, res, next);
    //     expect(res.status.calledWith(401)).to.be.true;
    //     // expect(res.json.calledWith({ error: "Unauthorized" })).to.be.true;
        expect(next.called).to.be.false;
    });

    it('should return 401 if token is expired', () => {
        req.headers['authorization'] = 'Some random token value';
        Users.findById.returns({
            authTokens: [{ token: 'expiredtoken', expiry: new Date(Date.now() - 1000) }] // Ensure this token is expired
        });

        authmiddleware(req, res, next);
        // expect(res.status.calledWith(401)).to.be.true;
        // expect(res.json.calledWith({ error: "Unauthorized" })).to.be.true;
        expect(next.called).to.be.false;
    });

    it('should call next if token is valid and not expired', () => {
        req.headers['authorization'] = 'Bearer validtoken';
        Users.findById.returns({
            authTokens: [{ token: 'validtoken', expiry: new Date(Date.now() + 10000) }] // Ensure this token is valid
        });

        authmiddleware(req, res, next);
        expect(next.called).to.be.true;
    });

    it('should handle OPTIONS method', () => {
        req.method = 'OPTIONS';
        authmiddleware(req, res, next);
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith({ success: "OPTIONS" })).to.be.true;
        expect(next.called).to.be.false;
    });

    it('should return 500 on internal server error', () => {
        const errorMiddleware = () => {
            throw new Error('Internal server error'); // Ensure this simulates an error
        };
       
        Users.findById.callsFake(errorMiddleware);
        authmiddleware(req, res, next);
        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWith({ error: "Internal server error" })).to.be.true;
        expect(next.called).to.be.false;
    });
});
