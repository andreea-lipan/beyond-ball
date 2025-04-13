import { useEffect, useState } from "react";

const BG_IMAGE_URL = "/field.png";
const SHAPE_SIZE = 60;

export const useCanvasDrawing = (mode, color, saveState, canvasRef, ctxRef) => {

    const [isDrawing, setIsDrawing] = useState(false);

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

    const getTouchPos = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const touch = e.touches[0];
        return {
            offsetX: touch.clientX - rect.left,
            offsetY: touch.clientY - rect.top,
        };
    };

    const startDrawing = (e) => {
        if (mode !== "free") return;
        const { offsetX, offsetY } = e.nativeEvent;
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
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

    const startTouchDrawing = (e) => {
        if (mode !== "free") return;
        e.preventDefault();
        const { offsetX, offsetY } = getTouchPos(e);
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
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

    const drawShape = (e) => {
        if (mode === "free") return;
        const { offsetX, offsetY } = e.nativeEvent;
        const ctx = ctxRef.current;

        ctx.beginPath();
        if (mode === "circle") {
            ctx.arc(offsetX, offsetY, SHAPE_SIZE / 2, 0, Math.PI * 2);
        } else if (mode === "cross") {
            ctx.moveTo(offsetX - SHAPE_SIZE / 2, offsetY - SHAPE_SIZE / 2);
            ctx.lineTo(offsetX + SHAPE_SIZE / 2, offsetY + SHAPE_SIZE / 2);
            ctx.moveTo(offsetX + SHAPE_SIZE / 2, offsetY - SHAPE_SIZE / 2);
            ctx.lineTo(offsetX - SHAPE_SIZE / 2, offsetY + SHAPE_SIZE / 2);
        }
        ctx.stroke();
        saveState();
    };

    return {
        canvasRef,
        ctxRef,
        startDrawing,
        draw,
        stopDrawing,
        drawShape,
        startTouchDrawing,
        drawTouch,
        stopTouchDrawing,
    };
};
