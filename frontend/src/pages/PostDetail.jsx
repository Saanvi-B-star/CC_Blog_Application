import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPost, deletePost } from '../services/api';
import { ArrowLeft, Edit3, Trash2, User, Clock } from 'lucide-react';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPost(id);
        setPost(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id);
        navigate('/');
      } catch (err) {
        alert('Failed to delete post');
      }
    }
  };

  if (loading) return <div className="container fade-in">Decrypting data...</div>;
  if (!post) return <div className="container fade-in">Post not found. It may have been lost to the void.</div>;

  return (
    <div className="post-detail-container fade-in delay-1">
      <Link to="/" style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-secondary)'}}>
        <ArrowLeft size={18} />
        Back to Dashboard
      </Link>
      
      <div className="glass-panel post-detail">
        <h1 className="post-detail-title">{post.title}</h1>
        
        <div style={{display: 'flex', gap: '2rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <User size={18} />
            <span>{post.author}</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <Clock size={18} />
            <span>{new Date(post.createdAt).toLocaleDateString()} at {new Date(post.createdAt).toLocaleTimeString()}</span>
          </div>
        </div>

        <div className="post-detail-content">
          {post.content}
        </div>

        <div style={{marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '1rem', justifyContent: 'flex-end'}}>
          <Link to={`/edit/${post._id}`} className="btn btn-secondary">
            <Edit3 size={18} />
            Edit Signal
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">
            <Trash2 size={18} />
            Purge Signal
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
