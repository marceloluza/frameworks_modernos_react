import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ClientePage from "./pages/ClientePage";

function App() {
  return (
    <>
      <div className="container">
        <Navbar>
          
        </Navbar>
        <ClientePage></ClientePage>
      </div>
    </>
  );
}

export default App;
