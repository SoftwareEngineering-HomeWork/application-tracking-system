const express = require("express");
const Users = require("../models/User");
const app = express.Router();
const getUserIdFromHeader = require("../helpers/get_userid");
const { v4: uuidv4 } = require("uuid");
const addToGoogleCalendar = require("./googlecalender");

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    console.log("Fetching the application details");
    const userId = getUserIdFromHeader(req);
    const user = await Users.findById(userId);
    return res.json(user.applications);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/", async (req, res) => {
  try {
    console.log("Got back application");
    const userId = getUserIdFromHeader(req);
    const { application } = req.body;
    console.log("This is the application", application);

    if (!application.jobTitle || !application.companyName) {
      return res.status(400).json({ error: "Missing fields in input" });
    }

    const user = await Users.findById(userId);

    if (application.interviewdate) {
      addToGoogleCalendar(application.interviewdate, application.companyName);
    }
    const currentApplication = {
      id: uuidv4(),
      jobTitle: application.jobTitle,
      companyName: application.companyName,
      date: application.date,
      interviewdate: application.interviewdate,
      jobLink: application.jobLink,
      location: application.location,
      status: application.status || "1",
    };

    user.applications.push(currentApplication);
    console.log(user.applications);
    await user.save();
    return res.status(200).json(currentApplication);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Update the existing job application for the user
app.put("/:applicationId", async (req, res) => {
  try {
    const userId = getUserIdFromHeader(req);
    const applicationId = req.params.applicationId;
    const requestData = req.body.application;

    const user = await Users.findById(userId);
    const applicationIndex = user.applications.findIndex(
      (app) => app.id === parseInt(applicationId),
    );

    if (applicationIndex === -1) {
      return res.status(400).json({ error: "Application not found" });
    }

    user.applications[applicationIndex] = {
      ...user.applications[applicationIndex],
      ...requestData,
    };
    await user.save();
    return res.status(200).json(user.applications[applicationIndex]);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Delete the given job application for the user
app.delete("/:applicationId", async (req, res) => {
  try {
    const userId = getUserIdFromHeader(req);
    const applicationId = req.params.applicationId;

    const user = await Users.findById(userId);
    const applicationIndex = user.applications.findIndex(
      (app) => app.id === parseInt(applicationId),
    );

    if (applicationIndex === -1) {
      return res.status(400).json({ error: "Application not found" });
    }

    const deletedApplication = user.applications.splice(applicationIndex, 1);
    await user.save();
    return res.status(200).json(deletedApplication[0]);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = app;
