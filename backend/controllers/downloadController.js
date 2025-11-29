// Handles incoming requests and communicates with ytdlpService

/*
 * Controllers for handling media download and info extraction requests.
 * Receives data from routes, validates it, and passes tasks to service layer.
 * Sends formatted response back to the client.
 */

const ytdlpService = require("../services/ytdlpService");
const { parseFormats } = require("../utils/formatParser");


// Controller: Returns media information such as title, formats & qualities.
const getInfo = async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({
                success: false,
                message: "URL is required."
            });
        }

        const info = await ytdlpService.fetchInfo(url);
        const cleanedFormats = parseFormats(info.formats);

        return res.status(200).json({
            success: true,
            title: info.title,
            thumbnail: info.thumbnail,
            duration: info.duration,
            formats: cleanedFormats,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch info",
            error: error.message
        });
    }
};


// Controller: Starts the media download process (progressive or merged)
const startDownload = async (req, res) => {
    console.log("startDownload CALLED");

    try {
        const { url, formatId, type } = req.query;

        if (!url || !formatId) {
            return res.status(400).json({
                success: false,
                message: "URL and formatId are required."
            });
        }

        res.setHeader("Content-Type", "video/x-matroska");
        res.setHeader("Content-Disposition", "attachment; filename=video.mkv");

        let process;

        if (type === "progressive") {
            process = ytdlpService.createProgressiveStream(url, formatId);
        } else if (type === "merged") {
            process = await ytdlpService.createMergedStream(url, formatId);
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid type. Must be 'progressive' or 'merged'"
            });
        }

        process.stdout.pipe(res);

        process.stderr.on("data", (data) => {
            console.log("DOWNLOAD ENGINE ERROR:", data.toString());
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to download media",
            error: error.message,
        });
    }
};


module.exports = {
    getInfo,
    startDownload
};