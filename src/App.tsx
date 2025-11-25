import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Redirect any unmatched route (including blog slugs) to the Blog list */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
