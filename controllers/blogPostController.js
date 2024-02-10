const Post = require('../models/blogpost');

exports.getPosts = async (req, res) => {
  try {
    const filter = { user: req.user.id };
    if (req.query.device) {
      filter.device = req.query.device.toUpperCase();
    }
    const posts = await Post.find(filter);
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.addPost = async (req, res) => {
  const { title, body, device } = req.body;

  try {
    const newPost = new Post({
      title,
      body,
      device,
      user: req.user.id,
    });

    await newPost.save();

    res.json(newPost);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.updatePost = async (req, res) => {
  try {
    let post = await Post.findByIdAndUpdate(req.params.id, req.body);

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    res.json({message: 'Post updated successfully'});
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.deletePost = async (req, res) => {
  try {
    let post = await Post.findByIdAndDelete(req.params.id);

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    res.json({ message: 'Post removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
