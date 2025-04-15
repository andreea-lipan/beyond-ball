import {Button, Paper, TextField} from "@mui/material";


export const TopBar = ({handleSearch, handleAddQuiz})=>{

    return (
        <Paper
            elevation={3}
            sx={{
                p: 2,
                display: "flex",
                width: "60vw",
                alignItems: "center",
                gap: 2,
                borderRadius: "10px",
                mb: 1,
                backgroundColor: "secondary.main",
            }}
        >

            <TextField
                variant="outlined"
                size="small"
                placeholder="Search quizzes..."
                onChange={handleSearch}
                sx={{ minWidth: 400, backgroundColor: "background.main", borderRadius: "5px" }}
            />

            <Button
                variant="contained"
                onClick={handleAddQuiz}
                sx={{ml: "auto", backgroundColor: "background.main", color:"black", "&:hover": { backgroundColor: "primary.dark" }}}
            >
                Add Quiz
            </Button>
        </Paper>
    )
}