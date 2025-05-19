import {Box, Button, Tooltip, useTheme} from "@mui/material";
import {AddFolderIcon} from "../../../components/icons/clips/AddFolderIcon.jsx";
import FolderStructure from "./folders/FolderStructure.jsx";
import React from "react";

const ClipsPageFolderView = ({addFolderModal, folderTree, setSelectedFolderId}) => {
    const theme = useTheme();

    return (
        <>
            <Box sx={{
                height: '30px',
                display:'flex',
                alignItems: 'flex-end',
                flexDirection: 'column',
                paddingRight: '2em'
            }}>
                <Tooltip title="Create a new folder" placement="top">
                    <Button
                        onClick={addFolderModal.openModal}
                        sx={{
                            minWidth: 'auto',
                            padding: 0,
                        }}
                    >
                        <AddFolderIcon color={theme.palette.secondary.dark}/>
                    </Button>
                </Tooltip>
            </Box>
            <Box sx={{
                padding: "20px 0 20px 0",
                overflowX: 'auto',
                flex: 1,
                minHeight: 0,

                // WebKit (Chrome, Safari, etc) scrollbar styling
                '&::-webkit-scrollbar': {
                    height: '8px',
                },
                '&::-webkit-scrollbar-track': {
                    background: theme.palette.primary.main,
                    borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: theme.palette.secondary.main,
                    borderRadius: '4px',
                    '&:hover': {
                        background: theme.palette.secondary.dark,
                    }
                },

                // Firefox scrollbar styling
                '@-moz-document url-prefix()': {
                    scrollbarWidth: 'thin',
                    scrollbarColor: `${theme.palette.secondary.main} ${theme.palette.primary.main}`,
                }

            }}>
                <FolderStructure folderTree={folderTree} setSelectedFolderId={setSelectedFolderId}/>
            </Box>
        </>
    )
}

export default ClipsPageFolderView;