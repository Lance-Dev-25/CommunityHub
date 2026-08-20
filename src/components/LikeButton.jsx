function LikeButton({ likes, onLike, disabled }) {
  return (
    <button
      className="like-button"
      onClick={onLike}
      disabled={disabled}
    >
      ♥ {likes}
    </button>
  )
}

export default LikeButton
