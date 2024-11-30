import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Createuser from "./pages/Createuser";
import Edituser from "./pages/Edituser";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<Createuser />} />
        <Route path="/emp/edit/:id" element={<Edituser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

