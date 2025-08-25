import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home/Home';
import Blog from './Blogs/Blog';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blogs/*" element={<Blog />} />
      {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
    </Routes>
  );
}
