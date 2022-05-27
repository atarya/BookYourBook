import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} exact />
        <Route path="/chat" element={<ChatPage />} exact />
      </Routes>
    </div>
  );
}

export default App;
