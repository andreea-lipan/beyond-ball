import Layout from "../components/Layout.jsx";
import {Typography} from "@mui/material";
import {TestComponent} from "../components/TestComponent.jsx";

const PlayerProfilePage = () => {
    return (
        <Layout>
            <TestComponent text={"Profile"}/>
        </Layout>
    )

}

export default PlayerProfilePage;