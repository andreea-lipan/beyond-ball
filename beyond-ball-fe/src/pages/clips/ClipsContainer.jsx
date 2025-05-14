import {Box, Typography} from "@mui/material";
import ClipsList from "./ClipsList.jsx";

const ClipsContainer = ({clips}) => {

    return (
        clips.length > 0 ?
                <ClipsList clips={clips}/>
                :
                <NoClipsMessage/>
    );
}

const NoClipsMessage = () => {
    return (
        <Box sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Typography variant='h2'
                        sx={{
                            textAlign: 'center',
                            padding: '1em'
                        }}>
                No clips added yet. <br/>Add one by clicking the icon above!
            </Typography>
        </Box>
    );
}

export default ClipsContainer;