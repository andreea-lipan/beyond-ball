import Layout from "../components/Layout.jsx";
import {Button, Tooltip, Typography} from "@mui/material";
import {TestComponent} from "../components/TestComponent.jsx";

const TeamPage = () => {
    return (
        <Layout>
            <TestComponent text={"Team"}/>
        </Layout>
    )
}

export default TeamPage;