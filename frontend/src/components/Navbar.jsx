import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, PlusCircle } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="navbar fade-in">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <Terminal size={28} />
          <span>Vortex Blog</span>
        </Link>
        <div>
          <Link to="/create" className="btn btn-primary">
            <PlusCircle size={18} />
            <span>New Post</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
