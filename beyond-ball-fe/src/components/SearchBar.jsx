import React, {useEffect, useState} from 'react';
import {TextField, InputAdornment, IconButton, useTheme} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({onSearch, searchTerm, setSearchTerm}) => {
    const [debounceTimeout, setDebounceTimeout] = useState(null);
    const theme = useTheme();

    const handleSearch = (term) => {
        console.log(term)
        if (onSearch) {
            onSearch(term);
        }
    };

    const handleSearchPress = () => {
        handleSearch(searchTerm);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(searchTerm);
        }
    };

    const handleChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        console.log(term)
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }
        const timeout = setTimeout(() => {
            console.log("start serach")
            handleSearch(term);
        }, 200);
        setDebounceTimeout(timeout);
    };

    useEffect(() => {
        return () => {
            if (debounceTimeout) {
                clearTimeout(debounceTimeout);
            }
        };
    }, [debounceTimeout]);

    return (
        <TextField
            variant="outlined"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            fullWidth
            sx={{
                width: '100%',
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
                            <IconButton
                                onClick={handleSearchPress}>
                                <SearchIcon
                                />
                            </IconButton>
                        </InputAdornment>
                    ),
                }
            }}
        />
    );
};

export default SearchBar;