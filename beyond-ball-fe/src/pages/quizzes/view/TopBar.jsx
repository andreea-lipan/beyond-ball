import {Box, Button, Paper, TextField, Typography, useTheme} from "@mui/material";
import Storage from "../../../utils/Storage.js";
import SearchBar from "../../../components/SearchBar.jsx";

export const TopBar = ({searchTerm, setSearchTerm, handleAddQuiz, quizzes}) => {
    const theme = useTheme();
    const role = Storage.getRoleFromToken(); // Get role from token
    const showAddButton = role === "STAFF" || role === "ADMIN"; // Check permission
    const completedQuizzes = quizzes.filter(quiz => quiz.completed).length;
    const totalQuizzes = quizzes.length;

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

                {showAddButton === true?
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
                    :
                    <Typography variant="body1" sx={{color: theme.palette.text.secondary}}>
                        {completedQuizzes} / {totalQuizzes} quizzes completed
                    </Typography>
                }
            </Box>
        </Box>
    )
}