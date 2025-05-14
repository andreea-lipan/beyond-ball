import React, {useEffect, useState} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import ClipService from "../../APIs/ClipService.js";
import {useNavigate} from "react-router-dom";
import {CLIP_DETAILS} from "../../utils/UrlConstants.js";
import {Box} from "@mui/material";

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
        <Card sx={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 2,
            overflow: 'hidden'
        }}>
            <CardActionArea onClick={() => navigate(CLIP_DETAILS(clip.id))}>
                <Box sx={{
                    position: 'relative',
                    width: '100%',
                    paddingTop: '56.25%', // 16:9 Aspect Ratio
                    backgroundColor: 'black'
                }}>
                    <CardMedia 
                        component="video"
                        image={filename}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain'
                        }}
                    />
                </Box>
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