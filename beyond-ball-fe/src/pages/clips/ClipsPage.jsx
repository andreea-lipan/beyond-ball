import Layout from "../../components/Layout.jsx";
import {
    Box,
    Button,
    Divider,
    Grid, Tooltip,
    Typography, useTheme
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {AddClipIcon} from "../../components/icons/clips/AddClipIcon.jsx";
import {AddFolderIcon} from "../../components/icons/clips/AddFolderIcon.jsx";
import FolderStructure from "./folders/FolderStructure.jsx";
import FolderService from "../../APIs/FolderService.js";
import ClipsContainer from "./ClipsContainer.jsx";
import ClipService from "../../APIs/ClipService.js";
import useModal from "../../components/modals/useModal.js";
import {AddFolderModal} from "./modals/AddFolderModal.jsx";
import {AddClipModal} from "./modals/AddClipModal.jsx";
import SearchBar from "../../components/SearchBar.jsx";

const ClipsPage = () => {
    const theme = useTheme();
    const BtnsColour = theme.palette.secondary.dark

    const [folderTree, setFolderTree] = useState([]);
    const [selectedFolderId, setSelectedFolderId] = useState(null);
    const addFolderModal = useModal(false);

    const [clips, setClips] = useState([]);
    const [filteredClips, setFilteredClips] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const addClipModal = useModal(false);

    useEffect(() => {
        if(!setSelectedFolderId) return
        fetchClips();
    }, [selectedFolderId]);

    const fetchClips = () => {
        ClipService.getClipsByFolder(selectedFolderId).then((response) => {
            setClips(response);
            setFilteredClips(response);
        })
    }

    const createFolder = (folderName) => {
        FolderService.createFolder(folderName,selectedFolderId).then(fetchFolderTree)
    }

    const uploadClip = (file, title) => {
        ClipService.uploadClip(file,title,selectedFolderId).then(fetchClips)
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

    useEffect(() => {
        fetchFolderTree();
    }, []);

    const handleSearchClips = (searchTerm) => {
        if (!searchTerm) {
            setFilteredClips(clips);
            return;
        }
        const newClips = clips.filter((clip) => clip.title.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredClips(newClips);
    }

    // todo ordonat clips after upload date
    // todo figure out how to stop the extra scroll on mac
    // todo extract top bar and maybe more
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
                Clips
            </Typography>

            {/* Page Content */}
            <Box sx={{
                width: {
                    xs: '100%',
                    sm: '90vw',
                    xl: '80vw',
                    xxl: '1900px',
                },
                display: 'flex',
                flexDirection: 'column',
                minHeight: 'calc(100vh - 200px)', // Account for header and title
            }}>

                {/* Top Bar */}
                <Box sx={{
                    backgroundColor: theme.palette.secondary.main,
                    padding: 3,
                    borderRadius: "16px 16px 0 0",
                }}>
                    <Box sx={{
                        margin: 'auto',
                        width: {
                            xs: '100%',    // full width on mobile
                            sm: '100%',   // 300px on tablet
                            myTablet: '70%',
                            md: '60%'
                        },
                        gap: 2,
                    }}>
                        <SearchBar onSearch={handleSearchClips} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                    </Box>
                </Box>

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
                                            <AddFolderIcon color={BtnsColour}/>
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
                                {/* todo make it hoverable */}
                                <FolderStructure folderTree={folderTree} setSelectedFolderId={setSelectedFolderId}/>
                            </Box>
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
                            <Box sx={{
                                height: '30px',
                                display:'flex',
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
                                        <AddClipIcon color={BtnsColour}/>
                                    </Button>
                                </Tooltip>
                            </Box>
                            
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
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Layout>
    )
}

export default ClipsPage;