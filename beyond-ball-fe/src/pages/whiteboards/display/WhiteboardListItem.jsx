import {useEffect, useState} from "react";
import whiteboardService from "../../../APIs/WhiteboardService.js";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import {Box} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {WHITEBOARD_DETAILS} from "../../../utils/UrlConstants.js";

export const WhiteboardListItem = ({whiteboard}) => {

    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        whiteboardService.getWhiteboardImage(whiteboard.imageUrl).then((response) => {
            setImage(response)
        })
            .catch(() => {
                setImage(whiteboard.imageUrl)
            })
    }, []);

    const formatDate = (isoString) => {
        const date = new Date(isoString)
        return date.toLocaleDateString("de-DE")
    }

    //TODO: this is just a way to use the backend response, needs to look like the design

    return (
        <Card sx={{display: "flex", height: '240px', justifyContent: "space-arround",
        // margin: "10px", 
        maxWidth: 280, borderRadius: 5}}>
            <CardActionArea onClick={() => {navigate(WHITEBOARD_DETAILS(whiteboard.id))}}>
                <CardMedia sx={{objectFit: "contain", scale: '95%'}}
                           component="img"
                           image={image}
                />
                <CardContent sx={{padding: 0}}>
                    <Typography variant="body1">
                        {whiteboard.title}
                    </Typography>
                    <Box sx={{display: "flex", justifyContent: "space-between", padding: "0 17px 5px 17px"}}>
                        <Typography variant="subtitle2">
                            {formatDate(whiteboard.creationDate)}
                        </Typography>
                        <Typography variant="subtitle2">
                            by: {whiteboard.author ?? "Unknown"}
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}