import { Link, useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'

function PostDetail() {
  const { postId } = useParams()

  const {
    data: post,
    loading,
    error,
  } = useFetch(
    `http://localhost:3000/community/${postId}`
  )

  if (loading) {
    return <p>Loading post...</p>
  }

  if (error) {
    return (
      <div className="page">
        <p>Something went wrong: {error}</p>
        <Link to="/posts">← Back to Posts</Link>
      </div>
    )
  }

  return (
    <div className="page">

      <h2>{post.title}</h2>

      <p>{post.content}</p>

      <p className="author">
        By {post.author}
      </p>

      <Link to="/posts">
        ← Back to Posts
      </Link>

    </div>
  )
}

export default PostDetail