// application-tracking-system/new_backend/helpers/test/get_token.test.js
const { expect } = require("chai");
const { getTokenFromHeader } = require("../helpers/get_token");

describe("Get Token from header", () => {
  it("should return the token from the authorization header", () => {
    const req = {
      headers: {
        authorization: "Bearer dhruv-testing",
      },
    };
    const token = getTokenFromHeader(req);
    expect(token).to.equal("dhruv-testing");
  });

  it("should return undefined if authorization header is not present", () => {
    const req = {
      headers: {},
    };
    const token = getTokenFromHeader(req);
    expect(token).to.be.undefined;
  });

  it("should return undefined if authorization header is malformed", () => {
    const req = {
      headers: {
        authorization: "InvalidHeader",
      },
    };
    const token = getTokenFromHeader(req);
    expect(token).to.be.undefined;
  });
});
