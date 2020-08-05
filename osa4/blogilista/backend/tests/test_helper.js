const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'Kiva blogi',
    author: 'Mauri Kannus',
    url: 'blogspot.com/marenblogi',
    likes: 3,
  },
  {
    title: 'Kauhean kiva blogi',
    author: 'Mauri Kannus',
    url: 'blogspot.com/marenblogi',
    likes: 3000,
  },
  {
    title: 'Aika huono blogi',
    author: 'Pertti Kuusela',
    url: 'blogspot.com/pertinploki',
    likes: 31,
  },
];

const initialUsers = [
  {
    blogs: [],
    username: 'test',
    name: 'Tester',
    password: 'testi1',
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon',
    author: 'ar',
    url: 's',
    likes: 0,
  });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  initialUsers,
};
