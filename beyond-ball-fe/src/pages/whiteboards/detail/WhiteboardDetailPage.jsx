import Layout from "../../components/sidebar/Layout.jsx";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import whiteboardService from "../../../APIs/WhiteboardService.js";
import {Box, Typography} from "@mui/material";
import WhiteboardCommentsContainer from "./comments/WhiteboardCommentsContainer.jsx";

const WhiteboardDetailPage = () => {

    const {id} = useParams();
    const [image, setImage] = useState(null);
    const [whiteboard, setWhiteboard] = useState(null);

    useEffect(() => {
        whiteboardService.getWhiteboard(id).then((response) => {
            console.log(response);
            setWhiteboard(response.data);
            whiteboardService.getWhiteboardImage(response.data.imageUrl).then((response) => {
                setImage(response)
            })
        })
    },[]);

    return (
        <Layout>
            <Typography variant="h1"
                        sx={{
                            paddingY: 3
                        }}
            >
                {whiteboard?.title}
            </Typography>

            {image &&
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 'auto',
                    height:'80vh'
                }}>
                    <ImageBox image={image} />
                    <WhiteboardCommentsContainer whiteboardId={id}/>
                </Box>
            }
        </Layout>
    )

}
const ImageBox = ({ image }) => {
    return (
        <Box sx={{
            height:'80vh'
        }}>
            <img className="whiteboard" src={image} alt={"whiteboard"} />
        </Box>
    );
};
export default WhiteboardDetailPage;