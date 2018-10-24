import React, { Component } from "react";
import "./App.css";

import Navbar from "./components/layout/NavBar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <h1>Connector</h1>
        <Footer />
      </div>
    );
  }
}

export default App;
