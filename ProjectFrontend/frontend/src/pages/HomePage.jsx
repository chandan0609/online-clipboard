import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
const HomePage = () => {
  const navigate = useNavigate();
  const createClipboard = () => {
    const id = uuid();
    navigate(`/clipboard/${id}`);
  };
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Online Clipboard</h1>
      <button onClick={createClipboard}>Create New Clipboard</button>
    </div>
  );
};

export default HomePage;
