import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
