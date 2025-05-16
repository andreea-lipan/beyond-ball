import {Avatar, Box, Card, Grid, IconButton, Typography, useTheme} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import TeamList from "./TeamList.jsx";

const TeamContainer = ({team}) => {
    const theme = useTheme();

    return(
        <Box sx={{
            backgroundColor: theme.palette.primary.main,
            borderRadius: "0 0 16px 16px",
            padding: "24px 5px 24px 5px",
            flex: 1,
        }}>
            <Grid container spacing={3} justifyContent="center">
                <TeamList team={team} />
            </Grid>
        </Box>
    )
}

export default TeamContainer;