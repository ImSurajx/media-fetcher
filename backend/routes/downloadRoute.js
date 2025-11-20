// Defines API routes for download endpoints

/*
 * Routes for handling media-related API endpoints.
 * This file only defines URL paths and maps them to the correct controllers.
 * All heavy logic is handled inside the controllers and services.
 */

// Creating a router instance from Express.
const router = require("express").Router();

// Importing controller functions for handling requests.
const downloadController = require("../controllers/downloadController");

// Route for fetching media information (formats, title, etc.)
router.post("/info", downloadController.getInfo);

// Route for downloading media using yt-dlp
router.post("/download", downloadController.startDownload);

// Exporting router so index.js can use it
module.exports = router;