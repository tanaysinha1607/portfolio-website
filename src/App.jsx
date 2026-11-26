// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import ProfileGate from "./components/ProfileGate";
import BrowseScreen from "./components/BrowseScreen";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ProfileGate />} />
      <Route path="/browse/:profileId" element={<BrowseScreen />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
