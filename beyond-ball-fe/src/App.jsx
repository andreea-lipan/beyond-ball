import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css'
import Layout from "./components/Layout.jsx";
import WhiteboardsPage from "./pages/whiteboards/WhiteboardPage.jsx";
import TeamPage from "./pages/TeamPage.jsx";
import PlayerProfilePage from "./pages/PlayerProfilePage.jsx";
import ClipsPage from "./pages/clips/ClipsPage.jsx";
import QuizzesPage from "./pages/quizzes/QuizzesPage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import TeamRegisterPage from "./pages/auth/TeamRegisterPage.jsx";
import {ThemeProvider} from "@mui/material";
import {theme} from "./theme";

function App() {

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    {/*<ScrollToTop/> /!* This will scroll to the top whenever the route changes *!/*/}
                    <Routes>

                        {/* Public content */}
                        <Route path="/" element={<LoginPage/>}/>
                        <Route path="/register-team" element={<TeamRegisterPage/>}/>

                        {/* Player & Staff content */}
                        {/* The line below gets added after login is made */}
                        {/*<Route path='/' element={<CustomRoute roles={['PLAYER', STAFF]}/>}>*/}
                            <Route path="/whiteboards" element={<WhiteboardsPage/>}/>
                            <Route path="/team" element={<TeamPage/>}/>
                            <Route path="/profile" element={<PlayerProfilePage/>}/>
                            <Route path="/clips" element={<ClipsPage/>}/>
                            <Route path="/quizzes" element={<QuizzesPage/>}/>
                        {/*</Route>*/}

                        {/* Admin Content */}
                        {/*<Route path='/' element={<CustomRoute roles={['ADMIN']}/>}>*/}
                        {/*    /!* todo *!/*/}
                        {/*</Route>*/}


                    </Routes>
                </BrowserRouter>
            </ThemeProvider>

        </div>
    )
}

export default App
