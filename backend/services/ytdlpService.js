// Executes yt-dlp commands and handles video/audio download logic

/*
 * Service layer responsible for heavy processing tasks.
 * Executes yt-dlp commands for fetching media info and downloading files.
 * Returns processed results back to the controller.
 */

// Importing exec from Node's child_process module
const {exec, spawn} = require("child_process");

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

// Function: Stream media directly using yt-dlp.
// Uses spawn because video data is large and stream chunk-by-chunk
const downloadStream = (url, format) => {
    const args = [
        "-f", format,       // select format (18 recommended)
        "--no-playlist",    // avoid playlist downloads
        "-o", "-",          // output to stdout (stream)
        url                 // video URL
    ];

    const process = spawn("yt-dlp", args);

    // Debug log
    process.stdout.on("data", (data)=>{
        console.log("yt-dlp CHUNK:", data.length, "bytes");
    });
    process.stderr.on("data", (data)=>{
        console.log("yt-dlp ERROR:", data.toString());
    });
    return process;
}

module.exports = {
    fetchInfo,
    downloadStream
};