import React, {useState, useRef} from "react";
import {Toolbar} from "./Toolbar.jsx";
import {TextField} from "@mui/material";
import whiteboardService from "../../../APIs/WhiteboardService.js";
import {WHITEBOARD_DETAILS} from "../../../utils/UrlConstants.js";
import {useCanvasDrawing} from "./hooks/useCanvasDrawing.js";
import useHistory from "./hooks/useHistory.js";
import useModal from "../../../components/modals/useModal.js";
import {ConfirmationModal} from "../../../components/modals/ConfirmationModal.jsx";
import {Popup} from "../../../components/popup/Popup.jsx";

const COLORS = ["#43aaff", "#ff4949", "#d9dc7f"];

export const Whiteboard = () => {

    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const [mode, setMode] = useState("free"); // 'free' | 'circle' | 'square'
    const [color, setColor] = useState(COLORS[2]);

    const isMobile = false;
    const [title, setTitle] = useState("");

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

    const saveImage = () => {
        if (isVisible) return
        const canvas = canvasRef.current;
        canvas.toBlob((blob) => {
            whiteboardService.uploadWhiteboard(blob, 1, title)
                .then((res) => {
                    console.log(res)

                    setMessage("Whiteboard saved successfully!");
                    setMessageType("success");
                    setWhiteboardURL(WHITEBOARD_DETAILS(res.data.id));
                    setIsVisible(true);

                })
                .catch((err) => {
                    console.error(err);
                    setMessage("Failed to save whiteboard.");
                    setMessageType("error");
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
                   redirect={whiteboardURL}/>
            <ConfirmationModal handleConfirm={handleClear} message={"Are you sure you want to clear the board?"}
                               state={clearModal}/>
            <ConfirmationModal handleConfirm={saveImage}
                               message={"Are you sure you want to save the plan? It cannot be edited afterwards."}
                               state={saveModal}/>
            <TextField style={{margin: "0.5rem", width: "50%", justifyContent: "center"}} placeholder={"Board Title"}
                       value={title} onChange={(e) => setTitle(e.target.value)}/>
            <div style={{display: "flex", flexDirection: isMobile ? "row" : "column"}}>
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
                        borderRadius: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", touchAction: "none"
                    }}
                    onMouseDown={mode === "free" ? startDrawing : drawShape}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onTouchStart={mode === "free" ? startTouchDrawing : drawShape}
                    onTouchMove={drawTouch}
                    onTouchEnd={stopTouchDrawing}
                />
            </div>
        </>
    );
}
