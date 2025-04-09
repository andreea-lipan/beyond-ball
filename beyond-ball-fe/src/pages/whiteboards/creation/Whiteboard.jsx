import React, { useRef, useState, useEffect } from "react";

const COLORS = ["#000000", "#ff0000", "#007bff"];
const SHAPE_SIZE = 60;
const BG_IMAGE_URL = "/field.png"; // Replace with your actual image path

export const Whiteboard = () => {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [mode, setMode] = useState("free"); // 'free' | 'circle' | 'square'
    const [color, setColor] = useState(COLORS[0]);
    const [history, setHistory] = useState([]);
    const [redoStack, setRedoStack] = useState([]);



    useEffect(() => {
        const canvas = canvasRef.current;

        const ctx = canvas.getContext("2d");
        ctx.lineCap = "round";
        ctx.lineWidth = 4;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
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
        const { offsetX, offsetY } = e.nativeEvent;
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(offsetX, offsetY);
    };

    const draw = (e) => {
        if (!isDrawing || mode !== "free") return;
        const { offsetX, offsetY } = e.nativeEvent;
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
        const { offsetX, offsetY } = e.nativeEvent;
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
        if (history.length <= 2) return;
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

    const saveImage = () => {
        const link = document.createElement("a");
        link.download = `whiteboard-${Date.now()}.png`;
        link.href = canvasRef.current.toDataURL();
        link.click();
    };

    return (
        <div className=" p-4">
            <div className="flex gap-2 mb-4">
                {COLORS.map((c) => (
                    <button
                        key={c}
                        className={`w-8 h-8 rounded-full border-2 ${c === color ? "border-black" : "border-transparent"}`}
                        style={{ backgroundColor: c }}
                        onClick={() => setColor(c)}
                    />
                ))}
                <button onClick={() => setMode("free")}>Free Draw</button>
                <button onClick={() => setMode("circle")}>Circle</button>
                <button onClick={() => setMode("cross")}>Cross</button>
                <button onClick={handleUndo}>Undo</button>
                <button onClick={handleRedo}>Redo</button>
                <button onClick={saveImage}>Save</button>
            </div>
            <canvas
                ref={canvasRef}
                width={1200}
                height={700}
                style={{borderRadius: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"}}
                onMouseDown={mode === "free" ? startDrawing : drawShape}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
            />
        </div>
    );
}
