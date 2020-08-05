const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

// GET -METHODS
usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    likes: 1,
  });
  response.json(users.map((u) => u.toJSON()));
});

usersRouter.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id).populate('blogs', {
    title: 1,
    author: 1,
    likes: 1,
  });
  res.json(user.toJSON());
});

// POST -METHODS
usersRouter.post('/', async (req, res) => {
  const body = req.body;

  if (!body.password || body.password.length < 3) {
    return res
      .status(401)
      .json({ error: 'password too short. Min length is 3 letters' });
  } else if (!body.username || body.username.length < 3) {
    return res
      .status(401)
      .json({ error: 'user name too short. Min length is 3 letters' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();
  res.json(savedUser);
});

// DELETE -METHOD
usersRouter.delete('/:id', async (req, res) => {
  await User.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

module.exports = usersRouter;
