import Layout from "../../../components/sidebar/Layout.jsx";
import {
    Box,
    Divider,
    Grid,
    Typography, useTheme
} from "@mui/material";
import React, {useEffect, useState} from "react";
import FolderService from "../../../APIs/FolderService.js";
import ClipService from "../../../APIs/ClipService.js";
import useModal from "../../../components/modals/useModal.js";
import {AddFolderModal} from "./modals/AddFolderModal.jsx";
import {AddClipModal} from "./modals/AddClipModal.jsx";
import ClipsPageFolderView from "./ClipsPageFolderView.jsx";
import ClipsPageClipsView from "./ClipsPageClipsView.jsx";
import ClipsPageTopBar from "./ClipsPageTopBar.jsx";
import Storage from "../../../utils/Storage.js";
import {connect, disconnect} from "../../../APIs/WebSocket.js";

const ClipsPage = () => {
    const theme = useTheme();

    const teamId = Storage.getTeamIdFromToken();
    const [folderTree, setFolderTree] = useState([]);
    const [selectedFolderId, setSelectedFolderId] = useState( null);
    const addFolderModal = useModal(false);

    const [clips, setClips] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const addClipModal = useModal(false);

    const filteredClips = clips.filter((clip) => {
        return clip.folderId===selectedFolderId && clip.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    useEffect(() => {
        fetchFolderTree();
        fetchClips();

        connect(teamId, "CLIP", handleWebSocketMessage)

        return () => {
            disconnect();
        }
    }, []);

    const handleWebSocketMessage = (message) => {
        if(message?.parentFolderId !== undefined) {
            handleFolderWebSocketMessage(message);
        } else {
            handleClipWebSocketMessage(message);
        }
    }

    const handleClipWebSocketMessage = (message) => {
        setClips(prev=>[...prev, message])
    }

    const insertNode = (tree, newNode) => {
        const queue = [...tree];
        const nodeToInsert = { ...newNode };
        delete nodeToInsert.parentFolderId;

        while (queue.length) {
            const current = queue.shift();
            if (current.id === newNode.parentFolderId) {
                const updated = {
                    ...current,
                    subfolders: [...(current.subfolders || []), nodeToInsert]
                };
                return updateTreeWithNewNode(tree, updated);
            }

            if (current.subfolders?.length) {
                queue.push(...current.subfolders);
            }
        }

        return tree;
    };

    const updateTreeWithNewNode = (tree, updatedNode) => {
        return tree.map(node => {
            if (node.id === updatedNode.id) return updatedNode;
            if (node.subfolders?.length) {
                return {
                    ...node,
                    subfolders: updateTreeWithNewNode(node.subfolders, updatedNode)
                };
            }
            return node;
        });
    };

    const handleFolderWebSocketMessage = (message) => {
        if(message.parentFolderId === null) {
            setFolderTree(prev=>[...prev, message]);
        } else {
            setFolderTree(prevTree => insertNode(prevTree, message));
        }
    }

    const fetchClips = () => {
        ClipService.getAllClips().then((response) => {
            setClips(response);
        })
    }

    const createFolder = (folderName) => {
        FolderService.createFolder(folderName,selectedFolderId)
    }

    const uploadClip = (file, title) => {
        ClipService.uploadClip(file,title,selectedFolderId)
    };

    const fetchFolderTree = () => {
        FolderService.getFolderTree()
            .then((response) => {
                setFolderTree(response);
            })
            .catch((error) => {
                console.error("Error fetching folder tree:", error);
                // todo show error
            });
    }

    return (
        <Layout>
            {/* Modals for adding a clip and a folder */}
            <AddFolderModal
                state={addFolderModal}
                handleConfirm={createFolder}
            />
            <AddClipModal
                state={addClipModal}
                handleConfirm={uploadClip}
            />

            {/* Page Title */}
            <Typography variant="h1" align="center" sx={{ mt: 3, mb: 3 }}>
                Team Clips
            </Typography>

            {/* Page Content */}
            <Box sx={{
                width: {
                    // xs: '100%',
                    sm: '80vw',
                    xl: '80vw',
                    xxl: '1900px',
                },
                display: 'flex',
                flexDirection: 'column',
                minHeight: 'calc(100vh - 143px)', // Account for header and title
            }}>

                {/* Top Bar */}
                <ClipsPageTopBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

                {/* Main Content */}
                <Box sx={{
                    backgroundColor: theme.palette.primary.main,
                    padding: "24px 5px 24px 5px",
                    borderRadius: "0 0 16px 16px",
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Grid container
                          columns={16}
                          sx={{
                            flex: 1,
                            minHeight: 0, // Important for proper flex behavior
                    }}>

                        {/* Left side, folder structure */}
                        <Grid size={{ xs: 2, sm: 3}} sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            borderRight: 1
                        }}>
                            <ClipsPageFolderView addFolderModal={addFolderModal} folderTree={folderTree} setSelectedFolderId={setSelectedFolderId}/>
                        </Grid>

                        <Divider orientation="vertical" 
                            sx={{
                                border: "20px"
                            }}/>

                        {/* Right side, clips */}
                        <Grid size={{ xs: 14, sm: 13}}
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                flex: 1,
                                minHeight: 0
                        }}>
                            <ClipsPageClipsView addClipModal={addClipModal} filteredClips={filteredClips}/>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Layout>
    )
}

export default ClipsPage;