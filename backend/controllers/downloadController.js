// Handles incoming incoming requests and communicates with ytdlpService

/*
 * Controllers for handling media download and info extraction requests.
 * Recives data from routes, validates it, and passes tasks to service layer.
 * Sends formatted response back to the client.
 */

// Importing yt-dlp service which performs heavy processing.
const ytdlpService = require("../services/ytdlpService");

// Controller: Returns media information such as title, format & qualities.
const getInfo = async(req, res) => {
    try {
        // Step 1: Extract URL from the request body.
        const { url } = req.body;

        // Step 2: Validate input.
        if (!url) {
            return res.status(400).json({
                success: false,
                message: "URL is required."
            });
        };

        // Step 3: Ask service to fetch info.
        const info = await ytdlpService.fetchInfo(url);
        
        // Step 4: Send info back to the client.
        return res.status(200).json({
            success: true,
            data: info
        });
    } catch (error){
        // Step 5: Hanle error
        return res.status(500).json({
            success: false,
            message: "Failed to fetch info",
            error: error.message
        });
    }
};

// Controller: Starts the media download process using yt-dlp.
const startDownload = (req, res) => {


    // Step 3: Ask service to download file.
    // Step 4: Return success + file path / buffer.
}

// Exporting controller functions so routes can use them
module.exports = {
    getInfo,
    startDownload
};