import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import { ResumeProvider } from "./context/ResumeContext";
import ResumeBuilder from "./pages/ResumeBuilder";
import Preview from "./pages/Preview";

const App = () => {
  return (
    <>
      <Toaster />
      <AuthProvider>
        <ResumeProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/dashboard" element={<AppLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="builder/:resumeId" element={<ResumeBuilder />} />
            </Route>
            <Route path="/view/:resumeId" element={<Preview />} />
          </Routes>
        </ResumeProvider>
      </AuthProvider>
    </>
  );
};

export default App;
