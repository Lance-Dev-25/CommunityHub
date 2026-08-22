import React, { useState } from 'react';

function Posts({ currentUser }) {
  // 1. Initial State for Posts & Comments
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Welcome to CommunityHub",
      author: "Lance",
      content: "This is our live post feed showcasing full-stack integration.",
      comments: [{ user: "Alex", text: "Great start!" }]
    }
  ]);

  // Form States
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [commentInputs, setCommentInputs] = useState({});
  const [filter, setFilter] = useState("all"); // "all" or "mine"

  // 2. Create a Post Function
  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPostObj = {
      id: Date.now(),
      title: newTitle,
      author: currentUser || "Anonymous",
      content: newContent,
      comments: []
    };

    setPosts([newPostObj, ...posts]);
    setNewTitle("");
    setNewContent("");
  };

  // 3. Add Comment Function
  const handleAddComment = (e, postId) => {
    e.preventDefault();
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { 
          ...post, 
          comments: [...post.comments, { user: currentUser || "Guest", text }] 
        };
      }
      return post;
    }));

    setCommentInputs({ ...commentInputs, [postId]: "" });
  };

  // Filter posts based on who is logged in
  const displayedPosts = filter === "mine" 
    ? posts.filter(post => post.author === currentUser)
    : posts;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      
      {/* CREATE POST FORM */}
      <div style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px', marginBottom: '25px', border: '1px solid #ddd' }}>
        <h3>Create a Post</h3>
        <form onSubmit={handleCreatePost} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Post Title" 
            value={newTitle} 
            onChange={(e) => setNewTitle(e.target.value)} 
            style={{ padding: '8px', fontSize: '14px' }}
          />
          <textarea 
            placeholder="What's on your mind?" 
            value={newContent} 
            onChange={(e) => setNewContent(e.target.value)} 
            rows="3"
            style={{ padding: '8px', fontSize: '14px' }}
          />
          <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Publish Post
          </button>
        </form>
      </div>

      {/* FILTER BUTTONS */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button 
          onClick={() => setFilter("all")} 
          style={{ padding: '6px 12px', fontWeight: filter === "all" ? "bold" : "normal", cursor: 'pointer' }}
        >
          All Posts ({posts.length})
        </button>
        <button 
          onClick={() => setFilter("mine")} 
          style={{ padding: '6px 12px', fontWeight: filter === "mine" ? "bold" : "normal", cursor: 'pointer' }}
        >
          My Posts ({posts.filter(p => p.author === currentUser).length})
        </button>
      </div>

      {/* POSTS LIST */}
      <div>
        <h3>Community Posts</h3>
        {displayedPosts.length === 0 ? (
          <p>No posts to display.</p>
        ) : (
          displayedPosts.map((post) => (
            <div key={post.id} style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '15px', marginBottom: '15px', backgroundColor: '#fff' }}>
              <h4 style={{ margin: '0 0 5px 0' }}>{post.title}</h4>
              <p style={{ fontSize: '12px', color: '#666', margin: '0 0 10px 0' }}>Posted by: <strong>{post.author}</strong></p>
              <p style={{ fontSize: '14px', lineHeight: '1.4' }}>{post.content}</p>

              {/* COMMENTS SECTION */}
              <div style={{ marginTop: '15px', paddingTop: '10px', borderTop: '1px solid #eee' }}>
                <h5 style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#333' }}>Comments</h5>
                
                {post.comments.length === 0 ? (
                  <p style={{ fontSize: '12px', color: '#888' }}>No comments yet.</p>
                ) : (
                  post.comments.map((c, i) => (
                    <p key={i} style={{ fontSize: '13px', margin: '4px 0', backgroundColor: '#f5f5f5', padding: '6px 10px', borderRadius: '4px' }}>
                      <strong>{c.user}:</strong> {c.text}
                    </p>
                  ))
                )}

                {/* ADD COMMENT INPUT */}
                <form onSubmit={(e) => handleAddComment(e, post.id)} style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                  <input 
                    type="text" 
                    placeholder="Add a comment..." 
                    value={commentInputs[post.id] || ""} 
                    onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })} 
                    style={{ flex: 1, padding: '6px', fontSize: '13px' }}
                  />
                  <button type="submit" style={{ padding: '6px 12px', fontSize: '13px', cursor: 'pointer' }}>Comment</button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default Posts;