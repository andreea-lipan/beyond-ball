import React, {useEffect, useState} from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import Layout from "../components/sidebar/Layout.jsx";
import {useAuth} from "../components/AuthContext";
import UserService from "../APIs/UserService.js";
import Storage from "../utils/Storage.js";
import AddMemberDialog from "./AddMemberDialog.jsx";
import AuthService from "../APIs/AuthService.js";
import MemberCredentialsDialog from "./MemberCredentialsDialog.jsx";
import useModal from "../components/modals/useModal.js";
import EmailService from "../APIs/EmailService.js";


const TeamAdminPage = () => {
    const {role} = useAuth();
    const teamId = Storage.getTeamIdFromToken(); // or useAuth().teamId;
    const [team, setTeam] = useState([]);
    const theme = useTheme();

    const addMemberModal = useModal();
    const credentialsModal = useModal();

    const [teamName, setTeamName] = useState("");
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("PLAYER");
    const [credentials, setCredentials] = useState({username: "", password: ""});

    useEffect(() => {
        if (teamId) {
            fetchTeamData();
        }
    }, [teamId]);

    const fetchTeamData = async () => {
        try {
            const response = await UserService.getTeamMembersForAdmin(teamId);
            setTeam(response.members);
            setTeamName(response.teamName);
        } catch (error) {
            console.error("Failed to fetch team data", error);
        }
    };

    const handleAddMember = (member) => {

        const randomTwoDigit = Math.floor(10 + Math.random() * 90)
        const username = (member.firstName + member.lastName + randomTwoDigit).toLowerCase().replace(/\s/g, "")

        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        let password = ""
        for (let i = 0; i < 8; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length))
        }

        setCredentials({username, password})

        const newMember = {
            username: username,
            password: password,
            teamId: teamId,
            firstname: member.firstName,
            lastname: member.lastName,
            role: filter,
            position: member.position || "",
            email: member.email,
            active: true,
        }
        console.log(newMember)
        credentialsModal.openModal()
        AuthService.addTeamMember(newMember).then(() => {
            fetchTeamData();
            credentialsModal.openModal()
        })

    }

    const handleToggleActive = (id) => {
        const member = team.find(member => member.id === id);
        if (!member) return;
        UserService.changeActiveStatus(id, !member.active).then(() => {
            setTeam(prev =>
                prev.map(member =>
                    member.id === id ? {...member, active: !member.active} : member
                )
            );
        })
    };

    const handleResendEmail = async (member) => {
        try {
            await EmailService.resendEmail({
                email: member.email,
                username: member.username,
                password: member.password
            });
            alert(`Email sent to ${member.username}`);
        } catch (err) {
            console.error(err);
            alert(err.response?.data || "Failed to send email.");
        }
    };


    const handleFilterChange = (event, newFilter) => {
        if (newFilter) setFilter(newFilter);
    };

    const filteredTeam = team.filter(member =>
        member.role === filter && member.name?.toLowerCase().includes(search.toLowerCase())
    ).sort((a, b) => b.active - a.active);


    return (
        <Layout>
            <Typography variant="h1" align="center" sx={{mt: 3, mb: 3}}>
                Manage your team
            </Typography>

            <Box sx={{
                width: {
                    xs: '100%',
                    sm: '90vw',
                    xl: '80vw',
                    xxl: '1900px',
                },
                display: 'flex',
                flexDirection: 'column',
                minHeight: 'calc(100vh - 143px)', // Account for header and title
            }}>

                {/* Top Bar */}
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
                        <ToggleButtonGroup value={filter} exclusive onChange={handleFilterChange}>
                            <ToggleButton value="PLAYER">Players</ToggleButton>
                            <ToggleButton value="STAFF">Technical Staff</ToggleButton>
                        </ToggleButtonGroup>

                        <TextField
                            placeholder="Search players by name"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            sx={{
                                width: '400px',
                                backgroundColor: theme.palette.background.main,
                                borderRadius: 5,
                                boxShadow: "none",
                                "& .MuiOutlinedInput-root": {borderRadius: '25px', boxShadow: "none"},
                                "& fieldset": {border: "none"},
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon/>
                                    </InputAdornment>
                                )
                            }}
                        />

                        <Button variant="outlined" sx={{color: "#374151", borderColor: "#374151"}}>
                            Upload data from Excel
                        </Button>
                    </Box>
                </Box>

                {/* Team container */}
                <Box sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: "0 0 16px 16px",
                    padding: "24px 5px 24px 5px",
                    flex: 1,
                }}>
                    <Grid container spacing={3} justifyContent="center">
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Card
                                onClick={addMemberModal.openModal}
                                sx={{
                                    width: '200px',
                                    backgroundColor: "#ffffff",
                                    borderRadius: "16px",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                    padding: "16px",
                                    height: "100%",
                                    minHeight: '250px',
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    transition: "0.3s",
                                    "&:hover": {boxShadow: "0 6px 18px rgba(0,0,0,0.5)"}
                                }}>

                                <Typography variant="h5" textAlign="center">＋<br/>New {filter==='PLAYER' ? 'Player' : 'Staff Member'}</Typography>
                            </Card>
                        </Grid>

                        {filteredTeam.map((member) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={member.id}>
                                <Card sx={{
                                    width: '200px',
                                    backgroundColor: member.active ? "#FFFFFF" : "#e0e0e0",
                                    borderRadius: "16px",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                    padding: "16px",
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    transition: "0.3s",
                                    "&:hover": {boxShadow: "0 6px 18px rgba(0,0,0,0.8)"}
                                }}>

                                    {/*<Box sx={{*/}
                                    {/*    display: 'flex',*/}
                                    {/*    flexDirection: "column",*/}
                                    {/*    alignItems: "center",*/}
                                    {/*    justifyContent: 'center'*/}
                                    {/*}}>*/}
                                    <Avatar alt={member.name} sx={{width: 56, height: 56, mb: 1}}/>

                                    {/* Name */}
                                    <Typography variant="h2"
                                                sx={{padding: '0.2em 0 0.4em 0'}}>{member.name}</Typography>
                                    {/*</Box>*/}


                                    {/* Stats */}
                                    <Box>
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between'
                                        }}>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'flex-start',
                                                paddingRight: '10px'
                                            }}>
                                                <Typography variant="subtitle1">Position:</Typography>
                                                {member.role === "PLAYER" &&
                                                    <>
                                                        <Typography variant="subtitle1">Goals:</Typography>
                                                        <Typography variant="subtitle1">Assists:</Typography>
                                                    </>
                                                }
                                            </Box>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'flex-end',
                                                paddingLeft: '10px'
                                            }}>
                                                <Typography variant="subtitle1">{member?.position || 'N/A'}</Typography>
                                                {member.role === "PLAYER" &&
                                                    <>
                                                        <Typography
                                                            variant="subtitle1">{member?.goals || 'N/A'}</Typography>
                                                        <Typography
                                                            variant="subtitle1">{member?.assists || 'N/A'}</Typography>
                                                    </>
                                                }
                                            </Box>

                                        </Box>
                                        <Box>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                onClick={() => handleResendEmail(member)}
                                                sx={{ mt: 1, color: theme.palette.secondary.main, borderColor: theme.palette.secondary.main }}
                                            >
                                                Resend Email
                                            </Button>
                                        </Box>
                                        {/* Archive */}
                                        <IconButton onClick={() => handleToggleActive(member.id)} color="secondary"
                                                    title="Set Inactive">
                                            <DeleteIcon/>
                                        </IconButton>
                                    </Box>

                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>

            {/* Add players dialog */}
            <AddMemberDialog state={addMemberModal} addMember={handleAddMember} role={filter}/>

            {/* Show added players credentials */}
            <MemberCredentialsDialog state={credentialsModal} credentials={credentials}/>
        </Layout>
    );
};

export default TeamAdminPage;