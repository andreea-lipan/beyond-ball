import {Box} from "@mui/material";
import ClipCard from "./ClipCard";

const ClipsList = ({clips}) => {
    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 3,
            padding: '1em',
            width: '100%'
        }}>
            {clips?.map((clip) => (
                <Box key={clip.id}>
                    <ClipCard clip={clip}/>
                </Box>
            ))}
        </Box>
    );
}

export default ClipsList;