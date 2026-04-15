import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts, deletePost } from '../services/api';
import { Clock, User, ArrowRight, Trash2 } from 'lucide-react';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await getPosts();
      setPosts(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch posts. Ensure backend is running.');
      setLoading(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id);
        fetchPosts();
      } catch (err) {
        alert('Failed to delete post');
      }
    }
  };

  if (loading) return <div className="container fade-in">Loading exploring the cosmic grid...</div>;
  if (error) return <div className="container fade-in"><div className="glass-panel" style={{padding: '2rem', color: 'var(--danger)'}}>{error}</div></div>;

  return (
    <div className="fade-in">
      <div className="post-grid">
        {posts.length === 0 ? (
          <div className="glass-panel" style={{gridColumn: '1 / -1', padding: '3rem', textAlign: 'center'}}>
            <h2>No signals detected...</h2>
            <p style={{color: 'var(--text-secondary)', marginBottom: '1.5rem'}}>The void is empty. Create a post to populate the galaxy.</p>
            <Link to="/create" className="btn btn-primary">Create First Post</Link>
          </div>
        ) : (
          posts.map((post, index) => (
            <Link to={`/posts/${post._id}`} key={post._id} className={`glass-panel post-card fade-in delay-${(index % 3) + 1}`}>
              <h2 className="post-title">{post.title}</h2>
              <div className="post-meta">
                <span><User size={14} style={{display: 'inline', verticalAlign: 'text-bottom', marginRight:'4px'}}/> {post.author}</span>
                <span><Clock size={14} style={{display: 'inline', verticalAlign: 'text-bottom', marginRight:'4px'}}/> {new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="post-excerpt">{post.content}</p>
              
              <div className="post-actions" style={{marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span style={{color: 'var(--accent-color)', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '4px'}}>
                  Read more <ArrowRight size={16} />
                </span>
                <button 
                  onClick={(e) => handleDelete(post._id, e)}
                  className="btn btn-danger" 
                  style={{padding: '0.4rem 0.8rem', fontSize: '0.8rem'}}
                  title="Delete post"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default PostList;
