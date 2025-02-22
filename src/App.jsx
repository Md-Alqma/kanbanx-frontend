import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import AuthLayout from "./components/layout/AuthLayout";
import AppLayout from "./components/layout/AppLayout";
import Home from "./pages/Home";
import Board from "./pages/Board";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Signup />} />
          </Route>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="boards" element={<Home />} />
            <Route path="boards/:boardId" element={<Board />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
