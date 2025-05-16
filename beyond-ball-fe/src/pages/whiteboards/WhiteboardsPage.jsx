import Layout from "../../components/Layout.jsx";
import React, {useEffect, useState} from "react";
import whiteboardService from "../../APIs/WhiteboardService.js";
import {Box, IconButton, InputAdornment, TextField, useTheme} from "@mui/material";
import {WhiteboardListItem} from "./display/WhiteboardListItem.jsx";
import {mockWhiteboards} from "../../utils/whiteboard.js";
import Storage from "../../utils/Storage.js";
import {SearchIcon} from "../../components/icons/SearchIcon.jsx";
import {PlusIcon} from "../../components/icons/PlusIcon.jsx";
import {useNavigate} from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import SearchBar from "../../components/SearchBar.jsx";
import {alpha} from "@mui/material/styles";
import {WHITEBOARD_CREATION_PAGE} from "../../utils/UrlConstants.js";


const WhiteboardsPage = () => {
    const theme = useTheme();
    const [whiteboards, setWhiteboards] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        whiteboardService.getWhiteboards()
            .then((response) => {
                setWhiteboards(response);
            })
            .catch(() => {
                setWhiteboards(mockWhiteboards);
            });
    }, []);


    const filteredWhiteboards = whiteboards.filter((whiteboard) => {
        return whiteboard.title.toLowerCase().includes(searchTerm.toLowerCase());
    })


    return (
        <Layout>

            {/* Page Title */}
            <Typography variant="h1" align="center" sx={{ mt: 3, mb: 3 }}>
                Team {Storage.getTeamIdFromToken()} Whiteboards
            </Typography>

            <Box sx={{
                width: {
                    xs: '100%',
                    sm: '90vw',
                    xl: '80vw',
                    xxl: '1900px',
                },
                display: 'flex',
                flexDirection: 'column',
                minHeight: 'calc(100vh - 143px)', // Account for header and title
            }}>

                {/* Top Bar */}
                <Box sx={{
                    backgroundColor: theme.palette.secondary.main,
                    borderRadius: "16px 16px 0 0",
                    padding: 3,
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
                        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                    </Box>
                </Box>

                {/*<Box sx={{*/}
                {/*    display: 'flex',*/}
                {/*    flex: 1,*/}
                {/*    minHeight: 0*/}
                {/*}}>*/}
                <Box sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    backgroundColor: theme.palette.primary.main,
                    gap: "20px",
                    minHeight: 0,
                    alignContent: "flex-start",
                    flex: 1,
                    paddingTop: "25px",
                    paddingBottom: "25px",
                    borderRadius: "0 0 16px 16px"
                }}>
                    <Card sx={{
                        display: "flex", 
                        height: '235px', 
                        justifyContent: "space-arround", 
                        // margin: "10px",
                        maxWidth: 280, 
                        borderRadius: 5,
                        opacity: 0.8
                    }}>
                        <CardActionArea onClick={() => {navigate(WHITEBOARD_CREATION_PAGE)}}>
                            <CardMedia sx={{objectFit: "contain", scale: '95%'}}
                                       component="img"
                                       image="src/assets/emptyWhiteboard.png"
                            />
                            <CardContent sx={{padding:'0.5em'}}>
                                <Typography variant="body1">
                                    Create a new whiteboard
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                    {filteredWhiteboards?.map((whiteboard) => (
                        <WhiteboardListItem key={whiteboard.id} whiteboard={whiteboard}/>
                    ))}

                </Box>
                </Box>
            {/*</Box>*/}


        </Layout>
    )
}

export default WhiteboardsPage;