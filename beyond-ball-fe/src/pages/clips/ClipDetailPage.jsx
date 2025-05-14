import {useEffect, useState} from "react";
import React from 'react';
import ClipService from "../../APIs/ClipService.js";
import {useParams} from "react-router-dom";

const ClipDetailPage = () => {

    const {id} = useParams();

    const [filename, setFilename] = useState(null);
    const [clip, setClip] = useState(null);

    useEffect(() => {
        ClipService.getClip(id).then((response) => {
            console.log(response);
            setClip(response);
            ClipService.getClipVideo(response.clipUrl).then((response) => {
                setFilename(response);
            })
        })
    })


    return (
        <div>
            {filename && <VideoPlayer videoUrl={filename} />}
        </div>
    );
}

const VideoPlayer = ({ videoUrl }) => {

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