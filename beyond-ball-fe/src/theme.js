import {alpha, createTheme} from "@mui/material";

export function theme() {

    //todo
    // THESE VALUES CAN BE CHANGED LATER
    // THIS IS JUST A START
    // but please use them!! bc if when need to make
    // changes we can just make them here

    const palette = {
        primary: {
            main: "#A3B18A",
        },
        secondary: {
            main: "#588157", // for btns
            dark: "#3D5A3C", // when hovering over btns
        },
        background: {
            main: "#DAD7CD",
        },
        error: {
            main: "#FB9595",
        },
        text: {
            primary: "#495057",
            secondary: "#ffffff"

        }
    };

    return createTheme({
        palette,
        typography: {
            htmlFontSize: 16,
            fontSize: 14,
            fontFamily: [
                "Montserrat", "sans-serif"
            ].join(','),

            // Titles
            h1: {
                fontSize: '1.45rem',
                fontWeight: 700,
                color: alpha(palette.secondary.main, 1)
            },
            // Subtitles
            h2: {
                fontSize: '1.2rem',
                fontWeight: 400,
                color: alpha(palette.text.primary, 1)
            },
            // base size
            body1: {
                fontSize: '1rem',
                fontWeight: 400,
                color: alpha(palette.text.primary, 1)
            },
            // subtext
            body2: {
                fontSize: '1rem',
                fontWeight: 400,
                color: alpha(palette.text.primary, 0.7)
            },
            // small text
            subtitle1: {
                fontSize: '0.875rem',
                fontWeight: 400,
                color: alpha(palette.text.primary, 0.7)
            }
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        backgroundColor: palette.background.main, // your background.main
                        margin: 0,
                        padding: 0,
                    },
                },
            },
            MuiDrawer: {
                styleOverrides: {
                    paper : {
                        backgroundColor: palette.primary.main, // your background.main
                        margin: 0,
                        padding: 0,
                    }
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                    },
                    contained: {
                        borderRadius: 13,
                        color: palette.text.secondary, // white text on contained buttons
                        backgroundColor: palette.secondary.main,
                        '&:hover': {
                            backgroundColor: palette.secondary.dark,
                        },
                    },
                    outlined:{
                        borderRadius: 13,
                        '&:hover': {
                            borderColor: palette.secondary.dark,
                        },
                    }
                }
            }
        }
    });
}