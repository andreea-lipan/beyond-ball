import {useEffect, useRef, useState} from "react";
import React from 'react';
import ClipService from "../../APIs/ClipService.js";
import {useParams} from "react-router-dom";
import Layout from "../../components/Layout.jsx";
import VideoNotesContainer from "./notes/VideoNotesContainer.jsx";
import {Box, Button} from "@mui/material";

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
    },[])

    const videoRef = useRef(null);

    const getTimestamp = () => {
        if (videoRef.current) {
            const currentTime = videoRef.current.currentTime;
            console.log("Current timestamp:", currentTime);
            return currentTime;
            // You can also pass this value back via props/callback
        }
        return 0;
    };

    const seekTo = (seconds) => {
        if (videoRef.current) {
            videoRef.current.currentTime = seconds;
        }
    };

    return (
        <Layout>
            <h2>{clip?.title}</h2>
            {filename &&
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 'auto',
                    padding: '1em'
                }}>
                    <VideoPlayer videoUrl={filename} videoRef={videoRef} />
                    <VideoNotesContainer seekTo={seekTo} getTimestamp={getTimestamp} clipId={id}/>
                </Box>
            }
        </Layout>
    );
}

const VideoPlayer = ({ videoUrl, videoRef }) => {


    return (
        <div>
            <video ref={videoRef} controls width="800" height="800">
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

        </div>
    );
};

export default ClipDetailPage