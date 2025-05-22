import Layout from "../../components/sidebar/Layout.jsx";
import React, {useEffect, useState} from "react";
import whiteboardService from "../../APIs/WhiteboardService.js";
import {Box, useTheme} from "@mui/material";
import {WhiteboardListItem} from "./display/WhiteboardListItem.jsx";
import {mockWhiteboards} from "../../utils/whiteboard.js";
import Storage from "../../utils/Storage.js";
import {useNavigate} from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import {WHITEBOARD_CREATION_PAGE} from "../../utils/UrlConstants.js";
import WhiteboardsTopBar from "./WhiteboardsTopBar.jsx";
import {connect,disconnect} from "../../APIs/WebSocket.js";

const WhiteboardsPage = () => {
    const teamId = Storage.getTeamIdFromToken();
    const theme = useTheme();
    const [whiteboards, setWhiteboards] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("title");
    const navigate = useNavigate();

    useEffect(() => {
        fetchWhiteboards()
        connect(teamId, "WHITEBOARD", handleWebSocketMessage)

        return () => {
            disconnect();
        }
    }, []);

    const handleWebSocketMessage = (message) => {
        setWhiteboards(prev=>[...prev, message])
    }


    const fetchWhiteboards = () => {
        whiteboardService.getWhiteboards()
            .then((response) => {
                setWhiteboards(response);
            })
            .catch(() => {
                setWhiteboards(mockWhiteboards);
            });
    }


    const filteredWhiteboards = whiteboards.filter((whiteboard) => {
        return filter.toLowerCase() === "title" ?
            whiteboard.title.toLowerCase().includes(searchTerm.toLowerCase())
            :
            whiteboard.author.toLowerCase().includes(searchTerm.toLowerCase())
    })


    return (
        <Layout>

            {/* Page Title */}
            <Typography variant="h1" align="center" sx={{mt: 3, mb: 3}}>
                Team Whiteboards
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
                <WhiteboardsTopBar filter={filter} setFilter={setFilter} search={searchTerm} setSearch={setSearchTerm}/>

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
                        <CardActionArea onClick={() => {
                            navigate(WHITEBOARD_CREATION_PAGE)
                        }}>
                            <CardMedia sx={{objectFit: "contain", scale: '95%'}}
                                       component="img"
                                       image="src/assets/emptyWhiteboard.png"
                            />
                            <CardContent sx={{padding: '0.5em'}}>
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