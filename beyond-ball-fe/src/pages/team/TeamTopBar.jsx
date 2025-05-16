import {Box, InputAdornment, TextField, ToggleButton, ToggleButtonGroup, useTheme} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import {useAuth} from "../../components/AuthContext.jsx";

const TeamTopBar = ({search, setSearch, filter, setFilter}) => {
    const { role, teamId } = useAuth();
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
                    <ToggleButton value="Player">Players</ToggleButton>
                    <ToggleButton value="Technical Staff">Technical Staff</ToggleButton>
                </ToggleButtonGroup>

                <TextField
                    placeholder="Search players by name"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    sx={{
                        width: '400px',
                        backgroundColor: theme.palette.primary.main,
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

export default TeamTopBar