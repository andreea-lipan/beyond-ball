import Layout from "../../components/Layout.jsx";
import {Button, Tooltip, Typography} from "@mui/material";
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
    const teamName = "Team Name";
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
            <Typography variant="h3" align="center" gutterBottom sx={{color: "#2e7d32", mt: 3}}>
                Team {teamName}
            </Typography>

            <TeamTopBar search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} />
            <TeamContainer team={filteredTeam}/>
        </Layout>
    )
}

export default TeamPage;