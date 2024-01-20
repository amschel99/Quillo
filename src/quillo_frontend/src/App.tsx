import React, { JSX } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./screens/Auth";
import Onboarding from "./screens/Onboarding";
import Home from "./screens/Home";
import "./styles/index.scss";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Auth />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/home/:key" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
