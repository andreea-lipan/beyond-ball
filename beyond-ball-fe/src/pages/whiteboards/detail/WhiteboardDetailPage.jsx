import Layout from "../../components/sidebar/Layout.jsx";
import {TestComponent} from "../../components/TestComponent.jsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import whiteboardService from "../../../APIs/WhiteboardService.js";

const WhiteboardDetailPage = () => {

    const {id} = useParams();
    const [image, setImage] = useState(null);

    useEffect(() => {
        whiteboardService.getWhiteboard(id).then((response) => {
            console.log(response);
            whiteboardService.getWhiteboardImage(response.data.imageUrl).then((response) => {
                setImage(response)
            })
        })
    },[]);

    //TODO: this is just a way to use the backend response, needs to look like the design, including the comments
    return (
        <Layout>
            {image? <img src={image} alt="Whiteboard" style={{width: "100%", height: "auto"}}/> : <p>Loading...</p>}
            <TestComponent text={`WhiteboardDetail ${id}`}/>
        </Layout>
    )

}

export default WhiteboardDetailPage;