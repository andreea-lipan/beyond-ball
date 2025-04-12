import React, { createContext, useContext, useState } from "react";
import Storage from "../utils/Storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [role, setRole] = useState(Storage.getRoleFromToken());
    const [teamId, setTeamId] = useState(Storage.getTeamIdFromToken());

    const refreshAuth = () => {
        const newRole = Storage.getRoleFromToken();
        setRole(newRole);
        const newTeamId = Storage.getTeamIdFromToken()
        setTeamId(newTeamId);
    };

    return (
        <AuthContext.Provider value={{ role, teamId, refreshAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
