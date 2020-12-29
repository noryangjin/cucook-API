import Post from '../../shemas/post';

export const postList = async (req, res, next) => {
  try {
    const data = await Post.find().populate('writer', '_id, username');
    res.json(data);
  } catch (e) {
    next(e);
  }
};

export const titleImg = async (req, res, next) => {
  try {
    res.json(`http://localhost:4000/img/${req.file.filename}`);
  } catch (e) {
    next(e);
  }
};

export const writePost = async (req, res, next) => {
  const { category, title, body, ingredients, tags, titleImg } = req.body;
  const { user } = req.session.passport;

  const post = new Post({
    category,
    title,
    titleImg,
    body,
    ingredients,
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

export const readPost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await Post.findById(id).populate('writer', '_id username');
    if (!data) {
      res.sendStatus(404);
      return;
    }
    res.json(data);
  } catch (e) {
    next(e);
  }
};

export const deletePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndDelete(id);
    res.json('포스트 삭제 완료');
  } catch (e) {
    next(e);
  }
};

export const updatePost = async (req, res, next) => {
  const { id } = req.params;
  const { title, body, tags } = req.body;
  try {
    const data = await Post.findByIdAndUpdate(
      id,
      { title, body, tags },
      { new: true }
    );
    if (!data) {
      res.sendStatus(404);
    }
    res.json(data);
  } catch (e) {
    next(e);
  }
};

export const postRegisterView = async (req, res, next) => {
  const {
    params: { id },
  } = req;
  try {
    const post = await Post.findById(id);
    post['views'] += 1;
    post.save();
    res.json(post['views']);
  } catch (e) {
    next(e);
  }
};
