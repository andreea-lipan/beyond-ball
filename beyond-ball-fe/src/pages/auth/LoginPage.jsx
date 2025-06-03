import Layout from "../../components/sidebar/Layout.jsx";
import {
    CssBaseline,
    Paper,
    TextField,
    Typography,
    Button,
    Box, InputAdornment, IconButton,
} from "@mui/material";
import { Global } from "@emotion/react";
import backgroundImage from "../../assets/background_01.jpg";
import React, { useState } from "react";
import authService from "../../APIs/AuthService.js";
import { useNavigate } from "react-router-dom";
import Storage from "../../utils/Storage.js";
import { Popup } from "../../components/popup/Popup.jsx";
import { MessageType } from "../../components/popup/MessageType.js";
import { useAuth } from "../../components/AuthContext.jsx";
import SendIcon from "@mui/icons-material/Send";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [popupType, setPopupType] = useState(MessageType.info);
    const [showPassword, setShowPassword] = useState(false)
    const [capsLockOn, setCapsLockOn] = useState(false)
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
                    navigate("/team");
                } else {
                    navigate("/whiteboards");
                }
            }, 100); // matches popup duration
    
        } catch (err) {
            setPopupMessage("Login failed. Check your credentials.");
            setPopupType(MessageType.error);
            setPopupOpen(true);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleLogin(e);
        }
    }

    const checkCaps = (e) => {
        e.getModifierState("CapsLock")?
            setCapsLockOn(true)
            :
            setCapsLockOn(false)
    }

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
                    <Typography variant="h5" sx={{ fontWeight: "light", mb: 1 }}>
                        Welcome to
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, pb:3 }}>
                        BeyondBall
                    </Typography>

                    <TextField
                        onKeyDown={handleKeyDown}
                        fullWidth
                        label="Username"
                        variant="outlined"
                        value={username}
                        onKeyDownCapture={checkCaps}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        onKeyDown={handleKeyDown}
                        fullWidth
                        label="Password"
                        type={showPassword? "text" : "password"}
                        variant="outlined"
                        value={password}
                        onKeyDownCapture={checkCaps}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ mb: 2 }}
                        slotProps={{
                            input:{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword? <VisibilityOff/> : <Visibility/> }
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }
                        }}
                    />
                    <Typography visibility={capsLockOn ? "visible" : "hidden"}
                        variant="subtitle1"
                        sx = {{
                            height: "10px"
                        }}
                    >
                        Caps Lock is turned on!
                    </Typography>
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
    duration={popupType === MessageType.success ? 100 : 3000} // closes after 1 second on success, 3 on fail
    />
    )}

        </>
    );
};

export default LoginPage;
