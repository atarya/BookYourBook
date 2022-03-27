import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} exact />
        <Route path="/home" element={<HomePage />} exact />
        <Route path="/chats" element={<ChatPage />} exact />
      </Routes>
    </div>
  );
}

export default App;
