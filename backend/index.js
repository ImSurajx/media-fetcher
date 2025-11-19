// Main backend server entry: sets up Express and API routes.

/*
 - Entry point for the backend server.
 - Creates the Express app and registers all routes + middleware.
 - This file runs first when the backend starts.
*/

// Importing Express framework to create the HTTP server
const express = require("express");

// Creating an Express application instance
const app = express();

// Middleware: Allows backend to read JSON data from incoming requests
app.use(express.json());

// Basic test route to confirm the backend server is running
app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

// Starting the backend server on a specific port
const PORT = 3000;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));