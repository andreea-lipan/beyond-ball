import Layout from "../../components/Layout.jsx";
import {useEffect, useState} from "react";
import whiteboardService from "../../APIs/WhiteboardService.js";
import {WHITEBOARD_ENDPOINTS} from "../../APIs/Endpoints.js";
import {Box} from "@mui/material";
import {WhiteboardListItem} from "./display/WhiteboardListItem.jsx";

const WhiteboardsPage = () => {

    const [whiteboards, setWhiteboards] = useState([]);

    useEffect(() => {
        whiteboardService.getWhiteboards().then((response) => {
            console.log(response);
            setWhiteboards(response.data);
        })
    },[]);

    //TODO: this is just a way to use the backend response, needs to look like the design
    return (
        <Layout>
            <Box style={{display: "flex", flexWrap: "wrap"}}>
                {whiteboards?.map((whiteboard) => (
                    <WhiteboardListItem whiteboard={whiteboard} />
                ))}
            </Box>
        </Layout>
    )

}

export default WhiteboardsPage;