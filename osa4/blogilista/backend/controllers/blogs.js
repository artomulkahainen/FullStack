const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const logger = require('../utils/logger');

// GET -METHODS
blogsRouter.get('/', (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs.map((blog) => blog.toJSON()));
  });
});

// POST -METHODS
blogsRouter.post('/', (req, res, next) => {
  const body = req.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  blog
    .save()
    .then((result) => {
      logger.info('Blog saved succesfully');
      res.status(201).json(result);
    })
    .catch((error) => {
      logger.error('Error with posting a blog');
      next(error);
    });
});

module.exports = blogsRouter;
