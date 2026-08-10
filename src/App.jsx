import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import CreatePost from './components/CreatePost'
import PostCard from './components/PostCard'
import Stats from './components/Stats'
import './App.css'

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Welcome to CommunityHub',
      content: 'This is our first community post.',
      author: 'Lance',
      likes: 0,
    },
    {
      id: 2,
      title: 'Learning React',
      content: 'React components make websites easier to organize.',
      author: 'Amina',
      likes: 0,
    },
  ])

  // Add a new post
  function handleAddPost(newPost) {
    setPosts((previousPosts) => [
      newPost,
      ...previousPosts,
    ])
  }

  // Like one post
  function handleLikePost(id) {
    setPosts((previousPosts) =>
      previousPosts.map((post) =>
        post.id === id
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    )
  }

  // Delete one post
  function handleDeletePost(id) {
    setPosts((previousPosts) =>
      previousPosts.filter((post) => post.id !== id)
    )
  }

  return (
    <div className="app">
      <Header />

      <main className="container">

        <section className="hero">
          <h2>CommunityHub</h2>
          <p>Share your ideas and learn together.</p>
        </section>

        <Stats posts={posts} />

        <CreatePost onAddPost={handleAddPost} />

        <section className="posts-section">
          <h2>Latest Posts</h2>

          {posts.length === 0 ? (
            <p className="empty">
              No posts yet. Create the first one!
            </p>
          ) : (
            <div className="posts">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={handleLikePost}
                  onDelete={handleDeletePost}
                />
              ))}
            </div>
          )}
        </section>

      </main>

      <Footer />
    </div>
  )
}

export default App