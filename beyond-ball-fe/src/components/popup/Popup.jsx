import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import {Alert} from "@mui/material";
import {useNavigate} from "react-router-dom";


//messageType = "success" | "info" | "warning" | "error";
export const Popup = ({isVisible, setIsVisible, message, messageType, redirect, duration = 4000}) => {

    const navigate = useNavigate()

    const handleClose = () => {
        setIsVisible(false)
        if(redirect && messageType==="success") {
            navigate(redirect);
        }
    }

    return(
        <>
            <Snackbar
                open={isVisible}
                autoHideDuration={duration}
                onClose={handleClose}
                key={message}
                anchorOrigin={{vertical:"top", horizontal:"right"}}
                sx = {{
                    width: {
                        xs:"100%",
                        sm:"90%",
                        md:"40%",
                        lg:"20%"
                    }
                }}
            >
                <Alert
                    severity={messageType}
                    variant="filled"
                >
                    {message}
                </Alert>
            </Snackbar>
        </>
    )
}