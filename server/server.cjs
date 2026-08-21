// 1. Make sure Express handles JSON request bodies (place near the top, above routes)
app.use(express.json());

// 2. Update your Post Schema to include 'likes'
const postSchema = new mongoose.Schema({
  title: String,
  author: String,
  content: String,
  likes: { type: Number, default: 0 }
});
const Post = mongoose.model('Post', postSchema);

// 3. Add the PUT route to handle like/unlike actions
app.put('/api/posts/:id/like', async (req, res) => {
  try {
    const { action } = req.body;
    const change = action === 'unlike' ? -1 : 1;

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: change } },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(updatedPost);
  } catch (error) {
    console.error('Error updating likes:', error);
    res.status(500).json({ error: 'Failed to update likes' });
  }
});