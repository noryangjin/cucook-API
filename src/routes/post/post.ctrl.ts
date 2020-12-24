import Post from '../../shemas/post';

export const postList = async (req, res, next) => {
  try {
    const data = await Post.find().populate('writer', '_id, username');
    res.json(data);
  } catch (e) {
    next(e);
  }
};

export const writePost = async (req, res, next) => {
  const { title, body, tags } = req.body;
  const { user } = req.session.passport;
  const post = new Post({
    title,
    body,
    tags,
    writer: user,
  });
  try {
    await post.save();
    const data = await Post.populate(post, { path: 'writer' });
    const result = data.toJSON();
    delete result['writer']['password'];
    res.json(result);
  } catch (e) {
    next(e);
  }
};

export const readPost = () => {};

export const deletePost = () => {};

export const updatePost = () => {};
