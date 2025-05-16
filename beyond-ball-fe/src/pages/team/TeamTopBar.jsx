import {Box, Button, InputAdornment, TextField, ToggleButton, ToggleButtonGroup} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../components/AuthContext.jsx";

const TeamTopBar = ({search, setSearch, filter, setFilter}) => {
    const { role, teamId } = useAuth();

    const handleFilterChange = (event, newFilter) => {
        if (newFilter) setFilter(newFilter);
    };

    return(
        <Box sx={{
            backgroundColor: "#9ca3af",
            padding: 3,
            borderRadius: "16px 16px 0 0",
            marginX: 4,
            marginTop: 4,
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
                    <ToggleButton value="Player">Players</ToggleButton>
                    <ToggleButton value="Technical Staff">Technical Staff</ToggleButton>
                </ToggleButtonGroup>

                <TextField
                    placeholder="Search players by name"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    sx={{
                        width: '400px',
                        backgroundColor: "#ffffff",
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
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                />

            </Box>
        </Box>
    )
}

export default TeamTopBar