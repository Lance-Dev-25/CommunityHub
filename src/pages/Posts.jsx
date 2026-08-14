import { Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'

function Posts() {
  const {
    data: posts,
    loading,
    error,
  } = useFetch('http://localhost:3000/community')

  if (loading) {
    return <p>Loading posts...</p>
  }

  if (error) {
    return <p>Something went wrong: {error}</p>
  }

  if (!posts.length) {
    return <p>No posts found.</p>
  }

  return (
    <div className="page">

      <h2>Latest Posts</h2>

      <div className="posts">

        {posts.map((post) => (
          <article
            className="post-card"
            key={post.id}
          >
            <h3>
              <Link to={`/posts/${post.id}`}>
                {post.title}
              </Link>
            </h3>

            <p>{post.content}</p>

            <p className="author">
              By {post.author}
            </p>
          </article>
        ))}

      </div>

    </div>
  )
}

export default Posts