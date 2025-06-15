import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Info from "./pages/info/Info";
import Chat from "./pages/chat/Chat";
import PrivateRoute from "./components/PrivateRoute";
import Tutorial from "./pages/tutorial/Tutorial";
import Profile from "./pages/profile/Profile";
import ResetPassword from "./pages/password/ResetPassword"; 
import ForgotPassword from "./pages/password/ForgotPassword";

function NotFound() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>404</h1>
      <p>Página não encontrada.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/recuperar-senha" element={<ForgotPassword />} />
        <Route path="/sobre" element={<Info />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/alterar-senha/:token" element={<ResetPassword />} />

        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
