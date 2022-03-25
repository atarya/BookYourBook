import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./components/HomePage";
import Chatpage from "./components/ChatPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} exact />
        <Route path="/chats" element={<Chatpage />} exact />
      </Routes>
    </div>
  );
}

export default App;
