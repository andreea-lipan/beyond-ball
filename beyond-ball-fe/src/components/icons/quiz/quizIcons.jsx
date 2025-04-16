import React from "react";
import {SvgIcon} from "@mui/material";

export const QuizSheetIcon = (props) => (
    <SvgIcon style={{width: "2.5rem", height: "2.5rem"}}>
        <svg
            {...props}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect x="4" y="3" width="16" height="18" rx="2" ry="2"/>
            <line x1="8" y1="7" x2="16" y2="7"/>
            <line x1="8" y1="11" x2="16" y2="11"/>
            <line x1="8" y1="15" x2="12" y2="15"/>
        </svg>
    </SvgIcon>
);

export const QuestionMarkIcon = (props) => (
    <SvgIcon style={{width: "2.5rem", height: "2.5rem"}}>
        <svg
            {...props}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 4"/>
            <line x1="12" y1="17" x2="12" y2="17"/>
        </svg>
    </SvgIcon>
);

export const MultipleChoiceIcon = (props) => (
    <SvgIcon style={{width: "2.5rem", height: "2.5rem"}}>
        <svg
            {...props}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect x="3" y="5" width="4" height="4" rx="1"/>
            <rect x="3" y="10" width="4" height="4" rx="1"/>
            <rect x="3" y="15" width="4" height="4" rx="1"/>
            <line x1="9" y1="7" x2="21" y2="7"/>
            <line x1="9" y1="12" x2="21" y2="12"/>
            <line x1="9" y1="17" x2="21" y2="17"/>
        </svg>
    </SvgIcon>
);

export const IdeaIcon = (props) => (
    <SvgIcon style={{width: "2.5rem", height: "2.5rem"}}>
        <svg
            {...props}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M9 18h6"/>
            <path d="M10 22h4"/>
            <path
                d="M12 2a7 7 0 0 0-5 11.9c.5.5.7 1.1.9 1.7.2.5.3 1.3.3 1.4h6s.1-.9.3-1.4c.2-.6.4-1.2.9-1.7A7 7 0 0 0 12 2z"/>
        </svg>
    </SvgIcon>
);

export const ChecklistIcon = (props) => (
    <SvgIcon style={{width: "2.5rem", height: "2.5rem"}}>
        <svg
            {...props}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="3 6 5 8 9 4"/>
            <polyline points="3 13 5 15 9 11"/>
            <polyline points="3 20 5 22 9 18"/>
            <line x1="11" y1="8" x2="21" y2="8"/>
            <line x1="11" y1="15" x2="21" y2="15"/>
            <line x1="11" y1="22" x2="21" y2="22"/>
        </svg>
    </SvgIcon>
);
