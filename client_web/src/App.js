import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import ChatPage from "./Pages/ChatPage";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} exact />
        <Route path="/home" element={<HomePage />} exact />
        <Route path="/chat" element={<ChatPage />} exact />
      </Routes>
    </div>
  );
}

export default App;
