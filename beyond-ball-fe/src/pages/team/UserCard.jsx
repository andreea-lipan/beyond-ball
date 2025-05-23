import {Avatar, Box, Card, Grid, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {PROFILE_PAGE} from "../../utils/UrlConstants.js";
import UserService from "../../APIs/UserService.js";

const UserCard = ({user}) => {

    const navigate = useNavigate();

    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        UserService.getAvatarImage(user.profilePictureUrl).then((res) => {
            setAvatar(res);
        }).catch((err) => {
            setAvatar(null);
        })
    },[user])

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
                "&:hover": { boxShadow: "0 6px 18px rgba(0,0,0,0.6)", cursor: "pointer" }
            }}
                onClick={() => navigate(PROFILE_PAGE(user.id))}
            >
                <Avatar
                    src={avatar}
                    alt={user.name}
                    sx={{ width: 80, height: 80, mb: 1 }}
                />
                <Typography variant="h2" sx={{padding: '0.2em 0 0.4em 0'}}>{user?.name}</Typography>

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
                        {user.role === "PLAYER" &&
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
                        <Typography variant="subtitle1">{user.playerStats?.position || 'N/A'}</Typography>
                        {user.role === "PLAYER" &&
                            <>
                                <Typography variant="subtitle1">{user.playerStats?.goals || 'N/A'}</Typography>
                                <Typography variant="subtitle1">{user.playerStats?.assists || 'N/A'}</Typography>
                            </>
                        }
                    </Box>
                </Box>
            </Card>
        </Grid>
    )
}

export default UserCard;