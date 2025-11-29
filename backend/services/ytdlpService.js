// Executes yt-dlp commands and handles video/audio download logic

/*
 * Service layer responsible for heavy processing tasks.
 * Executes yt-dlp commands for fetching media info and downloading files.
 * Returns processed results back to the controller.
 */

const { exec, spawn } = require("child_process");
const path = require("path");

// Detect correct YtDlp command for OS
const getYtDlpCommand = () => {
    const binDir = path.join(__dirname, "..", "bin");

    if (process.platform === "win32") {
        return path.join(binDir, "yt-dlp.exe");
    }

    return path.join(binDir, "yt-dlp"); // macOS + Linux
};

// Detect correct ffmpeg command for OS
const getFfmpegCommand = () => {
    if (process.platform === "win32") return "ffmpeg.exe";
    return "ffmpeg";
};

// Fetch media info using yt-dlp
const fetchInfo = (url) => {
    return new Promise((resolve, reject) => {
        const command = `yt-dlp --dump-json "${url}"`;

        exec(command, (error, stdout) => {
            if (error) return reject(error);

            try {
                const info = JSON.parse(stdout);
                resolve(info);
            } catch (parseError) {
                reject(parseError);
            }
        });
    });
};

// Pick best audio ID
const pickBestAudioId = (formats) => {
    if (!Array.isArray(formats)) return null;

    const preferred = ["140", "251", "250", "249", "139"];

    for (const id of preferred) {
        const found = formats.find(f => String(f.format_id) === id && f.acodec && f.acodec !== "none");
        if (found) return found.format_id;
    }

    const audioFormats = formats.filter(f => f.acodec && f.acodec !== "none");
    if (audioFormats.length === 0) return null;

    audioFormats.sort((a, b) => (b.abr || 0) - (a.abr || 0));
    return audioFormats[0].format_id;
};

// Progressive stream engine
const createProgressiveStream = (url, formatId) => {
    const ytDlpCmd = getYtDlpCommand();

    const args = [
        "-f", formatId,
        "--no-playlist",
        "-o", "-",
        url
    ];

    const proc = spawn(ytDlpCmd, args);

    proc.stderr.on("data", (d) => {
        console.log("yt-dlp (progressive) ERROR:", d.toString());
    });

    return proc;
};

// Merge video-only + best audio using ffmpeg
const createMergedStream = async (url, videoFormatId) => {
    const info = await fetchInfo(url);
    const audioFormatId = pickBestAudioId(info.formats);

    if (!audioFormatId) throw new Error("No suitable audio format found.");

    const ytDlpCmd = getYtDlpCommand();
    const ffmpegCmd = getFfmpegCommand();

    const videoProc = spawn(ytDlpCmd, [
        "-f", videoFormatId,
        "-o", "-",
        url
    ]);

    const audioProc = spawn(ytDlpCmd, [        
        "-f", audioFormatId,
        "-o", "-",
        url
    ]);

    const ffmpeg = spawn(ffmpegCmd, [
        "-i", "pipe:3",     // video input
        "-i", "pipe:4",     // audio input
        "-c:v", "copy",     // no video re-encode
        "-c:a", "aac",      // keep audio AAC
        "-f", "matroska",   // OUTPUT FORMAT → MKV (stream-friendly)
        "pipe:1"            // send to browser
    ], {
        stdio: ["pipe", "pipe", "pipe", "pipe", "pipe"]
    });

    videoProc.stdout.pipe(ffmpeg.stdio[3]);
    audioProc.stdout.pipe(ffmpeg.stdio[4]);

    videoProc.stderr.on("data", (d) =>
        console.log("yt-dlp VIDEO ERROR:", d.toString())
    );

    audioProc.stderr.on("data", (d) =>
        console.log("yt-dlp AUDIO ERROR:", d.toString())
    );

    ffmpeg.stderr.on("data", (d) =>
        console.log("FFMPEG ERROR:", d.toString())
    );

    return ffmpeg;
};

// Old direct stream
const downloadStream = (url, format) => {
    const ytDlpCmd = getYtDlpCommand();

    const args = [
        "-f", format,
        "--no-playlist",
        "-o", "-",
        url
    ];

    const proc = spawn(ytDlpCmd, args);

    proc.stdout.on("data", (data) => {
        console.log("yt-dlp CHUNK:", data.length, "bytes");
    });

    proc.stderr.on("data", (data) => {
        console.log("yt-dlp ERROR:", data.toString());
    });

    return proc;
};

module.exports = {
    fetchInfo,
    pickBestAudioId,
    createProgressiveStream,
    createMergedStream,
    downloadStream
};