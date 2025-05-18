import {Box, Button, Paper, TextField, useTheme} from "@mui/material";
import Storage from "../../utils/Storage";
import SearchBar from "../../components/SearchBar.jsx";

export const TopBar = ({searchTerm, setSearchTerm, handleAddQuiz}) => {
    const theme = useTheme();
    const role = Storage.getRoleFromToken(); // Get role from token
    const showAddButton = role === "STAFF" || role === "ADMIN"; // Check permission

    return (
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
                display: 'flex',
            }}>

                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

                {showAddButton && (
                    <Button
                        variant="contained"
                        onClick={handleAddQuiz}
                        sx={{
                            width: '200px',
                            // ml: "auto",
                            backgroundColor: "background.main",
                            color: theme.palette.text.primary,
                            "&:hover": {backgroundColor: "primary.main"}
                        }}
                    >
                        Create a new quiz
                    </Button>
                )}
            </Box>
        </Box>
    )
}