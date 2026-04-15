import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createPost } from '../services/api';
import { ArrowLeft, Send } from 'lucide-react';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setError('Title and Content are required to transmit a signal.');
      return;
    }

    setLoading(true);
    try {
      await createPost({ title, content, author: author || 'Anonymous' });
      navigate('/');
    } catch (err) {
      setError('Failed to emit signal. ' + (err.response?.data?.message || err.message));
      setLoading(false);
    }
  };

  return (
    <div className="container fade-in">
      <Link to="/" style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-secondary)'}}>
        <ArrowLeft size={18} />
        Back to Dashboard
      </Link>

      <div className="glass-panel" style={{padding: '2.5rem', maxWidth: '800px', margin: '0 auto'}}>
        <h1 style={{marginBottom: '2rem'}}>Transmit New Signal</h1>
        
        {error && <div style={{padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', color: 'var(--danger)', borderRadius: '8px', marginBottom: '1.5rem'}}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="title">Signal Designation (Title)</label>
            <input 
              id="title"
              type="text" 
              className="form-control" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="e.g. Discovery of Sector 4"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="author">Transmitter ID (Author)</label>
            <input 
              id="author"
              type="text" 
              className="form-control" 
              value={author} 
              onChange={(e) => setAuthor(e.target.value)} 
              placeholder="Leave blank for Anonymous"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="content">Message Payload (Content)</label>
            <textarea 
              id="content"
              className="form-control" 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              placeholder="Enter the transmission data here..."
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading} style={{width: '100%', padding: '1rem'}}>
            <Send size={18} />
            {loading ? 'Transmitting...' : 'Initialize Transmission'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
