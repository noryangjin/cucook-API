import Post from '../../shemas/post';
import User from '../../shemas/user';

export const postList = async (req, res, next) => {
  const { tag, ingredient, category, sort, page } = req.query;
  const page_ = page || 1;

  try {
    const query = {
      ...(tag ? { tags: tag } : {}),
      ...(ingredient ? { ingredients: ingredient } : {}),
      ...(category ? { category } : {}),
    };
    const sort_ = {
      ...(sort ? { views: -1 } : { publishedDate: -1 }),
    };

    const data = await Post.find(query)
      .populate('writer', '_id, username')
      .limit(page_ * 10);

    const result = data.map((post) => {
      const data = post.toJSON();
      delete data['body'];
      delete data['comments'];
      return data;
    });

    res.json(result);
  } catch (e) {
    next(e);
  }
};

export const titleImg = async (req, res, next) => {
  try {
    res.json(`${req.file.location}`);
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
    const data = await Post.findById(id).populate('writer', 'username');

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
  const { title, body, tags, ingredients, titleImg, category } = req.body;

  try {
    const data = await Post.findByIdAndUpdate(
      id,
      { title, body, tags, ingredients, titleImg, category },
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

export const searchPost = async (req, res, next) => {
  try {
    const {
      query: { term },
    } = req;

    const user = await User.findOne({
      username: { $regex: term, $options: 'i' },
    });

    const user_ = user
      ? await Post.find({
          writer: user['_id'],
        }).populate('writer', '_id, username')
      : /*.sort({ publishedDate: -1 })*/
        [];

    const title = await Post.find({
      title: { $regex: term, $options: 'i' },
    }).populate('writer', '_id, username');
    /*.sort({ publishedDate: -1 });*/

    const ingredients = await Post.find({
      ingredients: { $regex: term, $options: 'i' },
    }).populate('writer', '_id, username');
    /*.sort({ publishedDate: -1 });*/

    const tags = await Post.find({
      tags: { $regex: term, $options: 'i' },
    }).populate('writer', '_id, username');
    /*.sort({ publishedDate: -1 });*/

    const data = [...user_, ...title, ...ingredients, ...tags];
    const array = data.map((post) => {
      const data = post.toJSON();
      delete data['body'];
      delete data['comments'];
      return data;
    });
    const a = array.map((ar) => JSON.stringify(ar));
    const b = [Array.from(new Set(a))][0];
    const result = b.map((ar: any) => JSON.parse(ar));

    res.json(result);
  } catch (e) {
    next(e);
  }
};
