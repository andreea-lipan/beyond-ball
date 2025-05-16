import React, {useEffect, useState} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import ClipService from "../../../APIs/ClipService.js";
import {useNavigate} from "react-router-dom";
import {CLIP_DETAILS} from "../../../utils/UrlConstants.js";
import {Box, CircularProgress, useTheme} from "@mui/material";

export const ClipCard = ({clip}) => {
    const [filename, setFilename] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const theme = useTheme();

    // load the clip when the page is loading
    useEffect(() => {
        setIsLoading(true);
        ClipService.getClipVideo(clip.clipUrl)
            .then((clip) => {
                setFilename(clip);
                setIsLoading(false);
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
            borderRadius: 4,
            overflow: 'hidden'
        }}>
            <CardActionArea onClick={() => navigate(CLIP_DETAILS(clip.id))}>
                <Box sx={{
                    position: 'relative',
                    width: '100%',
                    paddingTop: '56.25%', // 16:9 Aspect Ratio
                    backgroundColor: 'black'
                }}>

                    {/* Loading icon */}
                    {isLoading ? (
                        <Box sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <CircularProgress sx={{ color: theme.palette.secondary.main }} />
                        </Box>
                    ) : (

                        // {/* Video thumbnail */}
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
                    )}
                </Box>

                {/* Bottom text */}
                <CardContent
                    sx={{
                        padding: 1,
                        paddingLeft: 2,
                        display: 'flex',
                        flexDirection:'column',
                        alignItems: 'flex-start',
                        backgroundColor: theme.palette.background.main
                }}>
                    <Typography variant="boby1" sx={{fontWeight: '600'}}>
                        {clip.title}
                    </Typography>
                    <Typography variant="subtitle2">
                        {formatDate(clip.creationDate)}
                    </Typography>
                </CardContent>

            </CardActionArea>
        </Card>
    );
}

export default ClipCard;