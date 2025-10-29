import HomePage from "./pages/HomePage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/masuk" element={<Login />} />
                <Route path="/daftar" element={<Register />} />
            </Routes>
        </Router>
    )
}

export default App