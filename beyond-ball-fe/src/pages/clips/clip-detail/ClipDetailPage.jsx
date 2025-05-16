import {useEffect, useRef, useState} from "react";
import React from 'react';
import ClipService from "../../../APIs/ClipService.js";
import {useParams} from "react-router-dom";
import Layout from "../../../components/Layout.jsx";
import VideoNotesContainer from "./notes/VideoNotesContainer.jsx";
import {Box, Typography} from "@mui/material";

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
            <Typography variant="h1"
                sx={{
                    paddingY: 3
                }}
            >
                {clip?.title}
            </Typography>

            {filename &&
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 'auto',
                    height:'80vh'
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
        <Box sx={{
            height:'80vh'
        }}>
            <video ref={videoRef} controls>
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video player.
            </video>
        </Box>
    );
};

export default ClipDetailPage