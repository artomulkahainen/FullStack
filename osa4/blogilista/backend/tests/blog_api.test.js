const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const helper = require('./test_helper');
const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});
  //await User.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));

  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe('The get methods', () => {
  test('return all the blogs back', async () => {
    const res = await api.get('/api/blogs');
    expect(res.body.length).toBe(helper.initialBlogs.length);
  });

  test('The blog object includes an id', async () => {
    const res = await api.get('/api/blogs');
    expect(res.body[0].id).toBeDefined();
  });
});

//describe('The post methods', () => {
/*
  test('Blog count is one more after the blog add', async (request, response) => {
    const newBlog = new Blog({
      title: 'Keisarin uudet vaatteet',
      author: 'Hillevi Harkimo',
      url: 'eiosotetta.com',
      likes: 9,
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    });

    const token = await helper.getToken('kalle');

    await api
      .post('/api/blogs')
      .set(`Authorization', 'bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const res = await api.get('/api/blogs');

    expect(res.body.length).toBe(helper.initialBlogs.length + 1);
  });*/
/*
  test('Likes is 0, when no value is inserted', async (req, res) => {
    const newBlog = new Blog({
      title: 'Jeppis',
      author: 'Jeaa',
      url: 'jjj.com',
    });

    const response = await api
      .post('/api/blogs')
      .set('Authorization', req.token)
      .set('Content-Type', 'application/json')
      .send(newBlog);

    expect(response.body.likes).toBe(0);
  });*/
/*
  test('blog without title and url is not added', async () => {
    const newBlog = {
      author: 'herpertti',
    };

    await api.post('/api/blogs-test').send(newBlog).expect(400);
    const token = await helper.getToken('kalle');

    const response = await api.get('/api/notes');

    expect(response.body).toHaveLength(initialNotes.length);
  });*/
//});

afterAll(() => {
  mongoose.connection.close();
});
