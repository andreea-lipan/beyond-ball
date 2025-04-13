import React from "react";
import {Button, Divider, IconButton, useTheme} from "@mui/material";
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
        <div style={{display:"flex",flexDirection: vertical ? "column" : "row", backgroundColor: theme.palette.primary.main, borderRadius:"16px", padding: "8px", justifyContent: "space-evenly"}} >
            <Button title="Save Board" onClick={saveImage} style={{borderRadius:"50%"}} > <SaveIcon/> </Button>
            <Divider flexItem orientation={vertical?"horizontal":"vertical"}/>
                {COLORS.map((c) => (
                    <IconButton
                        key={c}
                        style={{ backgroundColor: c, borderRadius:"50%", height: vertical?"3.5rem":"", width:!vertical?"3.5rem":"", margin: "5px" , borderColor: color === c ? "black" : "transparent", borderWidth: "2px", borderStyle: "dashed"}}
                        onClick={() => setColor(c)}
                    />
                ))}
            <Button title="Free Draw" onClick={() => setMode("free")} style={{borderRadius:"50%", borderColor: mode === "free" ? "black" : "transparent", borderWidth: "2px", borderStyle: "dashed"}}> <BrushIcon/> </Button>
            <Button title="Circle" onClick={() => setMode("circle")} style={{borderRadius:"50%", borderColor: mode === "circle" ? "black" : "transparent", borderWidth: "2px", borderStyle: "dashed"}}> <CircleIcon/> </Button>
            <Button title="Cross" onClick={() => setMode("cross")} style={{borderRadius:"50%", borderColor: mode === "cross" ? "black" : "transparent", borderWidth: "2px", borderStyle: "dashed"}}> <CrossIcon/> </Button>
            <Button title="Undo" onClick={handleUndo} style={{borderRadius:"50%"}}> <UndoIcon/> </Button>
            <Button title="Redo" onClick={handleRedo} style={{borderRadius:"50%"}}> <RedoIcon/> </Button>
            <Button title="Clear Board" onClick={handleClear} style={{borderRadius:"50%"}}> <ClearIcon/> </Button>
        </div>
    );
};
