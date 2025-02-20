import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Button } from "./components/ui/button";
import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <>
      <Router>
        <div className="flex justify-center items-center flex-col gap-10 p-16">
          <h1 className="text-4xl font-black">KanbanX</h1>
        </div>
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
