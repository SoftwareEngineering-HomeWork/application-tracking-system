const express = require("express");
const router = express.Router();
const multer = require("multer");
const Users = require("../models/User");
const getUserIdFromHeader = require("../helpers/get_userid");

// Set up Multer to handle file upload (no need to save the file to disk)
const storage = multer.memoryStorage(); // Store file in memory (as Buffer)

const upload = multer({ storage });

// Handle resume file upload
router.get("/", async (req, res) => {
    try {
      const userId = getUserIdFromHeader(req); // Get user ID from header (ensure you have middleware to extract this)
      const user = await Users.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Check if the user has uploaded a resume, and return its filename (or 'No resume uploaded' if none)
      const fileName = user.resume ? "resume.pdf" : "No resume uploaded";  // You could retrieve the actual file name if you store it
      res.status(200).json({ fileName });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error retrieving resume metadata" });
    }
  });

  router.get("/download", async (req, res) => {
    try {
      const userId = getUserIdFromHeader(req); // Get user ID from header
      const user = await Users.findById(userId);
  
      if (!user || !user.resume) {
        return res.status(404).json({ error: "No resume found" });
      }
  
      // Set the headers to indicate that we're sending a downloadable file
      res.setHeader("Content-Disposition", "attachment; filename=resume.pdf");
      res.setHeader("Content-Type", "application/pdf");
  
      // Send the resume binary data as the response
      res.send(user.resume);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error downloading resume" });
    }
  });

  router.post("/upload", upload.single("file"), async (req, res) => {
    try {
      const userId = getUserIdFromHeader(req); // Get user ID from header
      const user = await Users.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Save the resume as a Buffer in MongoDB
      user.resume = req.file.buffer;
  
      await user.save();  // Save the updated user document with the resume
      res.status(200).json({ message: "Resume uploaded successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error uploading resume" });
    }
  });

module.exports = router;
