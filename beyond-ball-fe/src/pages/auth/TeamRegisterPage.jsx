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
import {useNavigate} from "react-router-dom";
import {LOGIN_PAGE} from "../../utils/UrlConstants.js";
import TimedPopup from "../../components/popup/TimedPopup.jsx";

const TeamRegisterPage = () => {
    const [teamName, setTeamName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [isPopupVisible, setIsPopupVisible] = useState(false)
    const [popupMessage, setPopupMessage] = useState("")
    const [popupMessageType, setPopupMessageType] = useState("")

    const handleSubmit = async () => {
        authService.registerTeam({teamName, username, password})
            .then(res => {
                console.log(res)
                setPopupMessageType("success")
                setPopupMessage("Team registered successfully")
                setIsPopupVisible(true)
            })
            .catch(error => {
                console.log(error);
                // alert(error.response?.data?.message || "Registration failed");
                //todo should show a more intuitive message here
                // like if username is taken or password is too short
                setPopupMessageType("error")
                setPopupMessage("Registration failed")
                setIsPopupVisible(true)
            })
    };

    return (
        <>
            {isPopupVisible && (<TimedPopup message={popupMessage} isVisible={isPopupVisible} setIsVisible={setIsPopupVisible}
                                            messageType={popupMessageType} redirect={LOGIN_PAGE}></TimedPopup>)}
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
                        bgcolor: "rgba(255, 255, 255, 1)",
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
                        disabled={isPopupVisible}
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
