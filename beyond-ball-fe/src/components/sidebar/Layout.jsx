import {
    Box,
    CssBaseline,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    styled, Tooltip,
    useTheme
} from "@mui/material";
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {useNavigate} from "react-router-dom";
import {CLIPS_PAGE, PROFILE_PAGE, QUIZZES_PAGE, TEAM_PAGE, WHITEBOARDS_PAGE} from "../../utils/UrlConstants.js";
import {MenuIcon} from "../icons/sidebar/MenuIcon.jsx";
import {WhiteboardIcon} from "../icons/sidebar/WhiteboardIcon.jsx";
import {TeamIcon} from "../icons/sidebar/TeamIcon.jsx";
import {ProfileIcon} from "../icons/sidebar/ProfileIcon.jsx";
import {ClipsIcon} from "../icons/sidebar/ClipsIcon.jsx";
import {QuizzesIcon} from "../icons/sidebar/QuizzesIcon.jsx";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Storage from "../../utils/Storage.js";
import { useSidebar } from './SidebarContext.jsx';

const drawerWidth = 240

const Layout = ({children}) => {
    const { isOpen, setIsOpen } = useSidebar();

    const handleDrawerisOpen = () => {
        setIsOpen(true);
    };

    const handleDrawerClose = () => {
        setIsOpen(false);
    };

    const navigator = useNavigate();

    const theme = useTheme()
    const BtnsColour = theme.palette.secondary.dark

    const userRole = Storage.getRoleFromToken();
    const userId = Storage.getUserIdFromToken();

    const buttonsList = [
        {text:"Whiteboards", url:WHITEBOARDS_PAGE, show:true, icon:<WhiteboardIcon color={BtnsColour}/>},
        {text:"Team", url:TEAM_PAGE, show:true, icon:<TeamIcon color={BtnsColour}/>},
        {text:"Profile", url:PROFILE_PAGE(userId), show:userRole === "PLAYER", icon:<ProfileIcon color={BtnsColour}/>},
        {text:"Clips", url:CLIPS_PAGE, show:true, icon:<ClipsIcon color={BtnsColour}/>},
        {text:"Quizzes", url:QUIZZES_PAGE, show:true, icon:<QuizzesIcon color={BtnsColour}/>},
    ]

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>

            {/* The sidebar */}
            <Drawer variant="permanent" isOpen={isOpen}>

                {/* isOpen and close option */}
                <DrawerHeader>
                    {isOpen ?
                        <Tooltip title={"Close menu"} placement="right">
                            <IconButton
                                onClick={handleDrawerClose}
                                >
                                <ChevronLeftIcon/>
                            </IconButton>
                        </Tooltip>
                        :
                        <Tooltip title={"isOpen menu"} placement="right">
                            <IconButton
                                aria-label="isOpen drawer"
                                onClick={handleDrawerisOpen}
                                sx={[{margin: 'auto'}]
                                }>
                                <MenuIcon color={BtnsColour}/>
                            </IconButton>
                        </Tooltip>
                    }
                </DrawerHeader>
                <Divider/>

                {/* ALL sidebar options */}
                <List>
                    {buttonsList.map(({text, url,show, icon}) => (
                        show ?
                        <ListItem key={text} disablePadding
                                  sx={[{display: 'block'},
                                      {":hover": {
                                      backgroundColor: theme.palette.secondary.main
                                  }}]}>
                            <ListItemButton
                                sx={[
                                    {minHeight: 48, px: 2.5,},
                                    isOpen ? {justifyContent: 'initial'}
                                        : {justifyContent: 'center'},]
                                    }
                                onClick={() => navigator(url)}
                            >
                                <Tooltip title={text} placement="right"> {/* this is for hover text */}
                                    <ListItemIcon
                                        sx={[{minWidth: 0, justifyContent: 'center',},
                                            isOpen ? {mr: 3}
                                                : {mr: 'auto'}]}
                                    >
                                        {icon}
                                    </ListItemIcon>
                                </Tooltip>
                                <ListItemText
                                    primary={text}
                                    sx={[isOpen ? {opacity: 1}
                                        : {opacity: 0}]}
                                />
                            </ListItemButton>
                        </ListItem>
                            :
                        <></>
                    ))}

                    {/* Logout Button */}
                    <ListItem disablePadding
                              sx={[{ display: 'block' }, { ":hover": { backgroundColor: theme.palette.secondary.main } }]}>
                        <ListItemButton
                            sx={[
                                { minHeight: 48, px: 2.5 },
                                isOpen ? { justifyContent: 'initial' } : { justifyContent: 'center' }
                            ]}
                            onClick={() => {
                                Storage.logout();
                                navigator("/");
                            }}
                        >
                            <Tooltip title="Logout" placement="right">
                                <ListItemIcon
                                    sx={[
                                        { minWidth: 0, justifyContent: 'center' },
                                        isOpen ? { mr: 3 } : { mr: 'auto' }
                                    ]}
                                >
                                    <ExitToAppIcon color={BtnsColour} />
                                </ListItemIcon>
                            </Tooltip>
                            <ListItemText
                                primary="Logout"
                                sx={[isOpen ? { opacity: 1 } : { opacity: 0 }]}
                            />
                        </ListItemButton>
                    </ListItem>

                </List>
            </Drawer>

            {/* The page content, shows on the right of the sidebar */}
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                {children}
            </Box>
        </Box>
    );
}

export default Layout;

const isOpenedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    // (IDK if this is necessary anymore I removed the app bar)
    ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'isOpen'})(
    ({theme}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        variants: [
            {
                props: ({isOpen}) => isOpen,
                style: {
                    ...isOpenedMixin(theme),
                    '& .MuiDrawer-paper': isOpenedMixin(theme),
                },
            },
            {
                props: ({isOpen}) => !isOpen,
                style: {
                    ...closedMixin(theme),
                    '& .MuiDrawer-paper': closedMixin(theme),
                },
            },
        ],
    }),
);
