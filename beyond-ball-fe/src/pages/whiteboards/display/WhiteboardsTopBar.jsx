import {Box, InputAdornment, TextField, ToggleButton, ToggleButtonGroup, useTheme} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

const WhiteboardsTopBar = ({search, setSearch, filter, setFilter}) => {
    const theme = useTheme();

    const handleFilterChange = (event, newFilter) => {
        if (newFilter) setFilter(newFilter);
    };

    return(
        <Box sx={{
            backgroundColor: theme.palette.secondary.main,
            padding: 3,
            borderRadius: "16px 16px 0 0",
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 2,
            }}>
                <ToggleButtonGroup
                    value={filter}
                    exclusive
                    onChange={handleFilterChange}
                    aria-label="Role Filter"
                >
                    <ToggleButton value="title">Title</ToggleButton>
                    <ToggleButton value="author">Author</ToggleButton>
                </ToggleButtonGroup>

                <TextField
                    placeholder={`Search whiteboards by ${filter}`}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    sx={{
                        width: '400px',
                        backgroundColor: theme.palette.background.main,
                        borderRadius: 5,
                        boxShadow: "none",
                        "& .MuiOutlinedInput-root": {
                            borderRadius: '25px',
                            boxShadow: "none",
                        },
                        "& fieldset": {
                            border: "none",
                        },
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon/>
                                </InputAdornment>
                            )
                        }
                    }}
                />

            </Box>
        </Box>
    )
}

export default WhiteboardsTopBar;