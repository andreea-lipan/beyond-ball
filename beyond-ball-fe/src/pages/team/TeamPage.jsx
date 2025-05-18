import Layout from "../../components/sidebar/Layout.jsx";
import {Box, Button, Tooltip, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import TeamTopBar from "./TeamTopBar.jsx";
import TeamContainer from "./TeamContainer.jsx";
import UserService from "../../APIs/UserService.js";
import Storage from "../../utils/Storage.js";

const TeamPage = () => {
    const teamId = Storage.getTeamIdFromToken();
    const [teamName, setTeamName] = useState("");
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("PLAYER");

    const [team, setTeam] = useState([]);

    const filteredTeam = team.filter(member => {
        return member.role === filter && member?.name.toLowerCase().includes(search.toLowerCase())
    });

    useEffect(() => {
        fetchTeam()
    }, [teamId]);

    const fetchTeam = () => {
        UserService.getTeamMembers(teamId).then(response => {
            setTeam(response.members);
            setTeamName(response.teamName);
        })
    }

    return (
        <Layout>
            <Typography variant="h1" align="center" sx={{ mt: 3, mb: 3 }}>
                Team {teamName}
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
                <TeamTopBar search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} />
                <TeamContainer team={filteredTeam}/>
            </Box>
        </Layout>
    )
}

export default TeamPage;