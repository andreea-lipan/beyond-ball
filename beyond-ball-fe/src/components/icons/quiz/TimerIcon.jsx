import {SvgIcon} from "@mui/material";

export const TimerIcon = ({color = "#000", width="0.9rem", height="0.9rem"}) => {
    return (
        <SvgIcon style={{width:width,height:height}}>
            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.51555 7C3.55827 8.4301 3 10.1499 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3V6M12 12L8 8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </SvgIcon>
    )
}
