// This file clean and organize yt-dlp formats into user-friendly structure.
console.log("parseFormats LOADED FROM:", __filename);
function parseFormats(rawFormats) {
    const progressive = [];
    const videoOnly = [];
    const audioOnly = [];

    for (const f of rawFormats) {
        // Skip useless formats (storyboard, thumbnail, etc);
        if (!f.ext || !f.format_id) continue;
        if (f.format_note && f.format_note.includes("storyboard")) continue;

        // Progressive (audio + video together)
        if (f.vcodec !== "none" && f.acodec !== "none") {
            progressive.push({
                id: f.format_id,
                resolution: f.resolution || `${f.width}x${f.height}`,
                fps: f.fps,
                ext: f.ext,
                note: f.format_note,
                filesize: f.filesize || f.filesize_approx || null
            });
        }

        // Video only
        else if (f.vcodec !== "none" && f.acodec === "none") {
            videoOnly.push({
                id: f.format_id,
                resolution: f.resolution || `${f.width}x${f.height}`,
                fps: f.fps,
                ext: f.ext,
                note: f.format_note,
                filesize: f.filesize || f.filesize_approx || null,
            });
        }

        // Audio only
        else if (f.acodec !== "none") {
            audioOnly.push({
                id: f.format_id,
                ext: f.ext,
                abr: f.abr,
                asr: f.asr,
                filesize: f.filesize || f.filesize_approx || null,
                note: f.format_note,
            })
        }
    }

    return {
        progressive,
        videoOnly,
        audioOnly,
    };
}

module.exports = { parseFormats };