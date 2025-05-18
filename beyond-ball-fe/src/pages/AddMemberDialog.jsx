import {
    Box, Button, Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from "@mui/material";
import React, {useState} from "react";

const AddMemberDialog = ({addMember, state, role}) => {

    // const [openDialog, setOpenDialog] = useState(false);
    const [newMember, setNewMember] = useState({
        firstName: "",
        lastName: "",
        position: "",
        email: "",
        role: "Player"
    });

    const handleCloseDialog = () => {
        state.closeModal();
        setNewMember({fistName: "", lastName: "", position: "", email: ""});
    }

    const handleAddMember = () => {
        addMember(newMember)
        handleCloseDialog()
    }

    return (
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
                Add a<br/><span style={{fontWeight: 700, fontSize: '1.6rem'}}>New Player</span></DialogTitle>

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
                                backgroundColor: '#cbd5e1',
                                textAlign: 'center',
                                height: '48px',
                                fontSize: '0.9rem'
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
                                backgroundColor: '#cbd5e1',
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
                                backgroundColor: '#cbd5e1',
                                textAlign: 'center',
                                height: '48px',
                                fontSize: '0.9rem'
                            }
                        }}
                        inputProps={{style: {textAlign: 'center'}}}
                    />
                    {role==="STAFF" &&
                        <TextField
                            label="Staff Role"
                            value={newMember.position}
                            onChange={(e) => setNewMember({...newMember, position: e.target.value})}
                            fullWidth
                            margin="normal"
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
                        backgroundColor: '#4b5563',
                        textTransform: 'none',
                        fontWeight: 500,
                        borderRadius: 16,
                        px: 4,
                        py: 1.5,
                        '&:hover': {backgroundColor: '#374151'}
                    }}>
                    Create account
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddMemberDialog;