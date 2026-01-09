import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ClipboardPage from "./pages/ClipboardPage.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

function App({ mode, setMode }) {
  

  return (
    <>
      <Header mode={mode} setMode={setMode} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/clipboard/:id" element={<ClipboardPage />} />
      </Routes>
      <Footer mode={mode} setMode={setMode} />
    </>
  );
}
export default App;
