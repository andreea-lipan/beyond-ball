import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Popup } from "./popup/Popup";
import { MessageType } from "./popup/MessageType";

const AccessDeniedRedirect = () => {
    const location = useLocation();
    const [visible, setVisible] = useState(true);
    const [redirectNow, setRedirectNow] = useState(false);
    const fallback = sessionStorage.getItem("lastValidPath") || "/";

    useEffect(() => {
        const timeout = setTimeout(() => {
            setRedirectNow(true);
        }, 1000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            <Popup
                isVisible={visible}
                setIsVisible={setVisible}
                message="You do not have permission to view this page. Redirecting to previous page..."
                messageType={MessageType.error}
                duration={1000}
            />
            {redirectNow && <Navigate to={fallback} state={{ from: location }} replace />}
        </>
    );
};


export default AccessDeniedRedirect;
