import {WHITEBOARD_ENDPOINTS} from "../../../APIs/Endpoints.js";
import {useEffect, useState} from "react";
import whiteboardService from "../../../APIs/WhiteboardService.js";

export const WhiteboardListItem = ({whiteboard}) => {

    const [image, setImage] = useState(null);

    useEffect(() => {
        whiteboardService.getWhiteboardImage(whiteboard.imageUrl).then((response) => {
            console.log(response);
            setImage(response)
        })
    }, []);


    //TODO: this is just a way to use the backend response, needs to look like the design
    return (
        <div key={whiteboard.id} style={{margin: "10px"}}>
            <img src={image} alt="Whiteboard"
                 style={{width: "300px", height: "auto"}}/>
            <p>{whiteboard.title}</p>
        </div>
    )
}