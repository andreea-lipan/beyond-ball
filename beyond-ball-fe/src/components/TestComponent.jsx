import {Button, Tooltip, Typography} from "@mui/material";

export const TestComponent = ({text}) => {
    return (
        <>
            <Typography variant="h1">Page title: {text}</Typography>
            <Typography variant="h2">Headers: {text}...</Typography>
            <Typography variant="body1">Default/Body text: {text}...</Typography>
            <Typography variant="body2">Secondary information: {text}...</Typography>
            <Typography variant="subtitle1">Smaller Secondary information: {text}...</Typography>
            <Tooltip title={"Here add possible instructions, if necessary"}>
                <Button
                    variant="contained"
                    onClick={() => {
                        alert('clicked');
                    }}>
                    Button Example
                </Button>
            </Tooltip>
        </>
    );
}