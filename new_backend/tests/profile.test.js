const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const app = require('../routes/profile'); 
const Users = require('../models/User');
const getUserIdFromHeader = require('../helpers/get_userid');

const { expect } = chai;
chai.use(chaiHttp);

describe('User Routes', () => {
  let sandbox;

  // Setup a sandbox before each test to avoid method re-wrapping issues
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore(); // Restore original behavior of all stubbed methods
  });

  describe('GET / (Get Profile Details)', () => {
    it('should return profile information when user is found', async () => {
      const userId = '12345';
      const mockUser = {
        _id: userId,
        skills: ['JavaScript', 'Node.js'],
        job_levels: ['Junior'],
        locations: ['San Francisco'],
        institution: 'University',
        phone_number: '123-456-7890',
        address: '123 Main St',
        email: 'test@example.com',
        fullName: 'Test User',
        extensionDetails: ['extra data'],
      };

      // Stubbing helper and model methods
      sandbox.stub(getUserIdFromHeader).returns(userId);
      sandbox.stub(Users, 'findById').resolves(mockUser);

      const res = await chai.request(app).get('/profile');

      expect(res).to.have.status(200);
      expect(res.body).to.include({
        skills: mockUser.skills,
        job_levels: mockUser.job_levels,
      });
    });

    it('should return 500 if user is not found', async () => {
      sandbox.stub(getUserIdFromHeader).returns('invalid_id');
      sandbox.stub(Users, 'findById').resolves(null);

      const res = await chai.request(app).get('/profile');

      expect(res).to.have.status(500);
      expect(res.body).to.have.property('error', 'Internal server error, cannot get profile data');
    });
  });

  describe('POST / (Update Profile Details)', () => {
    it('should update user profile and return the updated user', async () => {
      const userId = '12345';
      const mockUser = {
        _id: userId,
        extensionDetails: ['existing data'],
        save: sandbox.stub().resolvesThis(), // Mocking `save` method
      };

      sandbox.stub(getUserIdFromHeader).returns(userId);
      sandbox.stub(Users, 'findById').resolves(mockUser);

      const res = await chai
        .request(app)
        .post('/profile')
        .send({ extensionDetails: ['new data'] });

      expect(res).to.have.status(200);
      expect(res.body.extensionDetails).to.include.members(['existing data', 'new data']);
    });

    it('should return 404 if user is not found', async () => {
      sandbox.stub(getUserIdFromHeader).returns('invalid_id');
      sandbox.stub(Users, 'findById').resolves(null);

      const res = await chai.request(app).post('/profile').send({});

      expect(res).to.have.status(404);
      expect(res.body).to.have.property('error', 'User not found');
    });

    it('should return 500 on internal server error', async () => {
      sandbox.stub(getUserIdFromHeader).throws(new Error('Unexpected error'));

      const res = await chai.request(app).post('/profile').send({});

      expect(res).to.have.status(500);
      expect(res.body).to.have.property('error', 'Internal server error, cannot update profile data');
    });
  });
});
