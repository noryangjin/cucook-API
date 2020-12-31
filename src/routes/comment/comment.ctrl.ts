import Comment from '../../shemas/comment';
import Post from '../../shemas/post';

export const readComment = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await Post.findById(id).populate({
      path: 'comments',
      populate: {
        path: 'commentWriter',
        select: 'username',
      },
      options: { sort: { publishedDate: -1 } },
    });

    res.json(data['comments']);
  } catch (e) {
    next(e);
  }
};

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

export const deleteComment = async (req, res, next) => {
  const { id } = req.param;
  try {
    await Comment.findByIdAndDelete(id);
    res.json('댓글 삭제 완료');
  } catch (e) {
    next(e);
  }
};
