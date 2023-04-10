import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Posts from "./components/Posts/Post";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/posts/:id" element={<Posts/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
