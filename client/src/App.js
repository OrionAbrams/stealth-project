import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
// import "./components/style.css";

function App() {
  return (
    <Router>
      <div className="wrapping">
        <Route path="/" component={Home} />
      </div>
    </Router>
  );
}

export default App;
