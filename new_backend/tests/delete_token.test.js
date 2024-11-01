// application-tracking-system/new_backend/helpers/test/delete_token.test.js
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const { expect } = chai;
const Users = require("../models/User");
const { deleteAuthToken } = require("../helpers/delete_token");

chai.use(chaiHttp);

describe("Helper function to delete auth token", () => {
  let user;

  beforeEach(() => {
    user = {
      _id: "12345",
      authTokens: ["token1", "token2", "token3"],
      save: sinon.stub().returns(Promise.resolve()),
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should delete the specified token successfully", async () => {
    sinon.stub(Users, "findById").returns(Promise.resolve(user));

    const result = await deleteAuthToken("token2", "12345");
    expect(result).to.equal("Token deleted successfully");
    expect(user.authTokens).to.deep.equal(["token1", "token3"]);
  });

  it("should throw an error if the user is not found", async () => {
    sinon.stub(Users, "findById").returns(Promise.resolve(null));

    try {
      await deleteAuthToken("token2", "nonexistentId");
    } catch (err) {
      expect(err.message).to.equal("Error deleting token: User not found");
    }
  });

  it("should handle errors during token deletion", async () => {
    sinon.stub(Users, "findById").returns(Promise.resolve(user));
    user.save.returns(Promise.reject(new Error("Database error")));

    try {
      await deleteAuthToken("token2", "12345");
    } catch (err) {
      expect(err.message).to.equal("Error deleting token: Database error");
    }
  });
});
