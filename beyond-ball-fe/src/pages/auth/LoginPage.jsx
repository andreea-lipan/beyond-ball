import Layout from "../../components/Layout.jsx";
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
import { useState } from "react";
import authService from "../../APIs/AuthService.js";
import { useNavigate } from "react-router-dom";
import Storage from "../../utils/Storage.js";
import { Popup } from "../../components/popup/Popup.jsx";
import { MessageType } from "../../components/popup/MessageType.js";
import { useAuth } from "../../components/AuthContext.jsx";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [popupType, setPopupType] = useState(MessageType.info);
    const navigate = useNavigate();
    const { refreshAuth } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await authService.login(username, password);
            refreshAuth();
    
            setPopupMessage("Login successful!");
            setPopupType(MessageType.success);
            setPopupOpen(true);
    
            setTimeout(() => {
                const role = Storage.getRoleFromToken();
    
                if (role === "ADMIN") {
                    navigate("/mock");
                } else {
                    navigate("/whiteboards");
                }
            }, 1000); // matches popup duration
    
        } catch (err) {
            setPopupMessage("Login failed. Check your credentials.");
            setPopupType(MessageType.error);
            setPopupOpen(true);
        }
    };

    return (
        <>
            <CssBaseline />
            <Global
                styles={{
                    body: {
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    },
                }}
            />
            <Box
                sx={{
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Paper
                    elevation={6}
                    sx={{
                        p: 4,
                        width: 400,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: "light", mb: 1 }}>
                        Welcome to
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                        BeyondBall
                    </Typography>

                    <TextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ mb: 2 }}
                    />

                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleLogin}
                        sx={{ mb: 2 }}
                    >
                        Login
                    </Button>

                    <Typography variant="body2">
                        Want to make an account for your team?{" "}
                        <a href="/register-team">Sign up here!</a>
                    </Typography>
                </Paper>
            </Box>
            {popupOpen && (
  <Popup
    isVisible={popupOpen}
    setIsVisible={setPopupOpen}
    message={popupMessage}
    messageType={popupType}
    duration={popupType === MessageType.success ? 1000 : 3000} // closes after 1 second on success, 3 on fail
    />
    )}

        </>
    );
};

export default LoginPage;
