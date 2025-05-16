import {Avatar, Box, Card, Grid, IconButton, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import TeamList from "./TeamList.jsx";

const TeamContainer = ({team}) => {
    return(
        <Box sx={{
            backgroundColor: "#d1d5db",
            padding: 3,
            borderRadius: "0 0 16px 16px",
            marginX: 4,
        }}>
            <Grid container spacing={3} justifyContent="center">
                <TeamList team={team} />
            </Grid>
        </Box>
    )
}

export default TeamContainer;