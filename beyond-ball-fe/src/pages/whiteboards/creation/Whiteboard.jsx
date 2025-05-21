import React, {useState, useRef} from "react";
import {Toolbar} from "./Toolbar.jsx";
import {Box, TextField, useTheme} from "@mui/material";
import whiteboardService from "../../../APIs/WhiteboardService.js";
import {WHITEBOARD_DETAILS} from "../../../utils/UrlConstants.js";
import {useCanvasDrawing} from "./hooks/useCanvasDrawing.js";
import useHistory from "./hooks/useHistory.js";
import useModal from "../../../components/modals/useModal.js";
import {ConfirmationModal} from "../../../components/modals/ConfirmationModal.jsx";
import {Popup} from "../../../components/popup/Popup.jsx";
import {MessageType} from "../../../components/popup/MessageType.js";

const COLORS = ["#43aaff", "#ff4949", "#d9dc7f"];

export const Whiteboard = () => {

    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const [mode, setMode] = useState("free"); // 'free' | 'circle' | 'cross'
    const [color, setColor] = useState(COLORS[2]);

    const isMobile = false;

    const {
        saveState,
        handleUndo,
        handleRedo,
        handleClear,
    } = useHistory(canvasRef, ctxRef);

    const {
        startDrawing,
        draw,
        stopDrawing,
        drawShape,
        startTouchDrawing,
        drawTouch,
        stopTouchDrawing,
    } = useCanvasDrawing(mode, color, saveState, canvasRef, ctxRef);

    const saveImage = (title) => {
        if (isVisible) return
        const canvas = canvasRef.current;
        canvas.toBlob((blob) => {
            whiteboardService.uploadWhiteboard(blob,  title)
                .then((res) => {
                    console.log(res)

                    setMessage("Whiteboard saved successfully! Redirecting...");
                    setMessageType(MessageType.success);
                    setWhiteboardURL(WHITEBOARD_DETAILS(res.data.id));
                    setIsVisible(true);

                })
                .catch((err) => {
                    console.error(err);
                    setMessage("Failed to save whiteboard.");
                    setMessageType(MessageType.error);
                    setIsVisible(true);
                });
        }, "image/png");
    };

    const width = 1000
    const height = width * 0.64

    const clearModal = useModal(false)
    const saveModal = useModal(false)
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("success");
    const [isVisible, setIsVisible] = useState(false);
    const [whiteboardURL, setWhiteboardURL] = useState("");

    return (
        <>
            <Popup message={message} messageType={messageType} isVisible={isVisible} setIsVisible={setIsVisible}
                   redirect={whiteboardURL} duration={messageType === MessageType.success? 2000 : 4000}/>
            <ConfirmationModal handleConfirm={handleClear} message={"Are you sure you want to clear the board?"}
                               state={clearModal}/>
            <ConfirmationModal handleConfirm={saveImage}
                               message={"Are you sure you want to save the plan? It cannot be edited afterwards."}
                               state={saveModal}
                               forWhiteboard={true}
            />
            {/*<TextField sx={{*/}
            {/*    borderRadius:"16px",*/}
            {/*    margin: "0.5rem",*/}
            {/*    width: "50%",*/}
            {/*    justifyContent: "center",*/}
            {/*    backgroundColor:theme.palette.primary.main,*/}
            {/*    "& .MuiOutlinedInput-root": {*/}
            {/*        borderRadius: '16px',*/}
            {/*        boxShadow: "none",*/}
            {/*    },*/}
            {/*}}*/}
            {/*   placeholder={"Board Title"}*/}
            {/*   value={title}*/}
            {/*   onChange={(e) => setTitle(e.target.value)}/>*/}
            <Box sx={{display: "flex", flexDirection: isMobile ? "row" : "column"}}>
                <Toolbar
                    mode={mode}
                    setMode={setMode}
                    color={color}
                    setColor={setColor}
                    handleUndo={handleUndo}
                    handleRedo={handleRedo}
                    saveImage={saveModal.openModal}
                    handleClear={clearModal.openModal}
                    vertical={isMobile}
                />
                <canvas
                    ref={canvasRef}
                    height={height}
                    width={width}
                    style={{
                        borderRadius: "0 0 16px 16px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", touchAction: "none"
                    }}
                    onMouseDown={mode === "free" ? startDrawing : drawShape}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onTouchStart={mode === "free" ? startTouchDrawing : drawShape}
                    onTouchMove={drawTouch}
                    onTouchEnd={stopTouchDrawing}
                />
            </Box>
        </>
    );
}
