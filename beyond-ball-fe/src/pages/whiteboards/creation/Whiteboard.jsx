import React, {useRef, useState, useEffect} from "react";
import {Toolbar} from "./Toolbar.jsx";
import {Box, Button, Modal, TextField} from "@mui/material";
import whiteboardService from "../../../APIs/WhiteboardService.js";
import {useNavigate} from "react-router-dom";
import {WHITEBOARD_DETAILS} from "../../../utils/UrlConstants.js";

const COLORS = ["#43aaff", "#ff4949", "#d9dc7f"];
const SHAPE_SIZE = 60;
const BG_IMAGE_URL = "/field.png"; // Replace with your actual image path

export const Whiteboard = () => {

    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [mode, setMode] = useState("free"); // 'free' | 'circle' | 'square'
    const [color, setColor] = useState(COLORS[2]);
    const [history, setHistory] = useState([]);
    const [redoStack, setRedoStack] = useState([]);

    const isMobile = false;
    const [title, setTitle] = useState("");


    useEffect(() => {
        const canvas = canvasRef.current;

        const ctx = canvas.getContext("2d");
        ctx.lineCap = "round";
        ctx.lineWidth = 4;
        ctxRef.current = ctx;

        const bgImage = new Image();
        bgImage.src = BG_IMAGE_URL;
        bgImage.onload = () => {
            ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
            saveState();
        };
    }, []);

    useEffect(() => {
        if (ctxRef.current) {
            ctxRef.current.strokeStyle = color;
            ctxRef.current.fillStyle = color;
        }
    }, [color]);

    const startDrawing = (e) => {
        if (mode !== "free") return;
        setIsDrawing(true);
        const {offsetX, offsetY} = e.nativeEvent;
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(offsetX, offsetY);
    };

    const draw = (e) => {
        if (!isDrawing || mode !== "free") return;
        const {offsetX, offsetY} = e.nativeEvent;
        ctxRef.current.lineTo(offsetX, offsetY);
        ctxRef.current.stroke();
    };

    const stopDrawing = () => {
        if (!isDrawing) return;
        ctxRef.current.closePath();
        setIsDrawing(false);
        saveState();
    };

    const drawShape = (e) => {
        if (mode === "free") return;
        const {offsetX, offsetY} = e.nativeEvent;
        const ctx = ctxRef.current;
        if (mode === "circle") {
            ctx.beginPath();
            ctx.arc(offsetX, offsetY, SHAPE_SIZE / 2, 0, Math.PI * 2);
            ctx.stroke();
        } else if (mode === "cross") {
            ctx.beginPath();
            // Top-left to bottom-right
            ctx.moveTo(offsetX - SHAPE_SIZE / 2, offsetY - SHAPE_SIZE / 2);
            ctx.lineTo(offsetX + SHAPE_SIZE / 2, offsetY + SHAPE_SIZE / 2);
            // Top-right to bottom-left
            ctx.moveTo(offsetX + SHAPE_SIZE / 2, offsetY - SHAPE_SIZE / 2);
            ctx.lineTo(offsetX - SHAPE_SIZE / 2, offsetY + SHAPE_SIZE / 2);
            ctx.stroke();
        }
        saveState();
    };

    const saveState = () => {
        const canvas = canvasRef.current;
        const dataUrl = canvas.toDataURL();
        setHistory((prev) => [...prev, dataUrl]);
        setRedoStack([]);
    };

    const handleUndo = () => {
        if (history.length <= 1) return;
        const newHistory = [...history];
        const last = newHistory.pop();
        setRedoStack((prev) => [last, ...prev]);
        const img = new Image();
        img.src = newHistory[newHistory.length - 1];
        img.onload = () => {
            ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            ctxRef.current.drawImage(img, 0, 0);
        };
        setHistory(newHistory);
    };

    const handleRedo = () => {
        if (redoStack.length === 0) return;
        const [next, ...rest] = redoStack;
        const img = new Image();
        img.src = next;
        img.onload = () => {
            ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            ctxRef.current.drawImage(img, 0, 0);
        };
        setHistory((prev) => [...prev, next]);
        setRedoStack(rest);
    };

    const handleClear = () => {
        const canvas = canvasRef.current;
        const ctx = ctxRef.current;

        // Clear the entire canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Reset stacks
        setHistory([]);
        setRedoStack([]);

        // Redraw background image
        const bgImage = new Image();
        bgImage.src = BG_IMAGE_URL;
        bgImage.onload = () => {
            ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
            saveState();
        };
    };

    const nav = useNavigate();


    const saveImage = () => {
        const canvas = canvasRef.current;
        canvas.toBlob((blob) => {
            whiteboardService.uploadWhiteboard(blob, 1, title)
                .then((res) => {
                    console.log(res)
                    nav(WHITEBOARD_DETAILS(res.data.id))
                })
                .catch((err) => {
                    console.error(err);
                });
        },"image/png");
    };


    const getTouchPos = (touchEvent) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const touch = touchEvent.touches[0];
        return {
            offsetX: touch.clientX - rect.left,
            offsetY: touch.clientY - rect.top,
        };
    };

    const startTouchDrawing = (e) => {
        if (mode !== "free") return;
        e.preventDefault();
        setIsDrawing(true);
        const { offsetX, offsetY } = getTouchPos(e);
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(offsetX, offsetY);
    };

    const drawTouch = (e) => {
        if (!isDrawing || mode !== "free") return;
        e.preventDefault();
        const { offsetX, offsetY } = getTouchPos(e);
        ctxRef.current.lineTo(offsetX, offsetY);
        ctxRef.current.stroke();
    };

    const stopTouchDrawing = (e) => {
        if (!isDrawing) return;
        e.preventDefault();
        ctxRef.current.closePath();
        setIsDrawing(false);
        saveState();
    };


    const width = 1000
    const height = width * 0.64

    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    return (
        <>
            <Modal open={isOpen} onClose={onClose}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <h2>Are you sure you want to clear the board?</h2>
                    <div style={{display: "flex", gap: "1rem", justifyContent: "space-between"}}>
                        <Button onClick={() => {
                            handleClear();
                            onClose();
                        }}>Yes</Button>
                        <Button onClick={onClose}>No</Button>
                    </div>
                </Box>
            </Modal>
            <TextField style={{margin: "0.5rem", width: "50%", justifyContent: "center"}} placeholder={"Board Title"} value={title} onChange={(e) => setTitle(e.target.value)} />
            <div style={{display: "flex", flexDirection: isMobile ? "row" : "column"}}>
                <Toolbar
                    mode={mode}
                    setMode={setMode}
                    color={color}
                    setColor={setColor}
                    handleUndo={handleUndo}
                    handleRedo={handleRedo}
                    saveImage={saveImage}
                    handleClear={openModal}
                    vertical={isMobile}
                />
                <canvas
                    ref={canvasRef}
                    height={height}
                    width={width}
                    style={{
                        borderRadius: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",  touchAction:"none"
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
