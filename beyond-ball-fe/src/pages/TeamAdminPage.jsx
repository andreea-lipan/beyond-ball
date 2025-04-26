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
import Layout from "../components/Layout.jsx";
import { useAuth } from "../components/AuthContext";

const mockTeam = [
  { id: 1, name: "Lionel Messi", role: "Player", position: "Bench", goals: 2, assists: 0, active: true },
  { id: 2, name: "Laura James", role: "Technical Staff", position: "Analyst", goals: 0, assists: 0, active: true },
  { id: 3, name: "Jamie Vardy", role: "Player", position: "Striker", goals: 5, assists: 1, active: true },
  { id: 4, name: "Chris Walker", role: "Technical Staff", position: "Coach", goals: 0, assists: 0, active: true },
];

const TeamAdminPage = () => {
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
};

export default TeamAdminPage;