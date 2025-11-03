import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/">Home</Link> | <Link to="/create">New Post</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h1>Welcome to MERN Blog</h1>} />
        <Route path="/create" element={<h1>Create a new post</h1>} />
      </Routes>
    </div>
  );
}

export default App;
