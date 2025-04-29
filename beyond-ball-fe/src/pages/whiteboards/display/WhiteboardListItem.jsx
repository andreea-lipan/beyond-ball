import {useEffect, useState} from "react";
import whiteboardService from "../../../APIs/WhiteboardService.js";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export const WhiteboardListItem = ({whiteboard}) => {

    const [image, setImage] = useState(null);

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
        <Card sx={{display: "flex", justifyContent: "space-arround", mt: 5, maxWidth: 280, borderRadius: 5}}>
            <CardActionArea>
                <CardMedia sx={{objectFit: "contain"}}
                           component="img"
                           image={image}
                />
                <CardContent>
                    <Typography component="div">
                        {whiteboard.title}
                    </Typography>
                    <Typography variant="body2">
                        {formatDate(whiteboard.creationDate)}
                    </Typography>
                    <Typography variant="body2">
                        Author: {whiteboard.author ?? "Unknown"}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}