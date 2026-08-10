import { useState } from 'react'

function CreatePost({ onAddPost }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('Lance')

  function handleSubmit(event) {
    event.preventDefault()

    if (!title.trim() || !content.trim()) {
      return
    }

    const newPost = {
      id: Date.now(),
      title: title,
      content: content,
      author: author,
      likes: 0,
    }

    onAddPost(newPost)

    setTitle('')
    setContent('')
  }

  return (
    <section className="create-post">
      <h2>Create a Post</h2>

      <form onSubmit={handleSubmit}>
        <label>Title</label>

        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter post title"
        />

        <label>Content</label>

        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Write your post..."
        />

        <label>Author</label>

        <input
          type="text"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />

        <button type="submit" className="add-button">
          Add Post
        </button>
      </form>
    </section>
  )
}

export default CreatePost