import {Avatar, Card, Grid, IconButton, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

const UserCard = ({user}) => {

    return(
        <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
            <Card sx={{
                backgroundColor: user.active ? "#ffffff" : "#e0e0e0",
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
                    alt={user.name}
                    sx={{ width: 56, height: 56, mb: 1 }}
                />
                <Typography variant="h6">{user.name}</Typography>
                <Typography variant="body2">Position: {user.position}</Typography>
                <Typography variant="body2">Goals: {user.goals}</Typography>
                <Typography variant="body2">Assists: {user.assists}</Typography>
            </Card>
        </Grid>
    )
}

export default UserCard;