import React, { useState, useEffect } from "react";
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
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import Layout from "../components/Layout.jsx";
import { useAuth } from "../components/AuthContext";

const mockTeam = [
  { id: 1, name: "Lionel Messi", role: "Player", position: "Bench", goals: 2, assists: 0, active: true },
  { id: 2, name: "Laura James", role: "Technical Staff", position: "Analyst", goals: 0, assists: 0, active: true },
  { id: 3, name: "Jamie Vardy", role: "Player", position: "Striker", goals: 5, assists: 1, active: true },
  { id: 4, name: "Chris Walker", role: "Technical Staff", position: "Coach", goals: 0, assists: 0, active: true },
];

const TeamAdminPage = () => {

  const [openDialog, setOpenDialog] = useState(false);
  const [newPlayer, setNewPlayer] = useState({
    firstName: "",
    lastName: "",
    position: "",
    email: "",
  });

  const [team, setTeam] = useState(mockTeam);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Player");
  const { role, teamId } = useAuth();
  const [teamName, setTeamName] = useState("");

  useEffect(() => {
    const fetchTeamName = async () => {
      const fakeDatabase = {
        1: "muimui",
        2: "admin",
      };
      if (teamId) {
        setTeamName(fakeDatabase[teamId] || "Unknown Team");
      }
    };

    fetchTeamName();
  }, [teamId]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewPlayer({fistName: "", lastName: "", position: "", email: ""});
  }

  const handleAddPlayer = () => {
    const newId = mockTeam.length + 1;
    const fullName = `${newPlayer.firstName} ${newPlayer.lastName}`;

    const newMember = {
      id: newId,
      name: fullName,
      role: "Player", // maybe add a dropdown here to select the type? player/staff
      position: "Bench",
      goals: 0,
      assists: 0,
      active: true,
    };

    setTeam((prevTeam) => [...prevTeam, newMember]);
    setNewPlayer({ firstName: "", lastName: "", position: "", email: ""})
    handleCloseDialog();
  }

  const handleToggleActive = (id) => {
    setTeam(prev =>
      prev.map(member =>
        member.id === id ? { ...member, active: !member.active } : member
      )
    );
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
            <Card 
            onClick={handleOpenDialog}
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
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: '20px',
            padding: '32px 24px',
            backgroundColor: '#f3f4f6',
            width: '100%',
            maxWidth: '400px',
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)',
            textAlign: 'center',
          }
        }}
        >
        <DialogTitle sx= {{ mb: 1, fontWeight: 600, fontSize: '1.2rem', color: '#374151'}}>
          Add a<br /><span style={{ fontWeight: 700, fontSize: '1.6rem'}}>New Player</span></DialogTitle>
        
        <DialogContent>
          <Typography sx = {{ fontSize: '0.8rem', color: '#6b7280', mb: 3}}>
            Here you can create an account for one of your players
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2}}>
            <TextField
              placeholder="Player First Name"
              value={newPlayer.firstName}
              onChange={(e) => setNewPlayer({ ...newPlayer, firstName: e.target.value })}
              variant="outlined"
              fullWidth
              InputProps={{
                style: {
                  borderRadius: 12,
                  backgroundColor: '#cbd5e1',
                  textAlign: 'center',
                  height: '48px',
                  fontSize: '0.9rem'
                }
              }}
              inputProps={{ style: { textAlign: 'center' } }}
            />

            <TextField
              placeholder="Player Last Name"
              value={newPlayer.lastName}
              onChange={(e) => setNewPlayer({ ...newPlayer, lastName: e.target.value })}
              variant="outlined"
              fullWidth
              InputProps={{
                style: {
                  borderRadius: 12,
                  backgroundColor: '#cbd5e1',
                  textAlign: 'center',
                  height: '48px',
                  fontSize: '0.9rem'
                }
              }}
              inputProps={{ style: { textAlign: 'center' } }}
            />

            <TextField
              placeholder="Player Email"
              value={newPlayer.email}
              onChange={(e) => setNewPlayer({ ...newPlayer, email: e.target.value })}
              variant="outlined"
              fullWidth
              InputProps={{
                style: {
                  borderRadius: 12,
                  backgroundColor: '#cbd5e1',
                  textAlign: 'center',
                  height: '48px',
                  fontSize: '0.9rem'
                }
              }}
              inputProps={{ style: { textAlign: 'center' } }}
            />
          </Box>
          <Typography sx={{ mt: 3, fontSize: '0.75rem', color: '#4b5563'}}>
            Their credentials will be automatically<br /> created and sent via the given email.
          </Typography>

        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center', mt: 2}}>
          <Button 
            onClick={handleAddPlayer}
            variant='contained'
            sx={{ 
              backgroundColor: '#4b5563',
              textTransform: 'none',
              fontWeight: 500,
              borderRadius: 16,
              px: 4,
              py: 1.5,
              '&:hover': { backgroundColor: '#374151'}}}>
            Create player account
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default TeamAdminPage;