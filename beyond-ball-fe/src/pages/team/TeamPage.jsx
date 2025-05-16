import Layout from "../../components/Layout.jsx";
import {Box, Button, Tooltip, Typography} from "@mui/material";
import {TestComponent} from "../../components/TestComponent.jsx";
import React, {useEffect, useState} from "react";
import TeamTopBar from "./TeamTopBar.jsx";
import TeamContainer from "./TeamContainer.jsx";

const mockTeam = [
    { id: 1, name: "Lionel Messi", role: "Player", position: "Bench", goals: 2, assists: 0, active: true },
    { id: 2, name: "Laura James", role: "Technical Staff", position: "Analyst", goals: 0, assists: 0, active: true },
    { id: 3, name: "Jamie Vardy", role: "Player", position: "Striker", goals: 5, assists: 1, active: true },
    { id: 4, name: "Chris Walker", role: "Technical Staff", position: "Coach", goals: 0, assists: 0, active: true },
];
const TeamPage = () => {
    const teamName = "BBGs";
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("Player");

    const [team, setTeam] = useState(mockTeam);

    const filteredTeam = team.filter(member =>
        member.role === filter && member.name.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        fetchTeam()
    }, []);

    const fetchTeam = () => {

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