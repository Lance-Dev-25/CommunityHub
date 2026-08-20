import { useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { API_URL } from '../config'
import CreatePost from '../components/CreatePost'
import PostCard from '../components/PostCard'
import Stats from '../components/Stats'

function Posts() {
  const {
    data: posts,
    setData: setPosts,
    loading,
    error,
  } = useFetch(`${API_URL}/posts`)
  const [actionError, setActionError] = useState('')
  const [updatingId, setUpdatingId] = useState(null)

  async function readResponse(response) {
    const result = await response.json().catch(() => ({}))

    if (!response.ok) {
      throw new Error(result.message || 'The request could not be completed.')
    }

    return result
  }

  async function handleAddPost(post) {
    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    })
    const createdPost = await readResponse(response)

    setActionError('')
    setPosts((currentPosts) => [createdPost, ...currentPosts])
  }

  async function handleLike(postId) {
    try {
      setUpdatingId(postId)
      const response = await fetch(`${API_URL}/posts/${postId}/like`, {
        method: 'PATCH',
      })
      const updatedPost = await readResponse(response)

      setActionError('')
      setPosts((currentPosts) =>
        currentPosts.map((post) => (post.id === postId ? updatedPost : post))
      )
    } catch (requestError) {
      setActionError(requestError.message || 'The like could not be saved.')
    } finally {
      setUpdatingId(null)
    }
  }

  async function handleDelete(postId) {
    if (!window.confirm('Delete this post? This cannot be undone.')) {
      return
    }

    try {
      setUpdatingId(postId)
      const response = await fetch(`${API_URL}/posts/${postId}`, {
        method: 'DELETE',
      })
      await readResponse(response)

      setActionError('')
      setPosts((currentPosts) => currentPosts.filter((post) => post.id !== postId))
    } catch (requestError) {
      setActionError(requestError.message || 'The post could not be deleted.')
    } finally {
      setUpdatingId(null)
    }
  }

  if (loading) {
    return <p>Loading posts...</p>
  }

  if (error) {
    return <p>Something went wrong: {error}</p>
  }

  return (
    <div className="page">
      <h2>Latest Posts</h2>

      <CreatePost onAddPost={handleAddPost} />

      {actionError && <p className="form-error">{actionError}</p>}

      {posts.length > 0 && <Stats posts={posts} />}

      {posts.length > 0 ? (
        <div className="posts">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={handleLike}
              onDelete={handleDelete}
              disabled={updatingId === post.id}
            />
          ))}
        </div>
      ) : (
        <p>No posts yet. Create the first one above.</p>
      )}
    </div>
  )
}

export default Posts
