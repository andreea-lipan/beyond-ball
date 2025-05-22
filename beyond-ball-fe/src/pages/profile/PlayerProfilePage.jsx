import Layout from "../../components/sidebar/Layout.jsx";
import {TestComponent} from "../../components/TestComponent.jsx";
import {Box, Typography} from "@mui/material";
import TeamTopBar from "../team/TeamTopBar.jsx";
import TeamContainer from "../team/TeamContainer.jsx";
import React from "react";
import {PlayerProfileContainer} from "./PlayerProfileContainer.jsx";

const PlayerProfilePage = () => {
    const userName = "Alex" + "'s";
    const player = null;

    return (
        <Layout>
            <Typography variant="h1" align="center" sx={{ mt: 3, mb: 3 }}>
                {userName} Profile
            </Typography>

            <Box sx={{
                width: {
                    // xs: '100%',
                    sm: '70vw',
                    xl: '70vw',
                    xxl: '1900px',
                },
                display: 'flex',
                flexDirection: 'column',
                minHeight: 'calc(100vh - 143px)', // Account for header and title
            }}>
                <PlayerProfileContainer player={player}/>
            </Box>
        </Layout>
    )
}

export default PlayerProfilePage;