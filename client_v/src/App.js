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
import DashboardSeller from "./user/DashboardSeller";
import NewBook from "./books/NewBook";
import StripeCallback from "./stripe/StripeCallback";

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
                    <Route exact path='/dashboard/seller' element={<DashboardSeller />} />
                    <Route exact path='/books/new' element={<NewBook />} />
                    <Route exact path='/stripe/callback' element={<StripeCallback />} />

                </Route>

            </Routes>
        </Router>
    );
}

export default App;
