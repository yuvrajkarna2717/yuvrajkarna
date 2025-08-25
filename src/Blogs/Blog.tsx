import { Routes, Route } from "react-router-dom";
import BlogList from "./BlogList";
import BlogPost from "./BlogPost";

export default function Blog() {
  return (
    <Routes>
      <Route path="/" element={<BlogList />} />
      <Route path=":slug" element={<BlogPost />} />
    </Routes>
  );
}
