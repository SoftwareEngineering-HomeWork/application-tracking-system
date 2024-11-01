const request = require("supertest");
const expect = require("chai").expect;
const express = require("express");
const sinon = require("sinon");
const app = express();
const signupRouter = require("../routes/signup");
const loginRouter = require("../routes/login");
const Users = require("../models/User");
const bcrypt = require("bcrypt");

app.use(express.json());
app.use("/signup", signupRouter);
app.use("/login", loginRouter);

describe("Login and Signup Tests", () => {
  let userStub;

  beforeEach(() => {
    userStub = sinon.stub(Users, "findOne");
    sinon.stub(Users.prototype, "save");
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("POST /signup", () => {
    it("should create a new user successfully", async () => {
      userStub.withArgs({ username: "johndoe" }).returns(null); // No existing user
      Users.prototype.save.returns(Promise.resolve()); // Simulate successful save

      const res = await request(app).post("/signup").send({
        fullName: "John Doe",
        username: "johndoe",
        password: "password123",
      });
      expect(res.status).to.equal(201);
      expect(res.body.message).to.equal("User created successfully");
    });

    it("should return an error if fields are missing", async () => {
      const res = await request(app).post("/signup").send({
        username: "johndoe",
        password: "password123",
      });
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal("All fields are required");
    });

    it("should return an error if user already exists", async () => {
      userStub.withArgs({ username: "johndoe" }).returns(Promise.resolve({})); // Simulate existing user

      const res = await request(app).post("/signup").send({
        fullName: "Jane Doe",
        username: "johndoe",
        password: "password456",
      });
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal("User already exists");
    });
  });

  describe("POST /login", () => {
    it("should login successfully with valid credentials", async () => {
      const user = new Users({
        // Create a new instance of Users
        _id: "12345",
        fullName: "John Doe",
        username: "johndoe",
        password: await bcrypt.hash("password123", 10), // Hash the password
        authTokens: [],
      });

      userStub.withArgs({ username: "johndoe" }).returns(Promise.resolve(user)); // Simulate found user

      const res = await request(app).post("/login").send({
        username: "johndoe",
        password: "password123",
      });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("token");
      expect(res.body).to.have.property("profile");
    });

    it("should return an error for missing credentials", async () => {
      const res = await request(app).post("/login").send({
        username: "johndoe",
      });
      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal("Username or password missing");
    });

    it("should return an error for wrong username or password", async () => {
      userStub.withArgs({ username: "johndoe" }).returns(Promise.resolve(null)); // Simulate user not found

      const res = await request(app).post("/login").send({
        username: "johndoe",
        password: "wrongpassword",
      });
      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal("Wrong username or password");
    });
  });
});
