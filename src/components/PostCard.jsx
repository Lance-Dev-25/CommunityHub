import LikeButton from './LikeButton'
import { Link } from 'react-router-dom'

function PostCard({ post, onLike, onDelete, disabled }) {
  return (
    <article className="post-card">
      <h3>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h3>

      <p>{post.content}</p>

      <p className="author">
        By {post.author}
      </p>

      <div className="post-actions">
        <LikeButton
          likes={post.likes}
          onLike={() => onLike(post.id)}
          disabled={disabled}
        />

        <button
          className="delete-button"
          onClick={() => onDelete(post.id)}
          disabled={disabled}
        >
          Delete
        </button>
      </div>
    </article>
  )
}

export default PostCard
