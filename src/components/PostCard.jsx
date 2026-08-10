import LikeButton from './LikeButton'

function PostCard({ post, onLike, onDelete }) {
  return (
    <article className="post-card">
      <h3>{post.title}</h3>

      <p>{post.content}</p>

      <p className="author">
        By {post.author}
      </p>

      <div className="post-actions">
        <LikeButton
          likes={post.likes}
          onLike={() => onLike(post.id)}
        />

        <button
          className="delete-button"
          onClick={() => onDelete(post.id)}
        >
          Delete
        </button>
      </div>
    </article>
  )
}

export default PostCard