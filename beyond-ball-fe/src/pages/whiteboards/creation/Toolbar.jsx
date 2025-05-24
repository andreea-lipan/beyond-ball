import React from "react";
import {Box, Button, Divider, Grid, IconButton, Typography, useTheme} from "@mui/material";
import {BrushIcon} from "../../../components/icons/whiteboard/BrushIcon.jsx";
import {CrossIcon} from "../../../components/icons/whiteboard/CrossIcon.jsx";
import {CircleIcon} from "../../../components/icons/whiteboard/CircleIcon.jsx";
import {UndoIcon} from "../../../components/icons/whiteboard/UndoIcon.jsx";
import {RedoIcon} from "../../../components/icons/whiteboard/RedoIcon.jsx";
import {SaveIcon} from "../../../components/icons/whiteboard/SaveIcon.jsx";
import {ClearIcon} from "../../../components/icons/whiteboard/ClearIcon.jsx";

const COLORS = [ "#43aaff", "#ff4949", "#d9dc7f"];

export const Toolbar = ({
                            mode,
                            setMode,
                            color,
                            setColor,
                            handleUndo,
                            handleRedo,
                            saveImage,
                            handleClear,
                            vertical
                        }) => {

    const theme = useTheme();

    return (
        <Grid columns={18} container sx={{display:"flex",flexDirection: vertical ? "column" : "row", backgroundColor: theme.palette.primary.main, borderRadius:"16px 16px 0 0", padding: "8px", justifyContent: "space-evenly"}}>

            <Grid item size={1}>
                <Typography variant="body2" color={theme.palette.text.primary}>Save</Typography>
                <Button title="Save Board" onClick={saveImage} style={{borderRadius:"50%"}} > <SaveIcon/> </Button>
            </Grid>

            <Divider flexItem orientation={vertical?"horizontal":"vertical"}/>

            <Grid item size={4}>
                    <Typography variant="body2" color={theme.palette.text.primary}>Colors</Typography>
                    <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        {COLORS.map((c) => (
                            <IconButton
                                key={c}
                                style={{ backgroundColor: c, borderRadius:"50%", height: vertical?"3.5rem":"3.5rem", width:!vertical?"3.5rem":"", margin: "5px" , borderColor: color === c ? "black" : "transparent", borderWidth: "2px", borderStyle: "dashed"}}
                                onClick={() => setColor(c)}
                            />
                        ))}
                    </Box>
            </Grid>

            <Divider flexItem orientation={vertical?"horizontal":"vertical"}/>

            <Grid item size={4}>
                <Typography variant="body2" color={theme.palette.text.primary}>Shapes</Typography>
                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <Button title="Free Draw" onClick={() => setMode("free")} style={{borderRadius:"50%", borderColor: mode === "free" ? "black" : "transparent", borderWidth: "2px", borderStyle: "dashed"}}> <BrushIcon/> </Button>
                    <Button title="Circle" onClick={() => setMode("circle")} style={{borderRadius:"50%", borderColor: mode === "circle" ? "black" : "transparent", borderWidth: "2px", borderStyle: "dashed"}}> <CircleIcon/> </Button>
                    <Button title="Cross" onClick={() => setMode("cross")} style={{borderRadius:"50%", borderColor: mode === "cross" ? "black" : "transparent", borderWidth: "2px", borderStyle: "dashed"}}> <CrossIcon/> </Button>
                </Box>
            </Grid>

            <Divider flexItem orientation={vertical?"horizontal":"vertical"}/>

            <Grid item size={4}>
                <Typography variant="body2" color={theme.palette.text.primary}>Actions</Typography>
                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <Button title="Undo" onClick={handleUndo} style={{borderRadius:"50%"}}> <UndoIcon/> </Button>
                    <Button title="Redo" onClick={handleRedo} style={{borderRadius:"50%"}}> <RedoIcon/> </Button>
                    <Button title="Clear Board" onClick={handleClear} style={{borderRadius:"50%"}}> <ClearIcon/> </Button>
                </Box>
            </Grid>
        </Grid>
    );
};
