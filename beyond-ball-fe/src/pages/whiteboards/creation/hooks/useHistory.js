import { useState } from "react";

const BG_IMAGE_URL = "/field.png";

const useHistory = (canvasRef, ctxRef) => {
    const [history, setHistory] = useState([]);
    const [redoStack, setRedoStack] = useState([]);

    const saveState = () => {
        const canvas = canvasRef.current;
        const dataUrl = canvas.toDataURL();
        setHistory(prev => [...prev, dataUrl]);
        setRedoStack([]); // Clear redo stack on new action
    };

    const handleUndo = () => {
        if (history.length <= 1) return;

        const newHistory = [...history];
        const last = newHistory.pop();
        setRedoStack(prev => [last, ...prev]);

        const img = new Image();
        img.src = newHistory[newHistory.length - 1];
        img.onload = () => {
            const ctx = ctxRef.current;
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            ctx.drawImage(img, 0, 0);
        };

        setHistory(newHistory);
    };

    const handleRedo = () => {
        if (redoStack.length === 0) return;

        const [next, ...rest] = redoStack;
        const img = new Image();
        img.src = next;
        img.onload = () => {
            const ctx = ctxRef.current;
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            ctx.drawImage(img, 0, 0);
        };

        setHistory(prev => [...prev, next]);
        setRedoStack(rest);
    };

    const handleClear = () => {
        const canvas = canvasRef.current;
        const ctx = ctxRef.current;

        // Clear the entire canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Reset stacks
        clearHistory()

        // Redraw background image
        const bgImage = new Image();
        bgImage.src = BG_IMAGE_URL;
        bgImage.onload = () => {
            ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
            saveState();
        };
    };


    const clearHistory = () => {
        setHistory([]);
        setRedoStack([]);
    };

    return {
        history,
        redoStack,
        saveState,
        handleUndo,
        handleRedo,
        handleClear,
    };
};

export default useHistory;
