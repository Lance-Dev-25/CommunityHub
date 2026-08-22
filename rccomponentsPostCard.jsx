[35mREADME.md[m[36m:[m[32m3[m[36m:[mCommunityHub is a small full-stack community posting app. Users can create posts, view a single post, [1;31mlike[m posts, and delete posts. The React frontend communicates with an Express API, and posts are stored in MongoDB Atlas.
[35mREADME.md[m[36m:[m[32m30[m[36m:[m| PATCH | `/api/posts/:id/[1;31mlike[m` | Add one [1;31mlike[m |
[35mserver/models/Post.cjs[m[36m:[m[32m23[m[36m:[m    [1;31mlike[ms: {
[35mserver/server.cjs[m[36m:[m[32m4[m[36m:[m// 2. Update your Post Schema to include '[1;31mlike[ms'
[35mserver/server.cjs[m[36m:[m[32m9[m[36m:[m  [1;31mlike[ms: { type: Number, default: 0 }
[35mserver/server.cjs[m[36m:[m[32m13[m[36m:[m// 3. Add the PUT route to handle [1;31mlike[m/un[1;31mlike[m actions
[35mserver/server.cjs[m[36m:[m[32m14[m[36m:[mapp.put('/api/posts/:id/[1;31mlike[m', async (req, res) => {
[35mserver/server.cjs[m[36m:[m[32m17[m[36m:[m    const change = action === 'un[1;31mlike[m' ? -1 : 1;
[35mserver/server.cjs[m[36m:[m[32m21[m[36m:[m      { $inc: { [1;31mlike[ms: change } },
[35mserver/server.cjs[m[36m:[m[32m31[m[36m:[m    console.error('Error updating [1;31mlike[ms:', error);
[35mserver/server.cjs[m[36m:[m[32m32[m[36m:[m    res.status(500).json({ error: 'Failed to update [1;31mlike[ms' });
[35msrc/App.css[m[36m:[m[32m109[m[36m:[m.[1;31mlike[m-button,
[35msrc/App.css[m[36m:[m[32m122[m[36m:[m.[1;31mlike[m-button {
[35msrc/components/LikeButton.jsx[m[36m:[m[32m1[m[36m:[mfunction LikeButton({ [1;31mlike[ms, onLike, disabled }) {
[35msrc/components/LikeButton.jsx[m[36m:[m[32m4[m[36m:[m      className="[1;31mlike[m-button"
[35msrc/components/LikeButton.jsx[m[36m:[m[32m8[m[36m:[m      ♥ {[1;31mlike[ms}
[35msrc/components/PostCard.jsx[m[36m:[m[32m19[m[36m:[m          [1;31mlike[ms={post.[1;31mlike[ms}
[35msrc/components/Stats.jsx[m[36m:[m[32m3[m[36m:[m    (total, post) => total + post.[1;31mlike[ms,
