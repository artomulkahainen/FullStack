const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const logger = require('../utils/logger');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// GET -METHODS
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  blogs !== null
    ? res.json(blogs.map((blog) => blog.toJSON()))
    : res.status(404).end();
});

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  blog !== null ? res.json(blog.toJSON()) : res.status(404).end();
});

// POST -METHODS
blogsRouter.post('/', async (req, res) => {
  const body = req.body;
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  res.json(savedBlog.toJSON());
});

// DELETE -METHOD
blogsRouter.delete('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  const token = req.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  } else if (blog.user.toString() === decodedToken.id) {
    await Blog.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } else {
    res.status(401).json({ error: 'You can delete only your own blogs' });
  }
});

// PUT -METHOD
blogsRouter.put('/:id', (req, res, next) => {
  const body = req.body;

  /*const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };*/

  Blog.findByIdAndUpdate(
    req.params.id,
    { $set: { likes: body.likes } },
    { new: true }
  )
    .then((updatedBlog) => res.json(updatedBlog.toJSON()))
    .catch((error) => next(error));
});

module.exports = blogsRouter;
