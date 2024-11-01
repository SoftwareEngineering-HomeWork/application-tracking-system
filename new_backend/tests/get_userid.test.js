// application-tracking-system/new_backend/test/get_userid.test.js
const chai = require("chai");
const expect = chai.expect;
const getUserIdFromHeader = require("../helpers/get_userid");

describe("getUserIdFromHeader", () => {
  it("should return the user ID from the headers", () => {
    const req = {
      headers: {
        userid: "12345",
      },
    };
    const result = getUserIdFromHeader(req);
    expect(result).to.equal("12345");
  });

  it("should return undefined if userid is not present", () => {
    const req = {
      headers: {},
    };
    const result = getUserIdFromHeader(req);
    expect(result).to.be.undefined;
  });

  it("should return undefined if headers is not an object", () => {
    const req = {
      headers: null,
    };
    const result = getUserIdFromHeader(req);
    expect(result).to.be.undefined;
  });
});
