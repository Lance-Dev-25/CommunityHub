import { useState } from 'react'
import CreatePost from '../components/CreatePost'
import { useFetch } from '../hooks/useFetch'
import { API_BASE_URL } from '../config'

function Posts() {
  const {
    data: posts,
    loading,
    error,
  } = useFetch(`${API_BASE_URL}/posts`)

  const [localPosts, setLocalPosts] = useState([])

  async function handleAddPost(post) {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    })

    if (!response.ok) {
      throw new Error('Failed to create post')
    }

    const newPost = await response.json()

    setLocalPosts((currentPosts) => [newPost, ...currentPosts])
  }

  if (loading) {
    return <p>Loading posts...</p>
  }

  if (error) {
    return <p>Something went wrong: {error}</p>
  }

  const allPosts = [...localPosts, ...posts]

  return (
    <div className="page">

      <CreatePost onAddPost={handleAddPost} />

      <h2>Latest Posts</h2>

      {allPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div className="posts">
          {allPosts.map((post) => (
            <article
              className="post-card"
              key={post._id || post.id}
            >
              <h3>{post.title}</h3>

              <p>{post.content}</p>

              <p className="author">
                By {post.author}
              </p>
            </article>
          ))}
        </div>
      )}

    </div>
  )
}

export default Posts