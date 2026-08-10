function Stats({ posts }) {
  const totalLikes = posts.reduce(
    (total, post) => total + post.likes,
    0
  )

  return (
    <section className="stats">
      <div className="stat">
        <strong>{posts.length}</strong>
        <span>Posts</span>
      </div>

      <div className="stat">
        <strong>{totalLikes}</strong>
        <span>Total Likes</span>
      </div>
    </section>
  )
}

export default Stats