import {Box, useTheme} from "@mui/material";
import SearchBar from "../../../components/SearchBar.jsx";
import React from "react";

const ClipsPageTopBar = ({searchTerm, setSearchTerm}) => {
    const theme = useTheme();

    return (
        <>
            <Box sx={{
                backgroundColor: theme.palette.secondary.main,
                padding: 3,
                borderRadius: "16px 16px 0 0",
            }}>
                <Box sx={{
                    margin: 'auto',
                    width: {
                        xs: '100%',    // full width on mobile
                        sm: '100%',   // 300px on tablet
                        myTablet: '70%',
                        md: '60%'
                    },
                    gap: 2,
                }}>
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                </Box>
            </Box>
        </>
    )
}

export default ClipsPageTopBar;