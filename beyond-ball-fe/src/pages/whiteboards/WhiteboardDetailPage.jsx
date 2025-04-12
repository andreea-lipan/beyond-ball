import Layout from "../../components/Layout.jsx";
import {TestComponent} from "../../components/TestComponent.jsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import whiteboardService from "../../APIs/WhiteboardService.js";
import {WHITEBOARD_ENDPOINTS} from "../../APIs/Endpoints.js";

const WhiteboardDetailPage = () => {

    const {id} = useParams();
    const [image, setImage] = useState(null);

    useEffect(() => {
        whiteboardService.getWhiteboard(id).then((response) => {
            console.log(response);
            setImage(WHITEBOARD_ENDPOINTS.BOARD_IMAGE(response.data.imageUrl));
            console.log(image)
        })
    })

    //TODO: this is just a way to use the backend response, needs to look like the design, including the comments
    return (
        <Layout>
            <img src={image} alt="Whiteboard" style={{width: "100%", height: "auto"}}/>
            <TestComponent text={`WhiteboardDetail ${id}`}/>
        </Layout>
    )

}

export default WhiteboardDetailPage;