import {Box, Button, Tooltip, useTheme} from "@mui/material";
import {AddClipIcon} from "../../../components/icons/clips/AddClipIcon.jsx";
import ClipsContainer from "./ClipsContainer.jsx";
import React from "react";
import Storage from "../../../utils/Storage.js";

const ClipsPageClipsView = ({addClipModal, filteredClips}) => {
    const theme = useTheme();
    const isPlayer = Storage.getRoleFromToken() === "PLAYER"

    return (
        <>
            {!isPlayer &&
                <Box sx={{
                    height: '30px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    paddingLeft: '1em'
                }}>
                    <Tooltip title="Add a new video clip" placement="top">
                        <Button
                            onClick={addClipModal.openModal}
                            sx={{
                                width: 'inherit',
                                padding: 0,
                            }}
                        >
                            <AddClipIcon color={theme.palette.secondary.dark}/>
                        </Button>
                    </Tooltip>
                </Box>
            }

            <Box
                sx={{
                    flex: 1,
                    minHeight: 0,
                    overflow: 'auto',
                    paddingTop: '1em',
                    paddingX: '1em'
                }}>
                <ClipsContainer clips={filteredClips}/>
            </Box>
        </>
    )
}

export default ClipsPageClipsView;