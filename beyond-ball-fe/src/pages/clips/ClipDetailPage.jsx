import {useState} from "react";

const ClipDetailPage = () => {
    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState(null);

    const handleUpload = () => {
        ClipService.uploadClip(file,"asda")
            .then((response) => {
                ClipService.getClipVideo(response.data.clipUrl)
                    .then((clip) => {
                        setFilename(clip);
                    });
            });
    };

    return (
        <div>
            <input type="file" accept="video/*" onChange={e => setFile(e.target.files[0])} />
            <button onClick={handleUpload}>Upload</button>

            {filename && <VideoPlayer videoUrl={filename} />}
        </div>
    );
}

import React from 'react';
import ClipService from "../../APIs/ClipService.js";
import {CLIP_ENDPOINTS} from "../../APIs/Endpoints.js";

const VideoPlayer = ({ videoUrl }) => {

    console.log(videoUrl);
    return (
        <div>
            <h2>Video Preview</h2>
            <video controls width="640">
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default ClipDetailPage