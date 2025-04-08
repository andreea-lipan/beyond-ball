import {
    CssBaseline,
    Paper,
    TextField,
    Typography,
    Button,
    Box,
} from "@mui/material";
import { Global } from "@emotion/react";
import backgroundImage from "../../assets/background_01.jpg";
import axios from "axios";
import { useState } from "react";

const TeamRegisterPage = () => {
    const [teamName, setTeamName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        try {
            const response = await axios.post("http://localhost:8080/auth/team-signup", {
                teamName,
                username,
                password,
            });

            alert("Team registered successfully!");
            console.log(response.data);
        } catch (error) {
            console.error("Registration error:", error);
            alert(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <>
            <CssBaseline />
            <Global
                styles={{
                    body: { background: "transparent !important" },
                    "#root": { background: "transparent !important" },
                }}
            />
            <Box
                sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    zIndex: -1,
                }}
            />
            <Box
                sx={{
                    minHeight: "100vh",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Paper
                    elevation={5}
                    sx={{
                        width: 350,
                        p: 4,
                        bgcolor: "rgba(255, 255, 255, 0.9)",
                        borderRadius: 2,
                        textAlign: "center",
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: "light", mb: 1 }}>
                        Welcome to
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                        BeyondBall
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ mb: 3, color: "black", fontSize: "0.75rem" }}
                    >
                        Here you can create an account for your team and then create
                        accounts for all your team's players.
                    </Typography>

                    <TextField
                        label="Team Name"
                        fullWidth
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        variant="filled"
                        sx={{ mb: 2, "& .MuiFilledInput-root": { borderRadius: 2 } }}
                    />
                    <TextField
                        label="Team Account Username"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        variant="filled"
                        sx={{ mb: 2, "& .MuiFilledInput-root": { borderRadius: 2 } }}
                    />
                    <TextField
                        label="Team Account Password"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        variant="filled"
                        sx={{ mb: 3, "& .MuiFilledInput-root": { borderRadius: 2 } }}
                    />

                    <Typography
                        variant="caption"
                        sx={{ mb: 2, display: "block", color: "black", fontSize: "0.65rem" }}
                    >
                        You will use these credentials to log in to your team account where
                        as an admin you can manage your team members.
                    </Typography>

                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ borderRadius: 2 }}
                        onClick={handleSubmit}
                    >
                        Create team
                    </Button>
                </Paper>
            </Box>
        </>
    );
};

export default TeamRegisterPage;
