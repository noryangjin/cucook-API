import Comment from '../../shemas/comment';
import Post from '../../shemas/post';

export const writeComment = async (req, res, next) => {
  const {
    params: { id },
    body: { text },
    session: {
      passport: { user },
    },
  } = req;

  const comment = new Comment({
    text,
    commentWriter: user,
  });

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.sendStatus(404);
    }

    if (post) {
      await comment.save();
      post['comments'].push(comment.id);
      await post.save();
      res.json(comment);
    }
  } catch (e) {
    next(e);
  }
};