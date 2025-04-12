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
import MockPage from "./pages/MockPage.jsx";
import Storage from "./utils/Storage.js";
import AccessDeniedRedirect from "./components/AccessDeniedRedirect.jsx";
import { useAuth } from "./components/AuthContext";


function App() {
    const { role, teamId } = useAuth();

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    {/*<ScrollToTop/> /!* This will scroll to the top whenever the route changes *!/*/}
                    <Routes key={role}>
            {/* Public routes */}
            <Route
              path="/"
              element={
                (() => {
                  sessionStorage.setItem("lastValidPath", "/");
                  return <LoginPage />;
                })()
              }
            />
            <Route
              path="/register-team"
              element={
                (() => {
                //   sessionStorage.setItem("lastValidPath", "/register-team");
                  return <TeamRegisterPage />;
                })()
              }
            />

            {/* Player & Staff routes */}
            <Route
              path="/team"
              element={
                ["PLAYER", "STAFF"].includes(role)
                  ? (() => {
                      sessionStorage.setItem("lastValidPath", "/team");
                      return <TeamPage />;
                    })()
                  : <AccessDeniedRedirect />
              }
            />
            <Route
              path="/whiteboards"
              element={
                ["PLAYER", "STAFF"].includes(role)
                  ? (() => {
                      sessionStorage.setItem("lastValidPath", "/whiteboards");
                      return <WhiteboardsPage />;
                    })()
                  : <AccessDeniedRedirect />
              }
            />
            <Route
              path="/profile"
              element={
                ["PLAYER", "STAFF"].includes(role)
                  ? (() => {
                      sessionStorage.setItem("lastValidPath", "/profile");
                      return <PlayerProfilePage />;
                    })()
                  : <AccessDeniedRedirect />
              }
            />
            <Route
              path="/clips"
              element={
                ["PLAYER", "STAFF"].includes(role)
                  ? (() => {
                      sessionStorage.setItem("lastValidPath", "/clips");
                      return <ClipsPage />;
                    })()
                  : <AccessDeniedRedirect />
              }
            />
            <Route
              path="/quizzes"
              element={
                ["PLAYER", "STAFF"].includes(role)
                  ? (() => {
                      sessionStorage.setItem("lastValidPath", "/quizzes");
                      return <QuizzesPage />;
                    })()
                  : <AccessDeniedRedirect />
              }
            />

            {/* Admin-only route */}
            <Route
              path="/mock"
              element={
                role === "ADMIN"
                  ? (() => {
                      sessionStorage.setItem("lastValidPath", "/mock");
                      return <MockPage />;
                    })()
                  : <AccessDeniedRedirect />
              }
            />
          </Routes>

                </BrowserRouter>
            </ThemeProvider>

        </div>
    )
}

export default App
