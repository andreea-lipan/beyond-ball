import {SvgIcon} from "@mui/material";

export const CrossIcon = ({color = "#000000"}) => {
    return (
        <SvgIcon style={{width:"3rem",height:"3rem"}}>
            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 5L4.99998 19M5.00001 5L19 19" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </SvgIcon>
    )
}
