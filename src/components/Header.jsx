import React from 'react';
import { Link } from 'react-router-dom';

function Header({ currentUser, setCurrentUser }) {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', background: '#1a1a1a', color: '#fff' }}>
      <h2 style={{ margin: 0 }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>CommunityHub</Link>
      </h2>
      
      <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/" style={{ color: '#fff' }}>Home</Link>
        <Link to="/posts" style={{ color: '#fff' }}>Posts</Link>
        <Link to="/about" style={{ color: '#fff' }}>About</Link>
        
        {/* User Login Indicator */}
        <div style={{ marginLeft: '15px', paddingLeft: '15px', borderLeft: '1px solid #555' }}>
          {currentUser ? (
            <span>Logged in as: <strong>{currentUser}</strong></span>
          ) : (
            <button onClick={() => setCurrentUser("Lance")}>Login</button>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;