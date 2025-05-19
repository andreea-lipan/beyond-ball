import {
    Box, Button, Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography, useTheme
} from "@mui/material";
import React, {useState} from "react";
import {Popup} from "../components/popup/Popup";

const AddMemberDialog = ({addMember, state, role}) => {
    const theme = useTheme();
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [newMember, setNewMember] = useState({
        firstName: "",
        lastName: "",
        position: "",
        email: "",
        role: role
    });

    const handleCloseDialog = () => {
        state.closeModal();
        setNewMember({firstName: "", lastName: "", position: "", email: "", role: role});
    }

    const handleAddMember = () => {
        if (newMember.firstName === "" || newMember.lastName === "" || newMember.email === "") {
            setErrorMessage("Please fill in all required fields");
            setShowError(true);
            return;
        }

        if (newMember.role !== "PLAYER" && newMember.position === "") {
            setErrorMessage("Please specify the staff role");
            setShowError(true);
            return;
        }

        addMember(newMember)
        handleCloseDialog()
    }

    return (
        <>
            <Popup 
                isVisible={showError} 
                setIsVisible={setShowError} 
                message={errorMessage} 
                messageType="error" 
            />
            <Dialog
                open={state.isOpen}
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
                <DialogTitle sx={{mb: 1, fontWeight: 600, fontSize: '1.2rem', color: '#374151'}}>
                    Add a<br/><span style={{fontWeight: 700, fontSize: '1.6rem'}}>New {role==="PLAYER" ? 'Player': 'Staff Member'}</span>
                </DialogTitle>

                <DialogContent>
                    <Typography sx={{fontSize: '0.8rem', color: '#6b7280', mb: 3}}>
                        Here you can create an account for one of your players
                    </Typography>

                    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                        <TextField
                            placeholder="Player First Name"
                            value={newMember.firstName}
                            onChange={(e) => setNewMember({...newMember, firstName: e.target.value})}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                style: {
                                    borderRadius: 12,
                                    backgroundColor: theme.palette.background.main,
                                    color: theme.palette.text.primary,
                                    textAlign: 'center',
                                    height: '48px',
                                    fontSize: '0.9rem',
                                    '&.placeholder': {
                                        opacity: 1
                                    },
                                }
                            }}
                            inputProps={{style: {textAlign: 'center'}}}
                        />

                        <TextField
                            placeholder="Player Last Name"
                            value={newMember.lastName}
                            onChange={(e) => setNewMember({...newMember, lastName: e.target.value})}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                style: {
                                    borderRadius: 12,
                                    backgroundColor: theme.palette.background.main,
                                    color: theme.palette.text.primary,
                                    textAlign: 'center',
                                    height: '48px',
                                    fontSize: '0.9rem'
                                }
                            }}
                            inputProps={{style: {textAlign: 'center'}}}
                        />

                        <TextField
                            placeholder="Player Email"
                            value={newMember.email}
                            onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                style: {
                                    borderRadius: 12,
                                    backgroundColor: theme.palette.background.main,
                                    color: theme.palette.text.primary,
                                    textAlign: 'center',
                                    height: '48px',
                                    fontSize: '0.9rem'
                                }
                            }}
                            inputProps={{style: {textAlign: 'center'}}}
                        />
                        {role==="STAFF" &&
                            <TextField
                                placeholder="Staff Role"
                                value={newMember.position}
                                onChange={(e) => setNewMember({...newMember, position: e.target.value})}
                                fullWidth
                                variant="outlined"
                                // margin="normal"
                                InputProps={{
                                    style: {
                                        borderRadius: 12,
                                        backgroundColor: theme.palette.background.main,
                                        color: theme.palette.text.primary,
                                        textAlign: 'center',
                                        height: '48px',
                                        fontSize: '0.9rem'
                                    }
                                }}
                                inputProps={{style: {textAlign: 'center'}}}
                            />
                        }
                    </Box>
                    <Typography sx={{mt: 3, fontSize: '0.75rem', color: '#4b5563'}}>
                        Their credentials will be automatically<br/> created and sent via the given email.
                    </Typography>
                </DialogContent>

                <DialogActions sx={{justifyContent: 'center', mt: 2}}>
                    <Button
                        onClick={handleAddMember}
                        variant='contained'
                        sx={{
                            backgroundColor: theme.palette.secondary.main,
                            textTransform: 'none',
                            fontWeight: 500,
                            borderRadius: 16,
                            px: 4,
                            py: 1.5,
                            '&:hover': {backgroundColor: theme.palette.secondary.dark}
                        }}>
                        Create account
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddMemberDialog;