import {Avatar, Box, Button, Card, Grid, IconButton, Typography, useTheme} from "@mui/material";
import {PROFILE_PAGE} from "../../../utils/UrlConstants.js";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import UserService from "../../../APIs/UserService.js";

const AdminUserCard = ({ member, handleResendEmail, handleToggleActive }) => {

    const navigate = useNavigate();
    const theme = useTheme();

    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        UserService.getAvatarImage(member.profilePictureUrl).then((res) => {
            setAvatar(res);
        }).catch((err) => {
            setAvatar(null);
        })
    },[member])

    return (
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
                cursor: 'pointer',
                "&:hover": {boxShadow: "0 6px 18px rgba(0,0,0,0.6)"}
            }}>

                {/*<Box sx={{*/}
                {/*    display: 'flex',*/}
                {/*    flexDirection: "column",*/}
                {/*    alignItems: "center",*/}
                {/*    justifyContent: 'center'*/}
                {/*}}>*/}
                <Avatar src={avatar} alt={member.name} sx={{width: 56, height: 56, mb: 1}} onClick={() => navigate(PROFILE_PAGE(member.id))} />

                {/* Name */}
                <Typography variant="h2"
                            onClick={() => navigate(PROFILE_PAGE(member.id))}
                            sx={{padding: '0.2em 0 0.4em 0'}}>{member.name}</Typography>
                {/*</Box>*/}


                {/* Stats */}
                <Box>
                    <Box onClick={() => navigate(PROFILE_PAGE(member.id))}
                         sx={{
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
                    <Box>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleResendEmail(member)}
                            sx={{ mt: 1, color: theme.palette.secondary.main, borderColor: theme.palette.secondary.main }}
                        >
                            Resend Email
                        </Button>
                    </Box>
                    {/* Archive */}
                    <IconButton onClick={() => handleToggleActive(member.id)} color="secondary"
                                title="Set Inactive">
                        <DeleteIcon/>
                    </IconButton>
                </Box>

            </Card>
        </Grid>
    )
}

export default AdminUserCard;