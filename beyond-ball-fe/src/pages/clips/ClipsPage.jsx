import Layout from "../../components/Layout.jsx";
import {
    Avatar,
    Box,
    Button,
    Card, Divider,
    Grid, IconButton,
    InputAdornment,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography, useTheme
} from "@mui/material";
import {TestComponent} from "../../components/TestComponent.jsx";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {useState} from "react";
import {AddClipIcon} from "../../components/icons/clips/AddClipIcon.jsx";
import {AddFolderIcon} from "../../components/icons/clips/AddFolderIcon.jsx";
import {RichTreeView, SimpleTreeView, TreeItem} from "@mui/x-tree-view";

const ClipsPage = () => {
    const [search, setSearch] = useState("");
    const theme = useTheme();
    const BtnsColour = theme.palette.secondary.dark

    const FOOTBALL_CLIP_FOLDERS = [
        {
            id: 'attacking-play',
            label: 'Attacking Play',
            children: [
                { id: 'counter-attacks', label: 'Counter AttackssssssssssssssssssssssAttackssssssssssssssssssssss' },
                { id: 'build-up', label: 'Build-Up Play' },
                { id: 'final-third', label: 'Final Third Combinations' },
            ],
        },
        {
            id: 'defensive-structure',
            label: 'Defensive Structure',
            children: [
                { id: 'low-block', label: 'Low Block' },
                { id: 'high-press', label: 'High Press' },
                { id: 'mid-block', label: 'Mid Block' },
            ],
        },
        {
            id: 'set-pieces',
            label: 'Set Pieces',
            children: [
                { id: 'corners-for', label: 'Corners - For' },
                { id: 'corners-against', label: 'Corners - Against' },
                { id: 'free-kicks', label: 'Free Kicks' },
                { id: 'throw-ins', label: 'Throw-ins' },
            ],
        },
        {
            id: 'transition-moments',
            label: 'Transition Moments',
            children: [
                { id: 'defense-to-attack', label: 'Defense to Attack' },
                { id: 'attack-to-defense', label: 'Attack to Defense' },
            ],
        },
        {
            id: 'goalkeeping',
            label: 'Goalkeeping',
            children: [
                { id: 'shot-stopping', label: 'Shot Stopping' },
                { id: 'distribution', label: 'Distribution' },
                { id: 'crosses', label: 'Dealing with Crosses' },
            ],
        },
        {
            id: 'finishing',
            label: 'Finishing',
            children: [
                { id: '1v1', label: '1v1 with Keeper' },
                { id: 'long-range', label: 'Long Range Shots' },
                { id: 'headers', label: 'Headers' },
            ],
        },
        {
            id: 'midfield-combos',
            label: 'Midfield Combinations',
            children: [
                { id: 'third-man-runs', label: 'Third Man Runs' },
                { id: 'triangles', label: 'Passing Triangles' },
                { id: 'switch-play', label: 'Switch of Play' },
            ],
        },
        {
            id: 'individual-skills',
            label: 'Individual Skills',
            children: [
                { id: 'dribbling', label: 'Dribbling' },
                { id: 'nutmegs', label: 'Nutmegs' },
                { id: 'skill-moves', label: 'Skill Moves' },
            ],
        },
        {
            id: 'defensive-duels',
            label: 'Defensive Duels',
            children: [
                { id: 'tackles', label: 'Tackles' },
                { id: 'interceptions', label: 'Interceptions' },
                { id: 'blocks', label: 'Blocks' },
            ],
        },
        {
            id: 'aerial-battles',
            label: 'Aerial Battles',
            children: [
                { id: 'attacking-headers', label: 'Attacking Headers' },
                { id: 'defensive-headers', label: 'Defensive Headers' },
            ],
        },
        {
            id: 'team-shape',
            label: 'Team Shape',
            children: [
                { id: 'out-of-possession', label: 'Out of Possession' },
                { id: 'in-possession', label: 'In Possession' },
            ],
        },
        {
            id: 'penalty-area-play',
            label: 'Penalty Area Play',
            children: [
                { id: 'goalmouth-scrambles', label: 'Goalmouth Scrambles' },
                { id: 'rebounds', label: 'Rebounds' },
            ],
        },
        {
            id: 'pressing',
            label: 'Pressing',
            children: [
                { id: 'counter-pressing', label: 'Counter Pressing' },
                { id: 'press-traps', label: 'Press Traps' },
            ],
        },
        {
            id: 'passing-combinations',
            label: 'Passing Combinations',
            children: [
                { id: '1-2s', label: '1-2s' },
                { id: 'wall-passes', label: 'Wall Passes' },
                { id: 'diagonals', label: 'Diagonal Balls' },
            ],
        },
        {
            id: 'player-focus',
            label: 'Player Focus',
            children: [
                { id: 'forwards', label: 'Forwards' },
                { id: 'midfielders', label: 'Midfielders' },
                { id: 'defenders', label: 'Defenders' },
            ],
        },
        {
            id: 'referee-decisions',
            label: 'Referee Decisions',
            children: [
                { id: 'penalties', label: 'Penalties' },
                { id: 'fouls', label: 'Fouls' },
                { id: 'offsides', label: 'Offsides' },
            ],
        },
        {
            id: 'injury-moments',
            label: 'Injury Moments',
            children: [
                { id: 'minor-knocks', label: 'Minor Knocks' },
                { id: 'stretcher-cases', label: 'Stretcher Cases' },
            ],
        },
        {
            id: 'match-highlights',
            label: 'Match Highlights',
            children: [
                { id: 'first-half', label: 'First Half' },
                { id: 'second-half', label: 'Second Half' },
                { id: 'extra-time', label: 'Extra Time' },
            ],
        },
        {
            id: 'fan-interaction',
            label: 'Fan Interaction',
            children: [
                { id: 'celebrations', label: 'Celebrations' },
                { id: 'chants', label: 'Chants' },
                { id: 'crowd-reactions', label: 'Crowd Reactions' },
            ],
        },
    ];

    // todo figure out how to stop the extra scroll on mac
    return (
        <Layout>
            <Typography variant="h3" align="center" gutterBottom sx={{ color: "#2e7d32", mt: 3 }}>
                Clips
            </Typography>

            <Box sx={{
                // minHeight: "60vh",
                // height: "auto",
                width: {
                    xs: '100%',    // mobile
                    sm: '90vw',   // tablet
                    // myTablet: '680px',
                    // md: '800px',
                    // lg: '1100px',
                    xl: '80vw',
                    xxl: '1900px',
                },
            }}>
                <Box sx={{
                    backgroundColor: theme.palette.secondary.main,
                    padding: 3,
                    borderRadius: "16px 16px 0 0",

                    // marginX: 4,
                    // marginTop: 4,
                }}>
                    <Box sx={{
                        // display: 'flex',
                        // justifyContent: 'space-between',
                        // alignItems: 'center',
                        // flexWrap: 'wrap',
                        margin: 'auto',
                        width: {
                            xs: '100%',    // full width on mobile
                            sm: '100%',   // 300px on tablet
                            myTablet: '70%',
                            md: '60%'
                        },
                        gap: 2,
                    }}>

                        <TextField
                            // placeholder="Search clips by name"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            sx={{
                                // minWidth: '150px',
                                width: '100%',
                                backgroundColor: theme.palette.primary.main,
                                borderRadius: 5,
                                boxShadow: "none",
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: '25px',
                                    boxShadow: "none",
                                },
                                "& fieldset": {
                                    border: "none",
                                },
                            }}
                            slotProps={{
                                input: {
                                    startAdornment: <InputAdornment position="start">
                                        <SearchIcon/>
                                    </InputAdornment>,
                                },
                            }}
                        />

                    </Box>
                </Box>

                <Box sx={{
                    backgroundColor: theme.palette.primary.main,
                    padding: "24px 5px 24px 5px",
                    borderRadius: "0 0 16px 16px",
                    // height: 'calc(100% - 104px)',
                    minHeight: '55vh',
                    height: "auto",
                }}>
                    <Grid container sx={{
                        // height: '100%',
                        minHeight: 'inherit'
                    }}>
                        <Grid size={{ xs: 2, sm: 3, md: 2, lg:5, w1400: 4, xl:2 }} sx={{
                            height: '100%',
                            minHeight: 'inherit',
                            borderRight: 1
                        }}>
                            <Box sx={{
                                height: '30px',
                                display:'flex',
                                alignItems: 'flex-end',
                                flexDirection: 'column',
                                paddingRight: '1em'
                            }}>
                                <AddFolderIcon color={BtnsColour}/>
                            </Box>
                            <Box sx={{
                                padding: "20px 0 20px 0",
                                overflowX: 'auto',

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
                                <RichTreeView
                                    items={FOOTBALL_CLIP_FOLDERS}
                                    sx={{
                                        '& .MuiTreeItem-label': {
                                            textAlign: 'left',
                                            // whiteSpace: 'nowrap',
                                            minWidth: 'max-content'
                                        },
                                        '& .MuiTreeItem-root': {
                                            minWidth: 'max-content'
                                        }
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Divider orientation="vertical" sx={{border: "20px"}}/>
                        <Grid size={{ xs: 2, sm: 9, md: 10, lg: 7, w1400: 8, xl:10 }} sx={{ //todo fix this aaaa
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            minHeight: 'inherit'
                        }}>
                            <Box sx={{
                                height: '30px',
                                display:'flex',
                                alignItems: 'flex-start',
                                flexDirection: 'column',
                                paddingLeft: '1em'
                            }}>
                                <AddClipIcon color={BtnsColour}/>
                            </Box>
                            <NoClipsMessage></NoClipsMessage>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Layout>
    )

}

const NoClipsMessage = () => {
    return (
        <>
            <Typography variant='h2'
                        sx={{
                            display: 'flex',
                            margin: 'auto',
                            padding: '1em'
            }}>
                No clips added yet. <br/>Add one by clicking the icon above!
            </Typography>
        </>
    );
}

export default ClipsPage;