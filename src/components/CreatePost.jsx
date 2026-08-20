import { useState } from 'react'

function CreatePost({ onAddPost }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('Lance')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()

    if (!title.trim() || !content.trim()) {
      setError('Please add a title and some content.')
      return
    }

    if (!author.trim()) {
      setError('Please add your name.')
      return
    }

    try {
      setSubmitting(true)
      setError('')
      await onAddPost({
        title: title.trim(),
        content: content.trim(),
        author: author.trim(),
      })

      setTitle('')
      setContent('')
    } catch (requestError) {
      setError(requestError.message || 'Your post could not be saved.')
    } finally {
      setSubmitting(false)
    }
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
          maxLength="100"
          required
        />

        <label>Content</label>

        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Write your post..."
          maxLength="2000"
          required
        />

        <label>Author</label>

        <input
          type="text"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          maxLength="60"
          required
        />

        {error && <p className="form-error">{error}</p>}

        <button type="submit" className="add-button" disabled={submitting}>
          {submitting ? 'Publishing…' : 'Publish Post'}
        </button>
      </form>
    </section>
  )
}

export default CreatePost
