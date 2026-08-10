function LikeButton({ likes, onLike }) {
  return (
    <button
      className="like-button"
      onClick={onLike}
    >
      ❤️ {likes}
    </button>
  )
}

export default LikeButton