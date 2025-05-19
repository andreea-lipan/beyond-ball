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
    Box, useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
<<<<<<< HEAD
import Layout from "../components/Layout.jsx";
import { useAuth } from "../components/AuthContext";
import EmailService from "../APIs/EmailService.js";

const mockTeam = [
  { id: 1, name: "Lionel Messi", email: "andraursa@gmail.com", username: "messi10", password: "pass123", role: "Player", position: "Bench", goals: 2, assists: 0, active: true },
  { id: 2, name: "Laura James", email: "laura@example.com", username: "laura", password: "pass456", role: "Technical Staff", position: "Analyst", goals: 0, assists: 0, active: true },
  { id: 3, name: "Jamie Vardy", email: "vardy@example.com", username: "vardy9", password: "pass789", role: "Player", position: "Striker", goals: 5, assists: 1, active: true },
  { id: 4, name: "Chris Walker", email: "chris@example.com", username: "coachchris", password: "pass999", role: "Technical Staff", position: "Coach", goals: 0, assists: 0, active: true },
];
=======
import {Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material";
import Layout from "../components/sidebar/Layout.jsx";
import {useAuth} from "../components/AuthContext";
import UserService from "../APIs/UserService.js";
import Storage from "../utils/Storage.js";
import AddMemberDialog from "./AddMemberDialog.jsx";
import AuthService from "../APIs/AuthService.js";
import MemberCredentialsDialog from "./MemberCredentialsDialog.jsx";
import useModal from "../components/modals/useModal.js";
import CardActionArea from "@mui/material/CardActionArea";

>>>>>>> 51e0058a87872a1324a021a78994037f455ce610

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

<<<<<<< HEAD
  const handleToggleActive = (id) => {
    setTeam(prev =>
        prev.map(member =>
            member.id === id ? { ...member, active: !member.active } : member
        )
    );
  };

  const handleResendEmail = async (member) => {
    try {
      await EmailService.resendEmail({
        email: member.email,
        username: member.username,
        password: member.password
      });
      alert(`Email sent to ${member.email}`);
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to send email.");
    }
  };


  const handleFilterChange = (event, newFilter) => {
    if (newFilter) setFilter(newFilter);
  };

  const filteredTeam = team.filter(member =>
      member.role === filter && member.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
      <Layout>
        <Typography variant="h3" align="center" gutterBottom sx={{ color: "#2e7d32", mt: 3 }}>
          Manage Team {teamName}
        </Typography>

        <Box sx={{
          backgroundColor: "#9ca3af",
          padding: 3,
          borderRadius: "16px 16px 0 0",
          marginX: 4,
          marginTop: 4,
        }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}>
            <ToggleButtonGroup
                value={filter}
                exclusive
                onChange={handleFilterChange}
                aria-label="Role Filter"
            >
              <ToggleButton value="Player">Players</ToggleButton>
              <ToggleButton value="Technical Staff">Technical Staff</ToggleButton>
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
                  "& .MuiOutlinedInput-root": {
                    borderRadius: '25px',
                    boxShadow: "none",
                  },
                  "& fieldset": {
                    border: "none",
                  },
                }}
                InputProps={{
                  startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                  )
                }}
            />

            <Button variant="outlined" sx={{ color: "#374151", borderColor: "#374151" }}>
              Upload data from Excel
            </Button>
          </Box>
        </Box>

        <Box sx={{
          backgroundColor: "#d1d5db",
          padding: 3,
          borderRadius: "0 0 16px 16px",
          marginX: 4,
        }}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card sx={{
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
                "&:hover": { boxShadow: "0 6px 18px rgba(0,0,0,0.2)" }
              }}>
                <Typography variant="h5" textAlign="center">＋<br />New player</Typography>
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
                    "&:hover": { boxShadow: "0 6px 18px rgba(0,0,0,0.2)" }
                  }}>
                    <Avatar
                        src="https://upload.wikimedia.org/wikipedia/commons/b/b8/Lionel_Messi_20180626.jpg"
                        alt={member.name}
                        sx={{ width: 56, height: 56, mb: 1 }}
                    />
                    <Typography variant="h6">{member.name}</Typography>
                    <Typography variant="body2">Position: {member.position}</Typography>
                    <Typography variant="body2">Goals: {member.goals}</Typography>
                    <Typography variant="body2">Assists: {member.assists}</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleResendEmail(member)}
                        sx={{ mt: 1 }}
                    >
                      Resend Email
                    </Button>
                    <IconButton
                        onClick={() => handleToggleActive(member.id)}
                        color="secondary"
                        title="Set Inactive"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Card>
                </Grid>
            ))}
          </Grid>
        </Box>
      </Layout>
  );
=======
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
>>>>>>> 51e0058a87872a1324a021a78994037f455ce610
};

export default TeamAdminPage;
