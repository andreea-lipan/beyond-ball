import React, {useState, useEffect} from "react";
import {
    Card,
    Typography,
    IconButton,
    Avatar,
    Grid,
    TextField,
    InputAdornment,
    Button,
    ToggleButton,
    ToggleButtonGroup,
    Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import {Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material";
import Layout from "../components/Layout.jsx";
import {useAuth} from "../components/AuthContext";
import UserService from "../APIs/UserService.js";
import Storage from "../utils/Storage.js";
import AddMemberDialog from "./AddMemberDialog.jsx";
import AuthService from "../APIs/AuthService.js";
import MemberCredentialsDialog from "./MemberCredentialsDialog.jsx";
import useModal from "../components/modals/useModal.js";


const TeamAdminPage = () => {
    const {role} = useAuth();
    const teamId = Storage.getTeamIdFromToken(); // or useAuth().teamId;
    const [team, setTeam] = useState([]);

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

    const handleFilterChange = (event, newFilter) => {
        if (newFilter) setFilter(newFilter);
    };

    const filteredTeam = team.filter(member =>
        member.role === filter && member.name?.toLowerCase().includes(search.toLowerCase())
    ).sort((a,b) => b.active - a.active);



    return (
        <Layout>
            <Typography variant="h3" align="center" gutterBottom sx={{color: "#2e7d32", mt: 3}}>
                Manage Team {teamName}
            </Typography>

            <Box sx={{backgroundColor: "#9ca3af", padding: 3, borderRadius: "16px 16px 0 0", marginX: 4, marginTop: 4}}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 2
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
                            backgroundColor: "#ffffff",
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

            <Box sx={{backgroundColor: "#d1d5db", padding: 3, borderRadius: "0 0 16px 16px", marginX: 4}}>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Card
                            onClick={addMemberModal.openModal}
                            sx={{
                                backgroundColor: "#ffffff",
                                borderRadius: "16px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                padding: "16px",
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                cursor: "pointer",
                                transition: "0.3s",
                                "&:hover": {boxShadow: "0 6px 18px rgba(0,0,0,0.2)"}
                            }}>
                            <Typography variant="h5" textAlign="center">＋<br/>New player</Typography>
                        </Card>
                    </Grid>

                    {filteredTeam.map((member) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={member.id}>
                            <Card sx={{
                                backgroundColor: member.active ? "#ffffff" : "#e0e0e0",
                                borderRadius: "16px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                padding: "16px",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                transition: "0.3s",
                                "&:hover": {boxShadow: "0 6px 18px rgba(0,0,0,0.2)"}
                            }}>
                                <Avatar alt={member.name} sx={{width: 56, height: 56, mb: 1}}/>
                                <Typography variant="h6">{member.name}</Typography>
                                <Typography variant="body2">Position: {member.position || 'N/A'}</Typography>
                                <Typography variant="body2">Goals: {member.goals}</Typography>
                                <Typography variant="body2">Assists: {member.assists}</Typography>
                                <IconButton onClick={() => handleToggleActive(member.id)} color="secondary"
                                            title="Set Inactive">
                                    <DeleteIcon/>
                                </IconButton>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <AddMemberDialog state={addMemberModal} addMember={handleAddMember} role={filter}/>

            <MemberCredentialsDialog state={credentialsModal} credentials={credentials} />
        </Layout>
    );
};

export default TeamAdminPage;
