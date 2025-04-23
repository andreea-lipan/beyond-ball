import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Avatar,
  Grid,
  TextField,
  InputAdornment,
  Button,
  ToggleButton,
  ToggleButtonGroup
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import Layout from "../components/Layout.jsx";

const mockTeam = [
  { id: 1, name: "Lionel Messi", role: "Player", position: "Bench", goals: 2, assists: 0, active: true },
  { id: 2, name: "Laura James", role: "Technical Staff", position: "Analyst", goals: 0, assists: 0, active: true },
  { id: 3, name: "Jamie Vardy", role: "Player", position: "Striker", goals: 5, assists: 1, active: true },
  { id: 4, name: "Chris Walker", role: "Technical Staff", position: "Coach", goals: 0, assists: 0, active: true },
];

const TeamPage = () => {
  const [team, setTeam] = useState(mockTeam);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Player");

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
      <Typography variant="h4" gutterBottom>Manage Team [name]</Typography>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />

        <Button variant="outlined">Upload data from Excel</Button>
      </div>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CardContent>
              <Typography variant="h5">＋<br/>New player</Typography>
            </CardContent>
          </Card>
        </Grid>

        {filteredTeam.map((member) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={member.id}>
            <Card style={{ backgroundColor: member.active ? "#fff" : "#f0f0f0" }}>
              <CardContent style={{ textAlign: 'center' }}>
                <Avatar
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b8/Lionel_Messi_20180626.jpg"
                  alt={member.name}
                  sx={{ width: 56, height: 56, margin: "0 auto 10px" }}
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
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default TeamPage;