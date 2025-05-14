import React, {useEffect, useState} from "react";
import ClipService from "../../APIs/ClipService.js";
import {Typography} from "@mui/material";
import ClipsList from "./ClipsList.jsx";

const ClipsContainer = ({selectedFolderId}) => {

    const [clips, setClips] = useState([]);

    useEffect(() => {
        ClipService.getClipsByFolder(selectedFolderId).then((response) => {
            console.log(response);
            setClips(response);
        })
    }, [selectedFolderId]);

    return (
        (clips.length > 0 ?
                <ClipsList clips={clips}/>
                :
                <NoClipsMessage/>
        )
    );
}


const NoClipsMessage = () => {
    return (
        <>
            <Typography variant='h2'
                        sx={{
                            display: 'flex',
                            margin: 'auto',
                            padding: '1em'
                        }}>
                No clips added yet. <br/>Add one by clicking the icon above!
            </Typography>
        </>
    );
}

export default ClipsContainer;