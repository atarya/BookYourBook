import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TopNav from "./components/TopNav";
import PrivateRoute from "./components/PrivateRoute";

// components
import Home from "./booking/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./user/Dashboard";



function App() {
    return (
        <Router>
            <TopNav />
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
            />
            <Routes>
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/" element={<Home />} />
                {/* <PrivateRoute exact path="/dashboard" element={<Dashboard />} /> */}
                <Route exact path='/' element={<PrivateRoute />}>
                    <Route exact path='/dashboard' element={<Dashboard />} />
                </Route>

            </Routes>
        </Router>
    );
}

export default App;
