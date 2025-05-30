import {SvgIcon} from "@mui/material";

export const AddFolderIcon = ({color}) => {
    return (
        <SvgIcon style={{width: "2.5rem", height: "2.5rem"}}>
            <svg width="50px" height="50px" viewBox="0 -1 60 60" data-name="add folder" id="add_folder" xmlns="http://www.w3.org/2000/svg">
                <path fill={color} fillRule={"evenodd"} d="M1098,720a17.992,17.992,0,0,0-14.96,28H1058V716a4,4,0,0,1,4-4h24.34a4.015,4.015,0,0,0,2.83-1.172l3.66-3.656a3.889,3.889,0,0,1,1.3-.867,3.977,3.977,0,0,1,1.53-.3H1106a4,4,0,0,1,4,4v14.61A17.914,17.914,0,0,0,1098,720Zm-6.63-17.544a6,6,0,0,0-1.96,1.3l-3.65,3.656a2.057,2.057,0,0,1-.66.436,1.962,1.962,0,0,1-.76.15H1060a6.006,6.006,0,0,0-6,6v34a4,4,0,0,1-4-4V696a4,4,0,0,1,4-4h10.34a4.015,4.015,0,0,1,2.83,1.172l3.66,3.656a3.889,3.889,0,0,0,1.3.867,3.977,3.977,0,0,0,1.53.3H1100a4,4,0,0,1,4,4h-10.34A5.887,5.887,0,0,0,1091.37,702.456Z" data-name="folder copy" id="folder_copy" transform="translate(-1050 -692)"/>
                <path fill={color} fillRule={"evenodd"} d="M1097.87,726a12,12,0,1,1-12,12A12,12,0,0,1,1097.87,726ZM1092,740h4v4a2,2,0,0,0,4,0v-4h4a2,2,0,0,0,0-4h-4v-4a2,2,0,0,0-4,0v4h-4A2,2,0,0,0,1092,740Z" data-name="add copy" id="add_copy" transform="translate(-1050 -692)"/>
            </svg>
        </SvgIcon>
    )
}
