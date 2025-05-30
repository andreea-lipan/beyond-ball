import {SvgIcon} from "@mui/material";

export const QuestionsIcon = ({color = "#000", width="0.9rem", height="0.9rem"}) => {
    return (
        <SvgIcon style={{width:width,height:height}}>
            <svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill={color}>

                <g id="SVGRepo_bgCarrier" strokeWidth="0"/>

                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>

                <g id="SVGRepo_iconCarrier">
                    <circle fill={color} cx="19" cy="23" r="1"/>
                    <path fill={color} d="M24 13c0 2.42-1.72 4.44-4 4.9V20c0 .55-.45 1-1 1s-1-.45-1-1v-3c0-.55.45-1 1-1 1.65 0 3-1.35 3-3s-1.35-3-3-3-3 1.35-3 3c0 .55-.45 1-1 1s-1-.45-1-1c0-2.76 2.24-5 5-5s5 2.24 5 5zM8 7H5c-.553 0-1-.448-1-1s.447-1 1-1h3c.553 0 1 .448 1 1s-.447 1-1 1zM12 10c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1s.45-1 1-1h6c.55 0 1 .45 1 1zM12 14c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1s.45-1 1-1h6c.55 0 1 .45 1 1z"/>
                    <path fill={color} d="M18 2v2.96c0 .55-.45 1-1 1s-1-.45-1-1V2.5c0-.28-.22-.5-.5-.5h-13c-.28 0-.5.22-.5.5v19c0 .28.21.5.49.5H15c.55 0 1 .45 1 1s-.45 1-1 1H2c-1.1 0-2-.9-2-2V2C0 .9.9 0 2 0h14c1.1 0 2 .9 2 2z"/>
                    <path fill={color} d="M12 18c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1s.45-1 1-1h6c.55 0 1 .45 1 1z"/>
                </g>

            </svg>
        </SvgIcon>
    )
}
