import React, {useEffect, useState} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import ClipService from "../../APIs/ClipService.js";
import {useNavigate} from "react-router-dom";
import {CLIP_DETAILS} from "../../utils/UrlConstants.js";

export const ClipCard = ({clip}) => {

    const [filename, setFilename] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        ClipService.getClipVideo(clip.clipUrl)
            .then((clip) => {
                setFilename(clip);
            });
    }, []);

    const formatDate = (isoString) => {
        const date = new Date(isoString)
        return date.toLocaleDateString("de-DE")
    }


    return (
        <Card sx={{display: "flex", justifyContent: "space-arround", mt: 5, maxWidth: 280, borderRadius: 5}}>
            <CardActionArea onClick={() => navigate(CLIP_DETAILS(clip.id))}>
                <CardMedia sx={{objectFit: "contain"}}
                           component="video"
                           image={filename}
                />
                <CardContent>
                    <Typography component="div">
                        {clip.title}
                    </Typography>
                    <Typography variant="body2">
                        {formatDate(clip.creationDate)}
                    </Typography>
                    <Typography variant="body2">
                        Uploader : {clip.author ?? "Unknown"}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}


export default ClipCard;