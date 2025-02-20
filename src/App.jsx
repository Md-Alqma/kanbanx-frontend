import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import useAuthStore from "./store/authStore";
import { useEffect } from "react";

function App() {
  const { fetchUser } = useAuthStore();
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
