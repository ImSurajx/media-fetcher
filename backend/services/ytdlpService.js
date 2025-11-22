// Executes yt-dlp commands and handles video/audio download logic

/*
 * Service layer responsible for heavy processing tasks.
 * Executes yt-dlp commands for fetching media info and downloading files.
 * Returns processed results back to the controller.
 */

// Importing exec from Node's child_process module
const {exec, spawn} = require("child_process");
const { format } = require("path");

// Function to fetch media information from yt-dlp
const fetchInfo = (url) => {
    return new Promise((resolve, reject) => {
        // Step 1: Create a command for yt-dlp to fetch info.
        const command = `yt-dlp --dump-json "${url}"`;

        // Step 2: Execute the command
        exec(command, (error, stdout, stderr) => {
            // if yt-dlp gives any error -> reject the promise.
            if(error) {
                return reject(error)
            }
            try 
            {
                // Step 3: Parse the json output from yt-dlp.
                const info = JSON.parse(stdout);

                // Step 4: Resolve the promise with parsed info.
                resolve(info);
            } catch(parseError){
                reject (parseError);
            }
        });
    })
}

// Function: Stream media direclty using yt-dlp
const downloadStream = (url, format) => {
    // Step 1: Create yt-dlp arguments
    // -f <format> : which format to download (18, 22, 140, etc.)
    // url         : video URL (YouTube, etc.)
    // -o -        : output to stdout (streaming)
    const args = [
        "-f", format, // Selected format.
        url,          // Video URL
        "-o", "-"     // "-" means output to stdout (stream)
    ];
    // Step 2: Spawn yt-dlp
    // spawn starts yt-dlp as a child process and gives us a stream of data (stdout)
    const process = spawn("yt-dlp", args);

    // Step 3: Return the child_process so controller can pipe it's output
    return process;
}

module.exports = {
    fetchInfo,
    downloadStream
};