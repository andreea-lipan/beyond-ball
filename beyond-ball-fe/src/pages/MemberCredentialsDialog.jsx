import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import React from "react";
import AddMemberDialog from "./AddMemberDialog.jsx";

const MemberCredentialsDialog = ({credentials, state}) => {
    return(
        <Dialog
            open={state.isOpen}
            onClose={state.closeModal}
            sx={{
                "& .MuiDialog-paper": {
                    borderRadius: "20px",
                    padding: "32px 24px",
                    backgroundColor: "#f3f4f6",
                    width: "100%",
                    maxWidth: "400px",
                    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
                    textAlign: "center",
                },
            }}
        >
            <DialogTitle sx={{mb: 1, fontWeight: 600, fontSize: "1.2rem", color: "#374151"}}>
                Player Added Successfully
            </DialogTitle>

            <DialogContent>
                <Typography sx={{fontSize: "0.9rem", color: "#6b7280", mb: 3}}>
                    The player has been added to your team. Here are their login credentials:
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        backgroundColor: "#e5e7eb",
                        padding: 3,
                        borderRadius: 2,
                        mb: 2,
                    }}
                >
                    <Typography sx={{fontWeight: 600}}>
                        Username: <span style={{color: "#2e7d32"}}>{credentials.username}</span>
                    </Typography>
                    <Typography sx={{fontWeight: 600}}>
                        Password: <span style={{color: "#2e7d32"}}>{credentials.password}</span>
                    </Typography>
                </Box>

                <Typography sx={{fontSize: "0.75rem", color: "#4b5563"}}>
                    Please save or share these credentials with the player. They will need them to log in to their
                    account.
                </Typography>
            </DialogContent>

            <DialogActions sx={{justifyContent: "center", mt: 2}}>
                <Button
                    onClick={state.closeModal}
                    variant="contained"
                    sx={{
                        backgroundColor: "#4b5563",
                        textTransform: "none",
                        fontWeight: 500,
                        borderRadius: 16,
                        px: 4,
                        py: 1.5,
                        "&:hover": {backgroundColor: "#374151"},
                    }}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default MemberCredentialsDialog;