import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home/Home";
import Story from "./Home/Story";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/story" element={<Story />} />
      {/* Redirect any unmatched route (including blog slugs) to the Blog list */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
