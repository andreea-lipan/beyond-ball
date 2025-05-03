import Layout from "../../components/Layout.jsx";
import {useEffect, useState} from "react";
import whiteboardService from "../../APIs/WhiteboardService.js";
import {Box, IconButton, InputAdornment, TextField} from "@mui/material";
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


const WhiteboardsPage = () => {

    const [whiteboards, setWhiteboards] = useState([]);
    const [filteredWhiteboards, setFilteredWhiteboards] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const navigate = useNavigate();


    const fetchFilteredWhiteboards = (text) => {
        whiteboardService.getWhiteboardsByTitle(text)
            .then((response) => {
                const data = response.data;
                if (data && Array.isArray(data)) {
                    setFilteredWhiteboards(data);
                } else {
                    setFilteredWhiteboards([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching filtered whiteboards:", error);
                setFilteredWhiteboards([]);
            });
    }


    useEffect(() => {
        whiteboardService.getWhiteboards()
            .then((response) => {
                setWhiteboards(response);
                setFilteredWhiteboards(response);
            })
            .catch(() => {
                setWhiteboards(mockWhiteboards);
                setFilteredWhiteboards(mockWhiteboards);
            });
    }, []);


    //TODO: this is just a way to use the backend response, needs to look like the design
    return (
        <Layout>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                mb: 10,
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <Typography variant="h4">
                    Team {Storage.getTeamIdFromToken()} Whiteboards
                </Typography>
            </Box>

            <Box>
                <Box sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-evenly",
                    mt: 5,
                    alignItems: "center",
                    backgroundColor: "#3D5A3C",
                    borderRadius: "10px",
                    pb: 1,
                    pt: 1
                }}>
                    <TextField
                        sx={{
                            display: "flex",
                            minWidth: "50%",
                            backgroundColor: "#A3B18A",
                            borderRadius: "20px",
                            justifyContent: "space-between",
                            color: "#3D5A3C"
                        }}
                        label="Search whiteboards by name"
                        onChange={(e) => {
                            setInputValue(e.target.value)
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment>
                                    <IconButton onClick={() => {
                                        fetchFilteredWhiteboards(inputValue)
                                    }}>
                                        <SearchIcon/>
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}>
                    </TextField>
                </Box>
                <Box sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-evenly",
                    backgroundColor: "#A3B18A",
                    borderBottomRightRadius: "10px",
                    borderBottomLeftRadius: "10px",
                    pb: 5
                }}>
                    <Card sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        mt: 5,
                        maxWidth: 280,
                        borderRadius: 5
                    }}>
                        <CardActionArea onClick={() => navigate("/whiteboards/creation")}>
                            <CardMedia sx={{objectFit: "contain"}}
                                       component="img"
                                       image="https://t4.ftcdn.net/jpg/08/88/95/25/360_F_888952567_Vgepu1UNHVLwBsCgIxANFegbBXLcxGjb.jpg"
                            />
                            <CardContent>
                                <Typography component="div">
                                    <PlusIcon/>
                                </Typography>

                            </CardContent>
                        </CardActionArea>
                    </Card>
                    {Array.isArray(filteredWhiteboards) && filteredWhiteboards.map((whiteboard) => (
                        <WhiteboardListItem key={whiteboard.id} whiteboard={whiteboard}/>
                    ))}

                </Box>
            </Box>


        </Layout>
    )
}

export default WhiteboardsPage;