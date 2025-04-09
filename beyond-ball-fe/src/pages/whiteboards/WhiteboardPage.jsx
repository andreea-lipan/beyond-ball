import Layout from "../../components/Layout.jsx";
import {Typography} from "@mui/material";
import {TestComponent} from "../../components/TestComponent.jsx";
import {Whiteboard} from "./creation/Whiteboard.jsx";
import ResizableCanvas from "./creation/ResizableCanvas.jsx";
import {Whiteboard2} from "./creation/Whiteboard2.jsx";

const WhiteboardsPage = () => {
    return (
        <Layout>
            <Whiteboard/>
        </Layout>
    )

}

export default WhiteboardsPage;