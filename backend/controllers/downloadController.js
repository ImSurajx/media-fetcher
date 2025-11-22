// Handles incoming incoming requests and communicates with ytdlpService

/*
 * Controllers for handling media download and info extraction requests.
 * Recives data from routes, validates it, and passes tasks to service layer.
 * Sends formatted response back to the client.
 */

// Importing yt-dlp service which performs heavy processing.
const ytdlpService = require("../services/ytdlpService");

// Controller: Returns media information such as title, format & qualities.
const getInfo = async (req, res) => {
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
    } catch (error) {
        // Step 5: Hanle error
        return res.status(500).json({
            success: false,
            message: "Failed to fetch info",
            error: error.message
        });
    }
};

// Controller: Starts the media download process using yt-dlp.
const startDownload = async (req, res) => {
    console.log("startDownload CALLED!");

    try {
        const { url, format } = req.query;

        if (!url || !format) {
            return res.status(400).json({
                success: false,
                message: "URL and format are required."
            })
        }

        // Call your service function.
        const stream = ytdlpService.downloadStream(url, format);

        // Tell browser: this is a video file.
        res.setHeader("Content-Type", "video/mp4");
        res.setHeader("Content-Disposition", "attachment; filename=video.mp4");

        // Pipe stream to browser
        stream.stdout.pipe(res);

        // Log error stream also
        stream.stderr.on("data", (data) => {
            console.log("yt-dlp ERROR (controller)", data.toString());
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to download media",
            error: error.message,
        });
    }

}

// Exporting controller functions so routes can use them
module.exports = {
    getInfo,
    startDownload
};