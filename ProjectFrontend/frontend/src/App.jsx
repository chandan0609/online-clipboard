import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ClipboardPage from "./pages/ClipboardPage.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/clipboard/:id" element={<ClipboardPage />} />
      </Routes>
    </>
  );
}
export default App;
