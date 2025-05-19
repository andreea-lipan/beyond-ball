import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import WhiteboardsPage from "./pages/whiteboards/WhiteboardsPage.jsx";
import TeamPage from "./pages/TeamPage.jsx";
import PlayerProfilePage from "./pages/PlayerProfilePage.jsx";
import ClipsPage from "./pages/clips/view-clips/ClipsPage.jsx";
import ClipDetailPage from "./pages/clips/clip-detail/ClipDetailPage.jsx";
import QuizzesPage from "./pages/quizzes/QuizzesPage.jsx";
import CreateQuiz from "./pages/quizzes/CreateQuiz.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import TeamRegisterPage from "./pages/auth/TeamRegisterPage.jsx";
import MockPage from "./pages/MockPage.jsx";
import AccessDeniedRedirect from "./components/AccessDeniedRedirect.jsx";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { useAuth } from "./components/AuthContext";
import WhiteboardCreationPage from "./pages/whiteboards/WhiteboardCreationPage.jsx";
import WhiteboardDetailPage from "./pages/whiteboards/WhiteboardDetailPage.jsx";
import TeamAdminPage from "./pages/TeamAdminPage.jsx";
import TakeQuizPage from "./pages/quizzes/TakeQuizPage.jsx"; // 👈 Importă pagina nouă

function App() {
  const { role } = useAuth();

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
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
            <Route path="/register-team" element={<TeamRegisterPage />} />

            {/* Player & Staff routes */}
            <Route
              path="/team"
              element={
                ["PLAYER", "STAFF"].includes(role)
                  ? (() => {
                      sessionStorage.setItem("lastValidPath", "/team");
                      return <TeamPage />;
                    })()
                  : <TeamAdminPage />
              }
            />

            <Route
              path="/whiteboards"
              element={
                ["PLAYER", "STAFF", "ADMIN"].includes(role)
                  ? (() => {
                      sessionStorage.setItem("lastValidPath", "/whiteboards");
                      return <WhiteboardsPage />;
                    })()
                  : <AccessDeniedRedirect />
              }
            />

            <Route
              path="/whiteboards/creation"
              element={
                ["PLAYER", "STAFF", "ADMIN"].includes(role)
                  ? (() => {
                      sessionStorage.setItem("lastValidPath", "/whiteboards/creation");
                      return <WhiteboardCreationPage />;
                    })()
                  : <AccessDeniedRedirect />
              }
            />

            <Route
              path="/whiteboards/:id"
              element={
                ["PLAYER", "STAFF", "ADMIN"].includes(role)
                  ? (() => {
                      sessionStorage.setItem("lastValidPath", "/whiteboards/:id");
                      return <WhiteboardDetailPage />;
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
                ["PLAYER", "STAFF", "ADMIN"].includes(role)
                  ? (() => {
                      sessionStorage.setItem("lastValidPath", "/clips");
                      return <ClipsPage />;
                    })()
                  : <AccessDeniedRedirect />
              }
            />

            <Route
              path="/clips/:id"
              element={
                ["PLAYER", "STAFF", "ADMIN"].includes(role)
                  ? (() => {
                      sessionStorage.setItem("lastValidPath", "/clips/:id");
                      return <ClipDetailPage />;
                    })()
                  : <AccessDeniedRedirect />
              }
            />

            {/* ✅ Quizzes Page */}
            <Route
              path="/quizzes"
              element={
                ["PLAYER", "STAFF", "ADMIN"].includes(role)
                  ? (() => {
                      sessionStorage.setItem("lastValidPath", "/quizzes");
                      return <QuizzesPage />;
                    })()
                  : <AccessDeniedRedirect />
              }
            />

            {/* ✅ Create Quiz Page - only for STAFF and ADMIN */}
            <Route
              path="/quizzes/create"
              element={
                ["STAFF", "ADMIN"].includes(role)
                  ? (() => {
                      sessionStorage.setItem("lastValidPath", "/quizzes/create");
                      return <CreateQuiz />;
                    })()
                  : <AccessDeniedRedirect />
              }
            />

            
  <Route
    path="/quizzes/:id"
      element={
        ["PLAYER", "STAFF", "ADMIN"].includes(role)
      ? (() => {
          sessionStorage.setItem("lastValidPath", "/quizzes/:id");
          return <TakeQuizPage />;
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
  );
}

export default App;
