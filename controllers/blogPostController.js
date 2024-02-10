const Post = require('../models/blogpost');

exports.getPosts = async (req, res) => {
  try {
    
    if (req.query.device) {
      filter.device = req.query.device.toUpperCase();
    }
    const posts = await Post.find({user:"9384932"});
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

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }


    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.deletePost = async (req, res) => {
  try {
    let post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ message: 'Post removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
